#include <stdio.h>

#include "sorting.h"


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
