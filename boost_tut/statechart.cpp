
#include <boost/statechart/event.hpp>
#include <boost/statechart/state_machine.hpp>
#include <boost/statechart/simple_state.hpp>
#include <boost/statechart/transition.hpp>

#include <ctime>


#include <boost/crc.hpp>
#include <boost/functional/hash.hpp>


#include <boost/lexical_cast.hpp>
#include <boost/foreach.hpp>

namespace sc = boost::statechart;

struct EvStartStop : sc::event< EvStartStop > {};
struct EvReset : sc::event< EvReset > {};

struct Active;
struct StopWatch : sc::state_machine< StopWatch, Active > {};

struct Stopped;

// The simple_state class template accepts up to four parameters:
// - The third parameter specifies the inner initial state, if
//   there is one. Here, only Active has inner states, which is
//   why it needs to pass its inner initial state Stopped to its
//   base
// - The fourth parameter specifies whether and what kind of
//   history is kept

// Active is the outermost state and therefore needs to pass the
// state machine class it belongs to
struct Active : sc::simple_state<
  Active, StopWatch, Stopped >
{
public:
    typedef sc::transition< EvReset, Active > reactions;
    
    Active() : elapsedTime_( 0.0 ) {}
    double ElapsedTime() const { return elapsedTime_; }
    double & ElapsedTime() { return elapsedTime_; }

private:
    double elapsedTime_;
};

// Stopped and Running both specify Active as their Context,
// which makes them nested inside Active
struct Running : sc::simple_state< Running, Active >
{
public:
    typedef sc::transition< EvStartStop, Stopped > reactions;

    Running() : startTime_( std::time( 0 ) ) {}
    ~Running()
        {
            // Similar to when a derived class object accesses its
            // base class portion, context<>() is used to gain
            // access to the direct or indirect context of a state.
            // This can either be a direct or indirect outer state
            // or the state machine itself
            // (e.g. here: context< StopWatch >()).
            context< Active >().ElapsedTime() +=
                std::difftime( std::time( 0 ), startTime_ );
        }
private:
    std::time_t startTime_;
};

struct Stopped : sc::simple_state< Stopped, Active >
{
    typedef sc::transition< EvStartStop, Running > reactions;
};

// Because the context of a state must be a complete type (i.e.
// not forward declared), a machine must be defined from
// "outside to inside". That is, we always start with the state
// machine, followed by outermost states, followed by the direct
// inner states of outermost states and so on. We can do so in a
// breadth-first or depth-first way or employ a mixture of the
// two.



int hashCode(const std::string& s)
{
    boost::hash<std::string> string_hash;

    return string_hash(s);
}

void testForEach()
{
    static std::string ar[] = {"one", "another", "last"};
    BOOST_FOREACH(const std::string& s, ar)
    {
        std::cout << s << std::endl;
    }

    std::string s = "Hello0";
  boost::crc_32_type result;
  result.process_bytes(s.data(), s.length());
  unsigned tag = result.checksum();
  std::cout << tag << std::endl;
  
  std::cout << abs(hashCode("32521001fffddf4425643d3e7fe")) << std::endl;
  std::cout << hashCode("1001") << std::endl;
  std::cout << hashCode("1001") << std::endl;

  //std::cout << boost::lexical_cast<int32_t>( "3669185006" );

  unsigned int nId = 0;
  unsigned int progId = 0;
  std::stringstream ss;
  ss << std::hex << "A";
  ss >> progId;
  ss.clear();
  ss << std::hex << "B";
  ss >> nId;
  std::cout << progId << std::endl;
  std::cout << nId << std::endl;

}

int main()
{

    //testForEach();

  StopWatch myWatch;
  myWatch.initiate();

  myWatch.process_event( EvStartStop() );
  myWatch.process_event( EvStartStop() );
  myWatch.process_event( EvStartStop() );
  myWatch.process_event( EvReset() );
  

  return 0;
}
