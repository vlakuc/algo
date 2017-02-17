#include <vector>
#include <string>
#include <iostream>
#include <set>


int main()
{
    std::vector<int> vec {1, 2};
    for (const auto& s : vec) {
        switch(s) {
        case 1:
            std::cout << "one\n";
            break;
        case 2:
            std::cout << "two\n";
            break;
        default:
            break;
        }
    }

    enum class Color{red, green , blue};

    std::set<Color> s;

    s.insert(Color::red);
    std::cout << s.count(Color::red) << std::endl;
    std::cout << s.count(Color::green) << std::endl;


    return 0;
}
