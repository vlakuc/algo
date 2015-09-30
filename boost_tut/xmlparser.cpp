#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/xml_parser.hpp>
#include <boost/foreach.hpp>
#include <boost/locale.hpp>
#include <boost/algorithm/string.hpp>


#include <unicode/unistr.h>
#include <unicode/ustream.h>

using boost::property_tree::ptree;


namespace {
    static const int XML_SCHEMA_VERSION = 1;
    void printTree(const ptree& pt)
    {
        
        std::ostringstream oss;
        write_xml(oss, pt);
        std::cout <<  oss.str() << std::endl;
    }
    void createXmlDoc(std::string& doc)
    {
        ptree pt;
        ptree rootNode;
        rootNode.put("<xmlattr>.Version", XML_SCHEMA_VERSION);
        ptree cridsNode;
        rootNode.add_child("Crids", cridsNode);
        pt.add_child("CridsData", rootNode);
        std::ostringstream oss;
        write_xml(oss, pt);
        doc = oss.str();
    }

    void addOrUpdateCrid(const int type, const std::string& val, std::string& doc)
    {
        if (doc.empty())
        {
            createXmlDoc(doc);
        }
        ptree tree;
        std::istringstream iss(doc);
        read_xml(iss, tree);
        try
        {
            ptree ch = tree.get_child("CridsData.Crids");
            bool updated = false;
            BOOST_FOREACH(ptree::value_type &v, ch)
            {
                // The data function is used to access the data stored in a node.
                if (v.second.get<int>("<xmlattr>.Type") == type)
                {
                    v.second.put("<xmlattr>.Value", val);
                    updated = true;
                    break;
                }
            }
            if (!updated)
            {
                printTree(tree);
                ptree pt = tree.get_child("CridsData");
                printTree(pt);
                ptree cridNode;
                cridNode.put("<xmlattr>.Type", type);
                cridNode.put("<xmlattr>.Value", val);
                pt.add_child("Crid", cridNode);
                printTree(pt);
                tree.add_child("CridsData.Crids", pt);
            }
        } catch (std::exception& e) {
            std::cout << e.what() << std::endl;
        }
        std::ostringstream oss;
        write_xml(oss, tree);
        doc = oss.str();
    }
}


void readCridTree()
{
    ptree tree;
    std::ostringstream oss;
    // oss << "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
    //        "<CridData><Crids><Crid><Type>49</Type><Value>Series1</Value>"
    //        "</Crid></Crids></CridData>";

    oss <<
        "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
        "<CridsData>"
        "<Crids>"
        "    <Crid Type=\"50\" Value=\"Series1\"/>"
        "    <Crid Type=\"49\" Value=\"Prog1\"/>"
        "</Crids>"
        "</CridsData>";

    std::istringstream iss(oss.str());
    read_xml(iss, tree);
    std::cout << oss.str() << std::endl;
//    std::cout << tree.get("CridData.Crids.Crid", "none") << std::endl;

    BOOST_FOREACH(ptree::value_type &v, tree.get_child("CridData.Crids")) {
        // The data function is used to access the data stored in a node.
        std::cout << v.second.get<std::string>("<xmlattr>.Type") << std::endl;
        std::cout << v.second.get<std::string>("<xmlattr>.Value") << std::endl;
//        std::cout << v.second.get<std::string>("CridData.Crids.Crid") << std::endl;
        // BOOST_FOREACH(ptree::value_type &w, tree.get_child("CridData.Crids.Crid")) {
        //     std::cout << w.second.data() << std::endl;
        // }
    }

}

void writeCridTree()
{
    ptree pt;
    ptree rootNode;
    ptree cridsNode;
    ptree cridNode1;
    ptree cridNode2;
    cridNode1.put("<xmlattr>.Type", "50");
    cridNode1.put("<xmlattr>.Value", "Series1");
    cridsNode.add_child("Crid", cridNode1);

    cridNode2.put("<xmlattr>.Type", "49");
    cridNode2.put("<xmlattr>.Value", "Prog1");
    cridsNode.add_child("Crid", cridNode2);

    rootNode.add_child("Crids", cridsNode);
    pt.add_child("CridsData", rootNode);

//     root.add_child("CridData", root);

//     ptree pt;
//     pt.put("Type", "50");
//     pt.add("Type.Value", "Series1");
//     pt.add("Type.Value", "Series2");
//     pt.put("Type", "49");
//     pt.add("Type.Value", "Prog1");
// //    pt.add("InactiveDates.inactiveDate", 1);

//     root.add_child("CridData.Crids.Crid", pt);
    //std::string res;
    std::ostringstream oss;


    boost::property_tree::xml_writer_settings<char> settings('\t', 1);
    
    write_xml(oss, pt, settings);
//    write_xml(oss, root);
    std::cout << oss.str() << std::endl;

}

