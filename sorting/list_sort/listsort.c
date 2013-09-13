/* llsort.c. Sort 1 or more lines of text.
 * Usage: llsort <infile> <outfile> <optional sort column>
 * Sort column - defaults to 1.
 * http://www.drdobbs.com/database/efficiently-sorting-linked-lists/184410973?pgno=1
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define maxLength 1000    /* n is the maximum length of an input line */

typedef struct GenericNode GenericNode;
struct GenericNode { GenericNode *next; };
void Sort(void ** pList, int (*comp) (void *, void *))
{
  int outindex;                 /* current output list (0 or 1) */
  GenericNode *p;               /* Scratch variable */
  GenericNode *in[2], *out[2];  /* Input/Output lists */
  GenericNode **outTail[2];     /* Track last items in output lists */
  GenericNode *lastOut;         /* Last node output */

  if(!*pList) return;           /* Empty list is already sorted */
  out[0] = *pList;              /* point out[0] to the list to be sorted */
  out[1] = 0;

  do {
    in[0] = out[0];             /* Move output lists to input lists */
    in[1] = out[1];

    if (!in[1]) {        /* Only one list? Grab first item from other list */
      p = in[0]; if(p) in[0] = in[0]->next;
    } else {             /* There are two lists, get the smaller item */
      int smallList = comp(in[0],in[1])  ? 0 : 1;
      p = in[smallList]; if(p) in[smallList] = in[smallList]->next;
    }
    /* Initialize out[0] to first item, clear out[1] */
    out[0] = p; outTail[0] = &(p->next); lastOut=out[0];
    p->next = (GenericNode *)0;
    outindex = 0;
    out[1] = (GenericNode *)0; outTail[1] = &(out[1]);

    while (in[0] || in[1]) {        /* while either list is not empty */
      if (!in[1]) {                 /* Second list empty, choose first */
        p = in[0]; if(p) in[0] = in[0]->next;
        if(comp(p,lastOut))         /* p < lastOut */
          outindex = 1-outindex;    /* switch lists */
      } else if (!in[0]) {          /* First list empty, choose second */
        p = in[1]; in[1] = in[1]->next;
        if(comp(p,lastOut))         /* p < lastOut */
          outindex = 1-outindex;    /* switch lists */
      } else if (comp(in[0],lastOut)) { /* in[0] < lastOut */
        if(!comp(in[1],lastOut)) {  /* lastOut <= in[1] */
          p = in[1]; in[1] = in[1]->next;
        } else {                    /* in[1] < lastOut */
          if(comp(in[0],in[1])) {   /* in[0] < in[1] */
            p = in[0]; in[0] = in[0]->next;
          } else {
            p = in[1]; in[1] = in[1]->next;
          }
          outindex = 1-outindex;    /* Switch lists */
        }
      } else {                     /* lastOut <= in[0] */
        if(comp(in[1],lastOut)) {  /* in[1] < lastOut */
          p = in[0]; in[0] = in[0]->next;
        } else {                   /* lastOut <= in[1] */
          if(comp(in[0],in[1])) {  /* in[0] < in[1] */
            p = in[0]; in[0] = in[0]->next;
          } else {
            p = in[1]; in[1] = in[1]->next;
          }
        }
      }
      *outTail[outindex] = p;
      outTail[outindex] = &(p->next);
      p->next = (GenericNode *)0;
      lastOut = p;
    }
  } while (out[1]);
  *pList = out[0];
}

/* If you're sorting on the first column, sortPointer will point to first 
 * character of 'info'. Otherwise, it will point further into the string. */
typedef struct MyNode {
  struct MyNode *next;
  char *sortPointer;                    /* Pointer to string to be sorted */
  char info[1];                         /* String data */
} MyNode;

int LT_comp(void *a, void *b) {
  char *p=((MyNode*)a)->sortPointer;
  char *q=((MyNode*)b)->sortPointer;
  return (strcmp(p,q) < 0);            /* True if a<b */
}

int LT_int_comp(void *a, void *b) {
  int p = atoi(((MyNode*)a)->sortPointer);
  int q = atoi(((MyNode*)b)->sortPointer);
  return p < q;            /* True if a<b */
}

int main (int argc,char **argv)
{
  FILE *infile, *outfile;
  MyNode *p, *list, **pTail;
  long int sort_column = 0;
  char st[maxLength], infn[256], outfn[256];

  if (argc < 2) {
    printf("Usage: %s infile outfile [number] \n",argv[0]);
    exit(1);
  }
   /* pick off the file names */
  strcpy( infn, argv[1]);
  strcpy(outfn, argv[2]);

  /* pick off the starting sort column (if it exists) */
  sort_column = 0;
  if (argc == 4 ) sort_column = atol(argv[3])-1;

  /* open the files */
  infile = fopen(infn,"r");
  if (!infile) {
    printf("File %s could not be found.\n",infn);
    exit(1);
  }
  outfile = fopen(outfn,"w");
  if (!outfile) {
    printf("Output file %s could not be opened.\n",outfn);
    exit(1);
  }
  /* initialize the list */
  list = 0; pTail = &list;
  /* read the input file and build the linked list */
  while (fgets(st,maxLength,infile))      /* get one line */
  {
    /* fetch a node that is just the right size */
    p = malloc(sizeof(MyNode)+strlen(st)+1);
    if(!p) {
      fprintf(stderr,"Out of memory!");
      return 1; 
    }
    /* copy the string into the info portion of the node */
    strcpy(p->info,st);
    /* sortPointer points to the part of the string being sorted */
    if (strlen(p->info) < sort_column) {
      p->sortPointer = "";          /* Too short, treat as empty string */
    } else {
      p->sortPointer = p->info + sort_column;
    }
    /* insert the node onto the tail end of the list */
    *pTail = p; pTail = &(p->next);
  }
  *pTail = 0; /* Terminate list with null */
  fclose(infile);

  printf("Sorting: %s by column %ld\n",infn, sort_column+1);
  Sort((void**)&list, LT_int_comp);

  /* Send the sorted data to the output file. */
  p = list;
  while(p) {
    fputs(p->info,outfile);
    p = p->next;
  }
  fclose(outfile);
  return 0;
}
