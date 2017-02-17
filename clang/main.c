
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
//#include <memory.h>



void foo(int argc, char * argv[])
{
    printf("[1]: %s\n", argv[1]);
}

int testGetline()
{
    char *line = NULL;
    size_t len = 0;
    unsigned int lineno = 0;
    
       //error_message_count = 0;
//       while (! feof_unlocked (stdin))
  //       {
//           ssize_t n = getline (&line, &len, stdin);
    //       if (n <= 0)
             /* End of file or error.  */
     //        break;
     //      ++lineno;
    //       printf("line = %s\n", line);
    
           char* args[] = { "+", "aaa", "bbb", "ccc" };
           char** copy = (char**)malloc(4 * sizeof(char*)) ;
           copy[0] = strdup(args[0]) ;
           copy[1] = strdup(args[1]) ;
           copy[2] = strdup(args[2]) ;
           copy[3] = strdup(args[3]) ;

//           sscanf(line, "%c %s %s %s ", args[0], args[1], args[2], args[3]);
           switch (args[0][0]) {
               case '+':
                   printf("add: %s\n", line);
                   printf("[1]: %s\n", args[1]);
                   printf("[2]: %s\n", args[2]);
                   printf("[3]: %s\n", args[3]);
                   foo(3, copy);
                   break;
               case '-':
                   printf("delete: %s\n", line);
                   break;
               default:
                   printf("unknown: %s\n", line);
                   break;
           }


    //     }
      int i;
      for(i = 0; i < 4; i++)
      {
          free(copy[i]);
      }
      free(copy);

  //     free (line);
}


int main()
{
    static const int ARGS_NUM = 4;
//    static const int ARGS_LEN = ARGS_NUM * sizeof(char*);
    int arg_num = 0;
    int res = 0;
    char *line = NULL;
    size_t len = 0;
    char** args;
    char c = ' ';
    char keyname[32] = {0};
    char valname[32] = {0};
    char* val = NULL;

  
    args = (char**)malloc(ARGS_NUM * sizeof(char*));
    
    while (! feof_unlocked (stdin))
    {
        //len = 0;
        ssize_t n = getline(&line, &len, stdin);
        if (n <= 0) 
        {
            fprintf(stderr,"GETLINE failed\n");
            /* End of file or error.  */
            break;
        }
        //val = malloc(len);
        val = calloc(len, sizeof(char));

        fprintf(stderr,"GETLINE OK [%d] %s\n", len, line);
        sscanf(line, "%c %s %s %[^\n]", &c, keyname, valname, val);
        fprintf(stderr,"Value: %s\n", val);
        if (c != '+' && c != '-' && c != '\n')
        {
            fprintf(stderr,"Unknown command: %s\n", line);
            res = 0;
            free(val);
           // free(line);
            exit(111);
            break;
        }
        arg_num = ARGS_NUM - 1;
        switch (c) 
        {
        case '+':
            args[0] = (char*)"set"; //not used
            args[1] = keyname;
            args[2] = valname;
            args[3] = val;
            fprintf(stderr,"Len %d Value2: %s\n", strlen(val), args[3]);
            break;
        case '-':
            args[0] = (char*)"delete"; //not used
            args[1] = keyname;
            if (strlen(valname) > 0)
            {
                args[2] = valname;
            }
            else
            {
                args[2] = NULL;
                --arg_num;
            }
            break;
        case '\n':
             //Path through. Skip EOL
        default:
            break;
        }
        free(val);
   //     free(line);
   //     line = NULL;
    }
    free(args);
    free(line);
//    if(keyname != NULL) free(keyname);
//    if(valname != NULL) free(valname);
//    if(val != NULL) free(val);
    return res;
}
