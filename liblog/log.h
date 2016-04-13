//////////////////////////////////////////////////////////////////////////////////////
// Logging
// (C) Epiphan Systems Inc. 2013
//
// Simple logging API
//////////////////////////////////////////////////////////////////////////////////////

#ifndef __EPIPHAN_LOG_H__
#define	__EPIPHAN_LOG_H__

#include <string>
#include <sstream>
#include <memory>
#include <boost/noncopyable.hpp>

namespace logger
{

// Logging level 
enum Level
{
    LL_ERROR = 1,      // error conditions
    LL_WARNING,        // warning conditions
    LL_INFO,           // informational message
    LL_DEBUG,          // debug-level message
    LL_TRACE           // trace message  
};

// Configure logger    
void openSyslog(const char* tag, bool appendPID = true);
void openStdout();
void close();
void setLevel(Level level);
bool setLevel(const char* level);   // parse string as logging level
Level getLevel();                   // currently used logging level
    
// If false, unix timestamp will be used in stdout logging.
// Default value is true.
void setHumanReadableTimestamp( bool isHumanReadable );

// Log events
void print(Level level, const char* format, ...);
void vprint(Level level, const char* format, va_list args);


void error(const char* format, ...);
void warning(const char* format, ...);
void info(const char* format, ...);
void debug(const char* format, ...);
void trace(const char* format, ...);
    
// Function call logger
class Call : boost::noncopyable
{
public:
    Call(const char* name, ...);                    // TRACE level
    Call(Level level, const char* name, ...);       // Custom level
    ~Call();
    
private:
    void init(const char* name, va_list args);
    
    Level       mLevel;     // Logging level
    std::string mName;      // Function name
};

#define LOG_FUNCTION_CALL logger::Call _call_logger ## __LINE__(__FUNCTION__)


////////////////////////////////////////////////////////////
// C++ like logging
//  
// Example:
//  log(LL_ERROR) << "Error code:" << err;

class MessageOstream : boost::noncopyable
{
public:
    MessageOstream(MessageOstream&& other);
    ~MessageOstream();
    
    template <typename T>
    MessageOstream& operator << (const T& v)
    {
        if (mEnabled && mMessageStream != nullptr)
            *mMessageStream << v;
        return *this;
    }
    
private:
    MessageOstream();                       // Disabled stream
    MessageOstream(Level level);            // Active stream with specified logging level
    
    bool                    mEnabled;       // Logging level is enough to output
    Level                   mLevel;         // Message logging level

    // std::stringstream is not move constructible in current buildsystem's libstdc++, so use this workaround.
    // (see https://gcc.gnu.org/bugzilla/show_bug.cgi?id=54316 for details)
    // /vkalinsky/
    std::unique_ptr<std::ostringstream> mMessageStream; // Message
    
    friend MessageOstream log(Level level);
};

// Start logging
MessageOstream log(Level level);
inline MessageOstream error()       { return log(LL_ERROR); }
inline MessageOstream warning()     { return log(LL_WARNING); }
inline MessageOstream info()        { return log(LL_INFO); }
inline MessageOstream debug()       { return log(LL_DEBUG); }
inline MessageOstream trace()       { return log(LL_TRACE); }


////////////////////////////////////////////////////////////
// Context logging
// Example:
//  logger::Logger mLogger("My class")
//  mLogger::error() << "Hello world";
    
class Logger : boost::noncopyable
{
private:
    std::string mPrefix;
    
public:
    void setPrefix( std::string prefix ) {
        mPrefix = prefix;
    }
    
    inline MessageOstream error()       { return std::move(logger::warning() << mPrefix << " "); }
    inline MessageOstream warning()     { return std::move(logger::warning() << mPrefix << " "); }
    inline MessageOstream info()        { return std::move(logger::info()    << mPrefix << " "); }
    inline MessageOstream debug()       { return std::move(logger::debug()   << mPrefix << " "); }
    inline MessageOstream trace()       { return std::move(logger::trace()   << mPrefix << " "); }
};
    
} // namespace logger

#endif	// __EPIPHAN_LOG_H__

