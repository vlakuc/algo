
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>


#include <jwt.h>

void test_jwt_decode_hs256()
{
	const char token[] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3Mi"
			     "OiJmaWxlcy5jeXBocmUuY29tIiwic3ViIjoidXNlcjAif"
			     "Q.dLFbrHVViu1e3VD1yeCd9aaLNed-bfXhSsF0Gh56fBg";
	unsigned char key256[32] = "012345678901234567890123456789XY";
	jwt_t *jwt;
        jwt_alg_t alg;
	int ret;

	ret = jwt_decode(&jwt, token, key256, sizeof(key256));
        alg = jwt_get_alg(jwt);
	//ck_assert_int_eq(ret, 0);
	//ck_assert(jwt != NULL);

        printf("res: %d\n", ret);
        printf("jwt: %p\n", jwt);
        printf("alg: %d\n", alg);
        

        
	jwt_free(jwt);
}


void test_jwt_decode()
{
	const char token[] = "eyJhbGciOiJub25lIn0.eyJpc3MiOiJmaWxlcy5jeXBo"
			     "cmUuY29tIiwic3ViIjoidXNlcjAifQ.";
	jwt_alg_t alg;
	jwt_t *jwt;
	int ret;

	ret = jwt_decode(&jwt, token, NULL, 0);
          printf("res: %d\n", ret);
//	ck_assert_int_eq(ret, 0);
//	ck_assert(jwt != NULL);
        printf("jwt: %p\n", jwt);

	alg = jwt_get_alg(jwt);
//	ck_assert(alg == JWT_ALG_NONE);

	jwt_free(jwt);
}


int main(int argc, char *argv[])
{
    //test_jwt_decode();
    test_jwt_decode_hs256();
    //return 0;
    //const char token[] = "MTU4NzIsL3ByZXZpZXcvY2hhbm5lbCwxNDU0NTkwMzMwLDE0NTQ1OTAzNDA=.MWUyYmJhMmU3ZWE3ZDRjNDI1N2M3MTdiNjNlZjU5YmI0YmUxMzFmZDIwNjdjNTU2N2Y5ZDIyZTdmYjU3OTdkZQ==";
    const char token[] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFRDc2RUI2NiIsImF1ZCI6InByZXZpZXdcL2NoYW5uZWwiLCJuYmYiOjE0NTQ2MDUwODYsImV4cCI6MTQ1NDYwNTE0Nn0.9HlmTvfTeaI81dW9_W-cnyTqLbB4ja7ZHcZd96P4c0U";
//    const char key[] = "xNNLr5HL92/JzGxJqED02g==";
    const char key[] = "LJiifVSeo57MBApT9dvfpsm05F8cD3peQ49YzmcWAU0=";

    jwt_alg_t alg;
    jwt_t *jwt;
    int ret;
    char *out;


    printf("key len: %d\n", sizeof(key));
    ret = jwt_decode(&jwt, token, key, 32);

    printf("res: %d\n", ret);
    printf("jwt: %p\n", jwt);

    out = jwt_dump_str(jwt, 0);

    printf("dump: %s\n", out);

    return 0;
}
