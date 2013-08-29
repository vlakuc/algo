
void swap(int* a, int* b)
{
  int c = *a;
  *a = *b;
  *b = c;
}

void insertion_sort(int arr[], int n)
{
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

void main()
{
  int arr[5] = { 10, 9, 8, 7, 6};
  insertion_sort(arr, 5);
  int i;
  for(i = 0; i < 5; i++)
    {
      printf("[%d] : %d\n", i, arr[i]);
    }
}