void checkInsert()
{
    std::cout << __FUNCTION__ << std::endl;
    std::string s("P?\211^h\272\211^@\\\206^@\210\212^");
    for( size_t p = 0; ( p = s.find_first_of( '\'', p ) ) != std::string::npos; p += 2 ) {
        s.insert( p, "'", 1 );
    }
}

size_t getLevenshteinDistance( const std::string &s1, const std::string &s2 )
{
    const size_t m( s1.size() );
    const size_t n( s2.size() );

    if( m==0 ) return n;
    if( n==0 ) return m;

    size_t *costs = new size_t[n + 1];

    for( size_t k=0; k<=n; k++ ) costs[k] = k;

    size_t i = 0;
    for( std::string::const_iterator it1 = s1.begin(); it1 != s1.end(); ++it1, ++i )
    {
        costs[0] = i+1;
        size_t corner = i;

        size_t j = 0;
        for( std::string::const_iterator it2 = s2.begin(); it2 != s2.end(); ++it2, ++j )
        {
            size_t upper = costs[j+1];
            if( *it1 == *it2 )
            {
                costs[j+1] = corner;
            }
            else
            {
                size_t t(upper<corner?upper:corner);
                costs[j+1] = (costs[j]<t?costs[j]:t)+1;
            }

            corner = upper;
        }
    }

    size_t result = costs[n];
    delete [] costs;

    return result;
}


void checkLocale()
{
    std::string s = "Уральские пельмени. Гаджеты";
    std::string s1 = "Уральскиё пельмени. Гаджеты";

    std::cout << "Length s: " << s.length() << std::endl;
    std::cout << "Length s1: " << s1.length() << std::endl;

    std::cout << "Dist: " << getLevenshteinDistance( s, s ) << std::endl;
    std::cout << "Dist: " << getLevenshteinDistance( s, s1 ) << std::endl;
    std::cout << "Dist  abc: " << getLevenshteinDistance( "abc", "cba" ) << std::endl;
    
    std::cout << s << std::endl;
    boost::algorithm::to_lower(s);
    std::cout << s << std::endl;

    //char const * someString = "Eidenges\xe4\xdf";
    icu::UnicodeString someUString( s.c_str(), "UTF-8" );
    std::cout << someUString.toLower() << "\n";
    std::cout << someUString.toUpper() << "\n";
    std::cout << "Length ICU s: " << someUString.length() << std::endl;
//    std::cout << "Dist: " << getLevenshteinDistance( someUString.getBuffer(), s ) << std::endl;
    //std::cout << boost::locale::to_lower(s) << std::endl;

    s = "Sesamstraße präsentiert: Eine Möhre für Zwei";
    icu::UnicodeString someUStringD( s.c_str(), "UTF-8" );
    std::cout << someUStringD.toLower() << "\n";
    std::cout << someUStringD.toUpper() << "\n";

    std::cout << "Dist: " << getLevenshteinDistance( s, s ) << std::endl;

}

void checkSplit()
{
    std::string line("test test2 test3");
    std::vector<std::string> strs;
    boost::split(strs,line,boost::is_any_of(" "));
    for (size_t i = 0; i < strs.size(); i++)
        std::cout << strs[i] << std::endl;
}

int main()
{
//    std::string doc;
//    addOrUpdateCrid(49, "/prog1", doc);
//    std::cout << doc << std::endl;
    //readCridTree();
//    writeCridTree();
//    checkInsert();
//    checkLocale();
    checkSplit();
    return 0;
    ptree root;
    root.add_child("Links", root);

    ptree pt;
    pt.put("DvbTriplet", "233A10260400");
    pt.put("FavListId", "sl148a9a7f-a967-4a73-80d6-e71d51942863");
    pt.put("EventId", 4003);
//    pt.add("InactiveDates.inactiveDate", 1);

    root.add_child("Links.Link", pt);
    //std::string res;
    std::ostringstream oss;


    boost::property_tree::xml_writer_settings<char> settings('\t', 1);
    
    write_xml(oss, root, settings);
//    write_xml(oss, root);
    std::cout << oss.str() << std::endl;

    return 0;
}
