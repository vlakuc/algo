#include <boost/program_options.hpp>
#include <iostream>
#include <fstream>
#include <sstream>


#include <boost/any.hpp>
#include <string>
using namespace std;
using namespace boost;
namespace po = boost::program_options;


//template<class T>
ostream& operator<<(ostream& out, any& a){
    if(a.type() == typeid(int))
        out << any_cast<int>(a);
    else if(a.type() == typeid(double))
        out << any_cast<double>(a);
    else if(a.type() == typeid(string))
        out << any_cast<string>(a);
//    out << any_cast<T>(a);
    return out;
    
    // else ...
    // But what about other types/classes ?!
    
}

#define PRINT_NAME(x) std::cout << #x << " - " << typeid(x).name() <<" [dem] " << boost::core::demangle( typeid(x).name() )  << '\n'


void checkTypes()
{
        any a = 5;

    cout << a << endl;

    cout << typeid(void).name() << endl;

    string s = "hello";
    any b(s);
    cout << any_cast<string>(b) << endl;
    cout << b << endl;

    size_t v;
    any c(v);
    cout << any_cast<size_t>(c) << endl;

    PRINT_NAME(char);
    PRINT_NAME(signed char);
    PRINT_NAME(unsigned char);
    PRINT_NAME(short);
    PRINT_NAME(unsigned short);
    PRINT_NAME(int);
    PRINT_NAME(unsigned int);
    PRINT_NAME(long);
    PRINT_NAME(unsigned long);
    PRINT_NAME(float);
    PRINT_NAME(double);
    PRINT_NAME(long double);
    PRINT_NAME(char*);
    PRINT_NAME(const char*);
    PRINT_NAME(string);

    std::cout << boost::core::demangle( "x" )  << '\n';
    std::cout << boost::core::demangle( "NSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEEE" )  << '\n';

}

int main(int argc, char * argv[]){
    po::variables_map settings;
    po::options_description desc("Allowed options");
    desc.add_options()
    ( "help"    , "print help" )
    ( "v"       , po::value<std::string>()->default_value("info")->value_name("level"), "logging level (err,warn,info,debug,trace)" )
    ( "syslog"  , po::value<std::string>()->value_name("tag"), "syslog tag (logging will be switched to syslog)" )
    ( "f"       , po::value<std::vector<std::string>>()->multitoken()->value_name("names"), "configuration files" )
    ( "json",   "JSON config");


    po::positional_options_description p;
    p.add("json", -1);
    
    try
    {
        po::store(po::command_line_parser(argc, argv).
                  options(desc).positional(p).run(), settings);
        
        if( settings.count("help") )
        {
            std::cout << desc << std::endl;
            return 1;
        }
        if( settings.count("json") )
        {
            std::cout << "Input jsons are: " 
                 << settings["json"].as< string >() << "\n";
            return 1;
        }

        
        po::notify(settings);
    }
    catch(po::error_with_option_name& e)
    {
        std::cout << "Bad options: " << e.what() << std::endl;
        return 1;
    }
    std::string s;// = "hello";
    //std::ifstream ifs;
    std::istream* ii;
    ii = new std::istringstream(s);
    std::cout << ii->good();
    std::ifstream ifs("asdfa");
    std::cout << ifs.good();
    std::cout << ifs.is_open();
    




}

