#!/bin/sh

 cat  <<EOF > main.c
 #include <stdio.h>
 int main(void){ printf("Hello, world!\n"); }
EOF
gcc -O3 main.c
strip -s a.out
