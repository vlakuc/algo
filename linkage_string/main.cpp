
#include <string>
#include <iostream>
#include <iomanip>
#include <queue>
#include <boost/lexical_cast.hpp>
#include <boost/regex.hpp>


bool hasLcnLinkage(const std::string& link)
{
    bool res = false;
    //boost::regex xRegEx(".{17}");
    boost::regex xRegEx("((.{4})(.{4})(.{4})(.{4})(.{1}))");
    boost::smatch xResults;
    boost::regex_match(link,  xResults, xRegEx);
    std::cout << xResults.size() << std::endl;
    std::cout << xResults[0] << std::endl;
    std::cout << xResults[1] << std::endl;

    std::string::const_iterator xItStart = link.begin();
    std::string::const_iterator xItEnd = link.end();
    const int NET_ID_POS = 2;
    while( boost::regex_search(xItStart, xItEnd, xResults, xRegEx) )
    {
        std::cout << "Word, we've searched, is \"" << xResults[0] << "\". It has  \"" << xResults[NET_ID_POS] << "\" inside itself.\n";
        std::cout << xResults[0] << std::endl;
        std::cout << xResults[1] << std::endl;
        xItStart = xResults[1].second;

        unsigned int x;   
        std::stringstream ss;
        ss << std::hex << xResults[NET_ID_POS];
        std::cout << "STREAM: " << ss.str() << std::endl;
        ss >> x;
        if(x > 0) res = true;

        std::cout << "STREAM res: " << x << std::endl;
        ss.clear();
        ss << std::hex << xResults[0];
        std::cout << "STREAM: " << ss.str() << std::endl;
        ss.clear();
        std::stringstream sss;
        sss << std::hex << 64;
        std::cout << "INT2HEX: " << sss.str() << std::endl;
        sss.flush();
        sss << std::hex << 15;
        std::cout << "INT2HEX 2: " << sss.str() << std::endl;
    }
    std::string full = link;
    std::string part = "0000AAAAAA6507D13";
    std::string newPart = "FFFFFFFFFFFFFFFFF";
    std::size_t pos = full.find(part);
    full.replace(pos, newPart.size(), newPart);
    std::cout << "Replace: " << full << std::endl;

    return res;
}

void parseTriplet()
{
    std::string s = "rec://plain/dvbt?frontend=2&dvbtpriority=0&frequency=490019&bandwidth=1&inversion=2&modulation=8&onid=9018&sid=1024&tsid=4134";

}

struct Linkage {
    std::string origLinkage;
    std::string lcn;
    std::string uri;
    std::string constPart;

    std::string toString() {
        std::stringstream ss;
        ss << "origLinkage: " << origLinkage << "\n";    
        ss << "lcn        : " << lcn << "\n";
        ss << "constPart : " << constPart << "\n";
        return ss.str();
    }
};


void replaceLinkage()
{
    std::string link = "233A102603000BBA00000000000670FA13";
    //link = "00000000006507D13";
    //event->setLinkage(link);

    static boost::regex regex("((.{4})(.{4})(.{4})(.{4})(.{1}))");
    static const int WHOLE_MATCH_POS = 1;
    static const int NET_ID_POS = 2;
    static const int LCN_POS = 4;
    static const int EVENT_ID_POS = 5;
    static const int FLAGS_POS = 6;

    boost::smatch results;
    std::string::const_iterator itStart = link.begin();
    std::string::const_iterator itEnd = link.end();

    while( boost::regex_search(itStart, itEnd, results, regex) )
    {
        itStart = results[1].second;
        unsigned int nId = 0;
        std::stringstream ss;
        ss << std::hex << results[NET_ID_POS];
        ss >> nId;
        if (nId == 0) {
            std::stringstream lcns;
            lcns << std::hex << results[LCN_POS];
            lcns >> nId;
            Linkage l;
            l.origLinkage = results[WHOLE_MATCH_POS];
            l.constPart = results[EVENT_ID_POS] + results[FLAGS_POS];
            l.lcn = boost::lexical_cast<std::string>(nId);
            std::cout << l.toString();
            //l.event = event;
            //m_linksForUpdate.push(l);
        }
    }
    std::stringstream ss;
    ss << std::setfill('0') << std::setw(4);
    ss << std::hex << 1024;
    std::cout << ss.str();
}

void std_algo()
{
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, "\n"));
}

template<typename T>
void printOut(T& cont);

void incOne(int& i)
{
    i++;
}

template<>
void printOut< std::vector<int> >(std::vector<int>& v)
{
    std::for_each(v.begin(), v.end(), &incOne);
    std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, "\n"));
}


int main()
{

    //std::cout << hasLcnLinkage("00000000006507D130000AAAAAA6507D13") << std::endl;
    //std::cout << hasLcnLinkage("") << std::endl;

    //std::queue<std::string> q;
    //q.pop();

    //replaceLinkage();
    //std_algo();

    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);

    printOut(v);
    return 0;
}
