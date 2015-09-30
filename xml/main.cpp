


#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/xml_parser.hpp>
#include <boost/foreach.hpp>

//#include <libxml/parser.h>
//#include <libxml/tree.h>


int main()
{
// Create an empty property tree object
   using boost::property_tree::ptree;
   ptree pt;
   ptree pt1;
   ptree pt2;

   // Put log filename in property tree
   pt.add_child("TimerEntries", pt);
   pt1.put("id", "the_id");
   pt1.put("uri", "the_uri");
   pt1.add("aliases.alias", "1");
   pt1.add("aliases.alias", "2");
   pt2.put("id", "id2");
   pt2.put("uri", "uri2");
   pt2.add("aliases.alias", "3");
   pt2.add("aliases.alias", "4");


   pt.add_child("TimerEntries.Entry", pt1);
   pt.add_child("TimerEntries.Entry", pt2);
   //pt.add("debug.filename", "log.txt");
   //pt.add("debug.filename.id", "id");
   //pt.add("debug.filename.uri", "uri");
   //pt.add("debug.filename.id", "id1");
   //pt.add("debug.filename.uri", "uri2");

   //pt.add_child("debug.file.type", pt);
   //pt.add_child("debug.file.size", "txt");
   //pt.add_child("debug.file.type", "unk");
   //pt.add_child("debug.file.size", "unk");
   // Put debug level in property tree
   // pt.put("debug.level", "Warning");

   // Iterate over the modules in the set and put them in the
   // property tree. Note that the put function places the new
   // key at the end of the list of keys. This is fine most of
   // the time. If you want to place an item at some other place
   // (i.e. at the front or somewhere in the middle), this can
   // be achieved using a combination of the insert and put_own
   // functions.
   //BOOST_FOREACH(const std::string &name, m_modules)
   //   pt.add("debug.modules.module", name);
   //BOOST_FOREACH(ptree c, pt.get_child("TimerEntries.Entry"))
   BOOST_FOREACH(ptree::value_type& c, pt.get_child("TimerEntries"))
   {
       //std::cout << c.second.get<std::string>("");
       std::cout << c.first << std::endl;
       std::cout << c.second.get<std::string>("id") << std::endl;
       std::cout << c.second.get<std::string>("uri") << std::endl;
       boost::optional<ptree&> fail = c.second.get_child_optional("aliases");
       // BOOST_FOREACH(ptree::value_type& i, c.second.get_child("aliases"))
       if(fail) {
           BOOST_FOREACH(ptree::value_type& i, fail.get())
           {
               // std::cout << i.second.get<std::string>("") << std::endl;
               std::cout << i.second.get<int>("") << std::endl;
               //std::cout << i.first.g << std::endl;
           }
       }
   }

   // Write the property tree to the XML file.
   write_xml("config.xml", pt);
   std::string CURRENT_SELECT_STATEMENT = 
        "SELECT "
        "T.ID AS ID,"
        "title,"
        "sourceUUID,"
        "sourceURI,"
        "sourceName,"
        "sourceMediaItemLocator,"
        "sourceAncestorUUID,"
        "sourceEPGEventID,"
        "destinationRecorderID,"
        "destinationRecorderURI,"
        "destinationVolumeID,"
        "parentalLockPIN,"
        "CAMLockPIN,"
        "CRID,"
        "seriesTag,"
        "startTimeUTC,"
        "endTimeUTC,"
       "startTimeLocal;\n";
   size_t pos1 = CURRENT_SELECT_STATEMENT.find("seriesTag,");
   size_t pos2 = CURRENT_SELECT_STATEMENT.find("startTimeUTC,");
   std::string tmp = CURRENT_SELECT_STATEMENT.substr(0, pos1);
   std::cout << tmp << std::endl;
   tmp = CURRENT_SELECT_STATEMENT.substr(pos2);
   std::cout << tmp;
    return 0;
}
