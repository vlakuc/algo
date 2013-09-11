 #include <stdio.h>
#include <stdlib.h>

#include "array_generator.h"


void main(int argc, void** argv)
{
    int size = 10000;
    if(argc == 2)
    {
        size = atoi(argv[1]);
    }
    printf("size=%d\n", size);
    int* arr = rand_array(size);
    arr2file(arr, size, "rand_arr.txt");
    free(arr);
    arr = best_case_array(size);
    arr2file(arr, size, "asc_arr.txt");
    free(arr);
    arr = worst_case_array(size);
    arr2file(arr, size, "desc_arr.txt");
    free(arr);

    //int* best_case_array(const int size);

    //int* worst_case_array(const int size);
}
