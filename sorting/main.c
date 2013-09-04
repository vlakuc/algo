#include <stdio.h>

#include "array_generator.h"

const int ARR_SIZE = 10000;


void swap(int* a, int* b)
{
  int c = *a;
  *a = *b;
  *b = c;
}

void insertion_sort(int arr[], int n)
{
    printf("%s : %d\n", __FUNCTION__, n);
    int i,j;
    for(i = 1; i < n; i++)
    {
        j = i;
        while( (j > 0) && (arr[j] < arr[j-1]) )
        {
            swap(&arr[j], &arr[j-1]);
            j--;
        }
    }
}

void selection_sort(int arr[], int n)
{
    printf("%s : %d\n", __FUNCTION__, n);
    int i, j;
    int min;
    for(i = 0; i < n; i++)
    {
        min = i;
        for(j = i + 1; j < n; j++)
            if(arr[j] < arr[min]) min = j;
        swap(&arr[i], &arr[min]);
    }
}

void main()
{
  int* arr = rand_array(ARR_SIZE);
  //int* arr = best_case_array(ARR_SIZE);
  //int* arr = worst_case_array(ARR_SIZE);
  //insertion_sort(arr, ARR_SIZE);
  selection_sort(arr, ARR_SIZE);

  int i;
  for(i = 0; i < 5; i++)
    {
      printf("[%d] : %d\n", i, arr[i]);
    }
}
