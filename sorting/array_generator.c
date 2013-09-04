
#include <stdlib.h>


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
      elements[i] = i;

    return elements;
}


