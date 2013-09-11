
 #include <stdio.h>
#include <stdlib.h>
#include <assert.h>

#include "array_generator.h"

//Fisher-Yates shuffle which starts with the sorted array of elements and generate a random permutation
int* rand_array(const int size)
{
    int i;
    int *elements = malloc(sizeof(int)*size);

    // inizialize
    for (i = 0; i < size; ++i)
      elements[i] = i;

    for (i = size - 1; i > 0; --i) {
      // generate random index
      int w = rand()%i;
      // swap items
      int t = elements[i];
      elements[i] = elements[w];
      elements[w] = t;
    }
    return elements;
}

int* best_case_array(const int size)
{
    int i;
    int *elements = malloc(sizeof(int)*size);

    // inizialize
    for (i = 0; i < size; ++i)
      elements[i] = i;

    return elements;
}

int* worst_case_array(const int size)
{
    int i;
    int *elements = malloc(sizeof(int)*size);

    // inizialize
    for (i = size - 1; i >= 0; --i)
      elements[size - i - 1] = i;

    return elements;
}

void arr2file(const int arr[], const int size, const char* fname)
{
    int i;
    FILE *f = fopen(fname, "w");
    for(i = 0; i < size; i++)
    {
        fprintf(f, "%d\n", arr[i]);
    }   
    fclose(f);
}

int* file2arr(const char* file_name, const int size)
{
    int i;
    int* elements = NULL;
    FILE *f = fopen(file_name, "r");
    if(f != NULL)
    {
        elements = calloc(size, sizeof(int));
        char line[128];
        for(i = 0; i < size; i++)
        {
            if( fgets(line, sizeof(line), f) == NULL )
            {
                printf("EOF: Cannot read line %d ", i);
                assert(0);
            }
            int num = atoi(line);
            elements[i] = num;
        }
    }
    else
    {
        perror( file_name );
        assert(0);
    }
    return elements;
}
