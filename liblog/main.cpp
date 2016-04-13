
#include <string>
#include <vector>
#include <memory>
#include <iostream>
#include <fstream>

#include "log.h"

void fromFile()
{
    logger::openStdout();
    logger::setLevel(logger::Level::LL_DEBUG);

    /////////////////////////
    std::string cfg;
    std::string line;
    std::ifstream ifs("./cfg.txt");
    if( ! ifs.good() )
    {
        std::cout << "Cannot open config" << std::endl;
        return;
    }
    while(!ifs.eof())
    {
        getline(ifs, line);
        cfg += line;
    }
    logger::debug() << "Configuration src \"" << cfg << "\" opened";    
    ////////////////////////

}



int main()
{
    fromFile();
    
    return 0;
}
