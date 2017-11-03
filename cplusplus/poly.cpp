#include <iostream>
#include <stdio.h>
#include <algorithm>
#include <boost/algorithm/string/case_conv.hpp>
#include <cctype>

using namespace std;

int main(int argc, char** argv){

    string input(argv[1]);
   // string input = s;

    //cout << "Enter a string: ";
    //cin >> input;
    
    input.erase(
    std::remove_if(input.begin(), input.end(),
                   [] (char c) { return std::isspace(c) || std::ispunct(c); }),
    input.end()
    );
     boost::algorithm::to_lower(input);

    if (input == string(input.rbegin(), input.rend())) {
        cout << "Yes";
    } else {
        cout << "No";
    }

    return 0;
}





