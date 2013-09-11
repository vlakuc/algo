#include <stdio.h>

#include "array_generator.h"
#include "sorting.h"

int main(int argc, void** argv)
{
    if(argc < 4)
    {
        printf("Usage: %s filename array_size algo_type\n", (char*)argv[0]);
        return 1;
    }
    int size = atoi(argv[2]);
    int* arr = file2arr(argv[1], size);
    //insertion_sort(arr, size);
    selection_sort(arr, size);

    int i;
    for(i = 0; i < size; i++)
    {
        //printf("[%d] : %d\n", i, arr[i]);
    }
    return 0;
}
