
#include <string.h>
#include <stdlib.h>


static char* strdup_escape_xml(const char* p_str)
{
    struct {
        char        ch;
        const char* str;
        size_t      len;
    } table[] = {
        { '&', "&amp;" , 5 },
        { '<', "&lt;"  , 4 },
        { '>', "&gt;"  , 4 },
        { '"', "&quot;", 6 },
        { '\'',"&apos;", 6 }
    };
    size_t  n = sizeof(table) / sizeof(table[0]);
    size_t  i = 0;
    size_t  len = 0;
    char*   p_res = NULL;
    char*   p = NULL;
    size_t  res_len = 0;
    char    ch = 0;

    while ((ch = p_str[len]) != 0)
    {
        ++ res_len;
        for( i = 0; i < n; ++ i)
        {
            if (ch == table[i].ch)
            {
                res_len += (table[i].len - 1);
                break;
            }
        }
        ++ len;
    }

    p = p_res = malloc(res_len+1);
    for (size_t j = 0; j < len; ++ j)
    {
        ch = p_str[j];
        for(i = 0; i < n; ++ i)
        {
            if (ch == table[i].ch)
            {
                strncpy(p, table[i].str, table[i].len);
                p += table[i].len;
                break;
            }
        }
        if (i == n)
        {
            *p = ch;
            ++ p;
        }       
    }
    *p = 0;

    return p_res;
}



int main()
{
    char* p = strdup_escape_xml("AAA");
    free(p);
    p = strdup_escape_xml("");
    free(p);
    p = strdup_escape_xml(NULL);
    free(p);

    return 0;
}
