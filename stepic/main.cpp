#include <iostream>
//#include <stdlib.h>
#include <sstream>
#include <iterator>
#include <vector>

// int fib(int x) {
//     if (x == 0)
//         return 0;

//     if (x == 1)
//         return 1;

//     return fib(x-1)+fib(x-2);
// }

// int fib2()
// {
//     int num1 = 0, num2 = 1, num_next = 1, n;
//     std::cin >> n;
//     // if (n>=1)
//     //     cout << num1 << " ";
//     // if (n>=2)
//     //     cout << num2 << " ";
//     for (int i = 0; i < n-1; i++){
//         num_next = num1 + num2;
//         num1 = num2;
//         num2 = num_next;
//     }
//     std::cout << num_next << std::endl;
//     return 0;
// }

// int fibLastDig(int n)
// {
//     int num1 = 0, num2 = 1, num_next = 1;
//     for (int i = 0; i < n-1; i++){
//         num_next = (num1 + num2) % 10;
//         num1 = num2;
//         num2 = num_next;
//     }
//     std::cout << num_next << std::endl;
//     return 0;
// }

void countSort()
{
    int n;
    std::string input;
    getline(std::cin, input);
    std::istringstream iss(input);
    iss >> n;
    getline(std::cin, input);
    std::stringstream ss(input);
    std::istream_iterator<int> begin(ss);
    std::istream_iterator<int> end;
    std::vector<int> ids(begin, end);
    if (ids.size() > n) {
        //ids.resize(n);
    }
    n = ids.size();
    std::vector<int> vec(10);
    for (int i = 0; i < ids.size(); i++) {
        try {
            vec.at(ids[i])++;
        } catch (std::exception& e) {
            n--;
        }
    }
    //ids.resize(n);
    int k = 0;
    for (int i = 0; i < vec.size(); i++) {
        for (int j = 0; j < vec[i]; j++) {
            ids[k] = i;
            k++;            
        }
    }
    std::copy(ids.begin(), ids.end(), std::ostream_iterator<int>(std::cout, " "));
    std::cout << std::endl;
}

int main(int argc, char** argv) {
    // int a, b;
    // std::cin >> a >> b;
    // std::cout << a+b << std::endl;
    // std::cout << fib(10);
    // fib2();
    //fibLastDig();
    //std::cin >> n;
    // fibLastDig(atoi(argv[1]));
    countSort();

    
}
