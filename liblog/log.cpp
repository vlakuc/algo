//////////////////////////////////////////////////////////////////////////////////////
// Logging
// (C) Epiphan Systems Inc. 2013
//
// Simple logging
//////////////////////////////////////////////////////////////////////////////////////


#include <cstdarg>
#include <ctime>
#include <cstring>
#include <cassert>
#include <chrono>
#include <sys/types.h>
#include <stdint.h>
#include <inttypes.h>
#ifdef __linux
#include <sys/syscall.h> 
#endif // __linux
#ifdef HAVE_SYSLOG
#include <syslog.h>
#endif // HAVE_SYSLOG

#include "log.h"


namespace logger
{

   
static int getThreadId()
{
    // Linux
#ifdef __linux
    return syscall(SYS_gettid);
#endif    
    return 0;
}
    
    
//////////////////////////////////////////////////////////////////////////////////////
// Log writers


#ifdef HAVE_SYSLOG
//////////////////////////////////////////////////////////////////////////////////////
// Syslog
// Get syslog priority from logging level
static int getSyslogPriority(Level level)
{
    switch(level)
    {
		case LL_ERROR:  	return LOG_ERR;
        case LL_WARNING:	return LOG_WARNING;
        case LL_INFO:    	return LOG_INFO;
        case LL_DEBUG:      return LOG_DEBUG;
        case LL_TRACE:     	return LOG_DEBUG;
    }
    return LL_DEBUG;
}

static void writeToSyslog(Level level,
                          int tid,
                          unsigned int indent, 
                          const char* format, 
                          va_list args)
{
    if (tid == 0 && indent == 0)
    {
        vsyslog(getSyslogPriority(level), format, args);
    }
    else
    {   
        // Use one big buffer to output all parts at once
        static const size_t LINE_SIZE = 1024;
        char line[LINE_SIZE];
        char* p = &line[0];
        char* q = &line[LINE_SIZE-1];               //  \0
        
        // 1. Thread id
        if (tid > 0)
            p += std::snprintf(p, q - p, "[%04X] ", tid);
    
        // 2. Indent
        if (indent > 0)
        {
            size_t count = std::min(indent, (unsigned int)(q - p));
            std::memset(p, ' ', count);
            p += count;
        }
    
        // 3. Message
        std::vsnprintf(p, q - p, format, args);
        
        // Output
        syslog(getSyslogPriority(level), "%s", line);
    }
    
}
#else  // HAVE_SYSLOG
#define writeToSyslog(level, tid, indent, format, args)
#endif // HAVE_SYSLOG

//////////////////////////////////////////////////////////////////////////////////////
// Stdout / stderr
static const char* getLevelName(Level level)
{
    switch(level)
    {
        case LL_ERROR:     	return "err   ";
        case LL_WARNING:   	return "warn  ";
        case LL_INFO:      	return "info  ";
        case LL_DEBUG:     	return "debug ";
        case LL_TRACE:		return "trace ";
    }
    return "none  ";
}

// stdout / stderr
static void writeToStream(FILE* stream,
                          Level level,
                          bool humanReadableTimestamp,
                          int tid,
                          unsigned int indent, 
                          const char* format, 
                          va_list args)
{
    using namespace std::chrono;
    
    // Use one big buffer to output all parts at once
    static const size_t LINE_SIZE = 1024;
    char line[LINE_SIZE];
    char* p = &line[0];
    char* q = &line[LINE_SIZE-2]; // \n + \0
    
    // 1. Timestamp (YYYY-MM-DD HH:MM:SS.sss or seconds.milliseconds)
    auto now = system_clock::now();
    milliseconds ms = duration_cast<milliseconds>(now.time_since_epoch());
    if( humanReadableTimestamp )
    {
        time_t ts = system_clock::to_time_t(now);
        p += std::strftime(p, sizeof "2015-03-02 09:08:07", "%Y-%m-%d %H:%M:%S" , localtime(&ts));
        p += std::snprintf(p, q-p, ".%03d ", static_cast<int>(ms.count() % 1000));
    }
    else
    {
        p += std::snprintf(p, q-p, "%lld.%03d ", static_cast<long long>(duration_cast<seconds>(ms).count()), static_cast<int>(ms.count() % 1000));
    }
    
    // 2. Level
    p += std::snprintf(p, q - p, "%s ", getLevelName(level));
    
    // 3. Thread id
    if (tid > 0)
        p += std::snprintf(p, q - p, "[%04X] ", tid);
    
    // 4. Indent
    if (indent > 0)
    {
        size_t count = std::min(indent, (unsigned int)(q - p));
        std::memset(p, ' ', count);
        p += count;
    }
    
    // 5. Message
    int buf_size = q - p;
    int res = std::vsnprintf(p, buf_size, format, args);
    //p += std::vsnprintf(p, buf_size, format, args);
    res = res > buf_size ? buf_size : res;
    p += res;
    
    // 6. End line marker
    if (p[-1] != '\n')
    {
        p[0] = '\n';
        p[1] = '\0';
    }
    
    // Output
    fprintf(stream, "%s", line);
}

//////////////////////////////////////////////////////////////////////////////////////
// Global (process wide) logger configuration
static Level gMaxLevel = LL_INFO;                   // Maximum logging level
static bool gUseSyslog = false;
static bool gUseStdout = false;
static bool gHumanReadableTimestamp = true;
    
#ifdef HAVE_SYSLOG
static char gSyslogTag[64];
#endif // HAVE_SYSLOG
// Formating options
static __thread unsigned int gIndent = 0;           // Thread specific indent
static bool gShowTID = true;                        // Show thread id

static unsigned int incIndent() { ++gIndent; return gIndent; }
static unsigned int decIndent() { --gIndent; return gIndent; }


// Log one event
void vprint(Level level, const char* format, va_list args)
{
    if (level > gMaxLevel)
        return;
    
    int tid = gShowTID ? getThreadId() : 0;
    /* v*printf/v*syslog functions might modify args (platform dependent,
       true for amd64), so we need to va_copy() if we plan to use args
       twice */
    switch (gUseSyslog | (1 << gUseStdout)) {
    case 3: {
        va_list argsCopy;
        va_copy(argsCopy, args);
        writeToSyslog(level, tid, gIndent, format, argsCopy);
        va_end(argsCopy);
    }
        /* FALLTHROUGH */
    case 2:
        writeToStream(stdout, level, gHumanReadableTimestamp, tid, gIndent, format, args);
        break;
    case 1:
        writeToSyslog(level, tid, gIndent, format, args);
        break;
    }
}



//////////////////////////////////////////////////////////////////////////////////////
// Logging API

// Configure logger    
void openSyslog(const char* tag, bool appendPID)
{
#ifdef HAVE_SYSLOG    
    assert(tag != nullptr);
    assert(gUseSyslog == false);
    
    if (appendPID)
        std::snprintf(gSyslogTag, sizeof(gSyslogTag)-1, "%s[%d]", tag, getpid());
    else
        std::strncpy(gSyslogTag, tag, sizeof(gSyslogTag)-1);
    
    openlog(gSyslogTag, 0, LOG_USER);
    gUseSyslog = true;
#endif // HAVE_SYSLOG
}

void openStdout()
{
    assert(gUseStdout == false);
    gUseStdout = true;
}

void close()
{
#ifdef HAVE_SYSLOG    
    if (gUseSyslog)
    {
        closelog();
        gUseSyslog = false;
    }
#endif // HAVE_SYSLOG    
    gUseStdout = false;
}

void setLevel(Level level)
{
    gMaxLevel = level;
}

// currently used logging level 
Level getLevel()
{
    return gMaxLevel;
}

// parse string as logging level
//  Supported:
//  - one digit  (0-5)
//  - one letter (n, e, w, i, d, t)
//  - full name  (none, error, warning, info, debug, trace)
static const struct LevelName
{
    const char* name;
    Level       level;
} LevelNames[] = 
{
    {"5",       LL_TRACE},
    {"t",       LL_TRACE},
    {"trace",   LL_TRACE},

    {"4",       LL_DEBUG},
    {"d",       LL_DEBUG},
    {"debug",   LL_DEBUG},

    {"3",       LL_INFO},
    {"i",       LL_INFO},
    {"info",    LL_INFO},
    
    {"2",       LL_WARNING},
    {"w",       LL_WARNING},
    {"warning", LL_WARNING},
    
    {"1",       LL_ERROR},
    {"e",       LL_ERROR},
    {"error",   LL_ERROR},
    
    // disable logging
    {"0",       (Level)0},
    {"n",       (Level)0},
    {"none",    (Level)0}
};

bool setLevel(const char* level)
{
    assert(level != nullptr);

    static const size_t levelNamesCount = sizeof(LevelNames)/sizeof(LevelNames[0]);
    for(size_t i = 0; i < levelNamesCount; i++)
    {
        if (strcasecmp(level, LevelNames[i].name) == 0)
        {
            gMaxLevel = LevelNames[i].level;
            return true;
        }
    }
    return false;
}

void setHumanReadableTimestamp( bool isHumanReadable )
{
    gHumanReadableTimestamp = isHumanReadable;
}

// Log events
void print(Level level, const char* format, ...)
{
    va_list args;
    va_start(args, format);
    vprint(level, format, args);
    va_end(args);
}

void error(const char* format, ...)
{
    va_list args;
    va_start(args, format);
    vprint(LL_ERROR, format, args);
    va_end(args);
}

void warning(const char* format, ...)
{
    va_list args;
    va_start(args, format);
    vprint(LL_WARNING, format, args);
    va_end(args);
}

void info(const char* format, ...)
{
    va_list args;
    va_start(args, format);
    vprint(LL_INFO, format, args);
    va_end(args);
}

void debug(const char* format, ...)
{
    va_list args;
    va_start(args, format);
    vprint(LL_DEBUG, format, args);
    va_end(args);
}

void trace(const char* format, ...)
{
    va_list args;
    va_start(args, format);
    vprint(LL_TRACE, format, args);
    va_end(args);
}

//////////////////////////////////////////////////////////////////////////////////////
// Function call logger

// TRACE level
Call::Call(const char* name, ...) 
: mLevel(LL_TRACE)
{
    va_list args;
    va_start(args, name);
    init(name, args);
    va_end(args);
}

// Custom level
Call::Call(Level level, const char* name, ...)
: mLevel(level)
{
    va_list args;
    va_start(args, name);
    init(name, args);
    va_end(args);
}

void Call::init(const char* name, va_list args)
{
    assert(name != nullptr);

    // Extract function name (without arguments list)
    const char* p = std::strchr(name, '(');
    if (p == nullptr)
        mName = name;
    else
        mName.assign(name, p - name);
    
    // Log enter function
    vprint(mLevel, (std::string("->") + std::string(name)).c_str(), args);
    
    // increase indent
    incIndent();
    
}

Call::~Call()
{
    // Leave function. Decrease indent and log function name without arguments
    decIndent();
    print(mLevel, (std::string("<-") + mName).c_str());
}

////////////////////////////////////////////////////////////
// C++ like logging
//  
// Example:
//  log(ERR) << "Error code:" << err;

// Disabled stream
MessageOstream::MessageOstream()
: mEnabled(false)
{
    mMessageStream = std::unique_ptr<std::ostringstream>( new std::ostringstream() );
}

// Active stream with specified logging level
MessageOstream::MessageOstream(Level level)
: mEnabled(true)
, mLevel(level)
{
    mMessageStream = std::unique_ptr<std::ostringstream>( new std::ostringstream() );
}

// Move constructor
MessageOstream::MessageOstream(MessageOstream&& other)
: mEnabled(other.mEnabled)
, mLevel(other.mLevel)
, mMessageStream(std::move(other.mMessageStream))
{}


// Output message and the end of sentence
MessageOstream::~MessageOstream()
{
    if (mEnabled && mMessageStream != nullptr )
    {
        std::string message = mMessageStream->str();
        if (!message.empty())
            print(mLevel, "%s", message.c_str());
    }
}


// Start logging
MessageOstream log(Level level)
{
    return level <= gMaxLevel ? MessageOstream(level) : MessageOstream();
}
    
} // namespace log

/*
 * Local Variables:
 * c-basic-offset: 4
 * indent-tabs-mode: nil
 * End:
 */
		
