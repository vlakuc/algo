#include <stdlib.h>
#include <stdio.h>
#include <string.h>


typedef struct tree tree;
struct tree {
    int item;
    tree* parent;
    tree* left;
    tree* right;
};

insert_tree(tree** l, int x, tree* parent)
{
    tree* p;
    if(*l == NULL) {
        p = malloc(sizeof(tree));
        p->item = x;
        p->left = p->right = NULL;
        p->parent = parent;
        *l = p;
        return;
    }
    if(x < (*l)->item)
        insert_tree(&((*l)->left), x, *l);
    else
        insert_tree(&((*l)->right), x, *l);
}

traverse_tree(tree* l, FILE* outf)
{
    if(l != NULL) {
        traverse_tree(l->left, outf);
        fprintf(outf, "%d\n", l->item);
        traverse_tree(l->right, outf);
    }
}

int main(int argc, char** argv)
{
    FILE* infile, *outfile;
    tree* myTree;
    char infn[256];
    char outfn[256];
    char st[256];

    if(argc < 3)
    {
        printf("Usage: %s infile outfile", argv[0]);
        exit(1);
    }
    strcpy(infn, argv[1]);
    strcpy(outfn, argv[2]);
    infile = fopen(infn, "r");
    if(!infile) {
        printf("File %s could not be found.\n", infn);
        exit(1);
    }
    outfile = fopen(outfn, "w");
    if(!outfile) {
        printf("Output file %s could not be opened.\n", outfn);
        exit(1);
    }

    myTree = 0;
    while(fgets(st, 256, infile))
    {
        insert_tree(&myTree, atoi(st), 0);
    }
    close(infile);
    traverse_tree(myTree, outfile);
    close(outfile);
    return 0;
}
