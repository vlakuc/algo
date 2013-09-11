#ifndef _ARRAY_GENERATOR_H_
#define _ARRAY_GENERATOR_H_

//Fisher-Yates shuffle which starts with the sorted array of elements and generate a random permutation
int* rand_array(const int size);

int* best_case_array(const int size);

int* worst_case_array(const int size);

void arr2file(const int arr[], const int size, const char* fname);

int* file2arr(const char* file_name, const int size);


#endif
