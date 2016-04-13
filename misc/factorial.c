#include <stdlib.h>
#include <stdio.h>

unsigned long long fact(unsigned long long n)
{
    if (n < 0) {
        return 0;
    } else if (n == 0) {
        return 1;
    } else if (n == 1) {
        return 1;
    } else {
        return n * fact(n-1);
    }
}

/* int facttail(int n, int a) */
/* { */
/*     if (n < 0) { */
/*         return 0; */
/*     } else if (n == 0) { */
/*         return 1; */
/*     } else if (n == 1) { */
/*         return a; */
/*     } else { */
/*         return n * facttail(n-1, n*a); */
/*     } */
/* } */



int main(int argc, char** argv)
{
//    facttail(1000000000, 1);
    if (argc < 2)
        return -1;
    
    printf("Res: %llu\n", fact(atoi(argv[1])));
    return 0;
}
