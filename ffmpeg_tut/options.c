
#include <stdio.h>

#include <libavformat/avformat.h>
#include <libavcodec/avcodec.h>


typedef struct OptionDef {
    const char *name;
    int flags;
    union {
        void *dst_ptr;
        int (*func_arg)(void *, const char *, const char *);
        size_t off;
    } u;
    const char *help;
    const char *argname;
} OptionDef;

static int opt_show_versions(const char *opt, const char *arg)
{
    printf("%s\n", __FUNCTION__);
    return 0;
}

static const OptionDef real_options[] = {
    { "show_versions",         0, {(void*)&opt_show_versions}, "show program and library versions" },
    { NULL, },
};

static void (*program_exit)(int ret);

static void ffprobe_cleanup(int ret)
{
    printf("%s called\n", __FUNCTION__);
}

/* typedef struct AVHWAccel { */
/*     /\** */
/*      * Name of the hardware accelerated codec. */
/*      * The name is globally unique among encoders and among decoders (but an */
/*      * encoder and a decoder can share the same name). */
/*      *\/ */
/*     const char *name; */
/* } AVHWAccel; */

//extern void dump_stream_format(AVFormatContext *ic, int i, int index, int is_output);


int main(int argc, char **argv)
{
/*     program_exit = ffprobe_cleanup; */
/*     program_exit(0); */

/*     AVHWAccel ff_h263_vaapi_hwaccel = { */
/* 	.name           = "h263_vaapi", */
/* }; */
/*     printf("%s called\n", ff_h263_vaapi_hwaccel.name ); */

    av_register_all();


    AVFormatContext *fmt_ctx = NULL;
    const char *src_filename = argv[1];

    printf("Open video file...\n" );
     /* Open video file */

    if(avformat_open_input(&fmt_ctx, src_filename, NULL, NULL)!=0)
        return -1; // Couldn't open file
    printf("Open video file...done\n" );

    /* retrieve stream information */
    if (avformat_find_stream_info(fmt_ctx, NULL) < 0) {
        fprintf(stderr, "Could not find stream information\n");
        exit(1);
    }


    // Dump information about file onto standard error

//    dump_stream_format(pFormatCtx, 0, 0, 0);
    av_dump_format(fmt_ctx, 0, src_filename, 0);
        //ff_ntp_time();
    avformat_close_input(&fmt_ctx);

}

