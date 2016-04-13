//-------------------------------------------------------------------
//
//  Copyright (c) 2016 Epiphan Systems Inc. All rights reserved.
//
//-------------------------------------------------------------------
//-------------------------------------------------------------------
// ffinfo.cpp - main source file to build ffinfo tool.
// This tool accepts media source uri and collects properties
// of that source (matadata, codec info, etc.) using ffmpeg library.
// INPUT: source uri (first positional command line argument)
// OUTPUT: media properties or error description in JSON format
//         printed to STDOUT
//-------------------------------------------------------------------

extern "C" {
#include <libavformat/avformat.h>
#include <libavutil/avstring.h>
#include <cmdutils.h>
}

#include <vector>

#include <objstream.h>


const char program_name[] = "ffinfo";
const int program_birth_year = 2016;
static const char *input_filename;
static const char *timeout;
static const OptionDef *options;

static void show_usage(void)
{
    av_log(NULL, AV_LOG_INFO, "Simple multimedia streams analyzer with output in JSON format\n");
    av_log(NULL, AV_LOG_INFO, "usage: %s [OPTIONS] [INPUT_FILE]\n", program_name);
    av_log(NULL, AV_LOG_INFO, "\n");
}

void show_help_default(const char *opt, const char *arg)
{
    av_log_set_callback(log_callback_help);
    show_usage();
    show_help_options(options, "Main options:", 0, 0, 0);
    printf("\n");
}

static void opt_input_file(void *optctx, const char *arg)
{
    if (input_filename) {
        av_log(NULL, AV_LOG_ERROR,
                "Argument '%s' provided as input filename, but '%s' was already specified.\n",
                arg, input_filename);
        exit_program(1);
    }
    if (!strcmp(arg, "-"))
        arg = "pipe:";
    input_filename = arg;
}

static int opt_input_file_i(void *optctx, const char *opt, const char *arg)
{
    opt_input_file(optctx, arg);
    return 0;
}

static int opt_timeout(void *optctx, const char *opt, const char *arg)
{
    timeout = arg;
    return 0;
}

static const OptionDef real_options[] = {
    { "h"          , OPT_EXIT, {.func_arg = show_help},         "show help", "topic" },
    { "?"          , OPT_EXIT, {.func_arg = show_help},         "show help", "topic" },
    { "help"       , OPT_EXIT, {.func_arg = show_help},         "show help", "topic" },
    { "-help"      , OPT_EXIT, {.func_arg = show_help},         "show help", "topic" },
    { "loglevel"   , HAS_ARG,  {.func_arg = opt_loglevel},      "set logging level", "loglevel" },
    { "v",           HAS_ARG,  {.func_arg = opt_loglevel},      "set logging level", "loglevel" },
    { "t",           HAS_ARG,  {.func_arg = opt_timeout},       "tcp timeout in seconds", "timeout"},
    { "i",           HAS_ARG,  {.func_arg = opt_input_file_i},  "read specified file", "input_file"},
    { NULL, },

};


namespace {
    
void dump_stream_info(const AVFormatContext* const ctx, const int index, objstream::object& json_stream)
{
    AVStream *st = ctx->streams[index];
    AVCodecContext* codec = nullptr;
    if (!st || !st->codec) {
        json_stream["codec_long_name"] = "Failed to get stream info";
        return;
    }
    codec = st->codec;
    json_stream["codec_name"] = avcodec_get_name(codec->codec_id);
    switch (codec->codec_id) {
    case AV_CODEC_ID_H264:
        json_stream["codec_long_name"] = "H.264";
        break;
    case AV_CODEC_ID_AAC:
        json_stream["codec_long_name"] = "AAC";
        break;
    default:
        json_stream["codec_long_name"] = json_stream["codec_name"];
        break;
    }

    if (codec->bit_rate) {
        json_stream["bit_rate"] = codec->bit_rate;
    }
    switch (codec->codec_type) {
    case AVMEDIA_TYPE_AUDIO:
        json_stream["codec_type"] = "audio";

        if (codec->sample_rate) {
            json_stream["sample_rate"] = codec->sample_rate;
        }
        char lsBuffer[128];
        av_get_channel_layout_string(lsBuffer, sizeof(lsBuffer), codec->channels, codec->channel_layout);
        json_stream["channel_layout"] = lsBuffer;
        break;
    case AVMEDIA_TYPE_VIDEO:
        json_stream["codec_type"] = "video";
        if (st->r_frame_rate.den && st->r_frame_rate.num) {
            json_stream["r_frame_rate"] = st->r_frame_rate.num / (double)st->r_frame_rate.den;
        }
        json_stream["width"] = codec->width;
        json_stream["height"] = codec->height;
        break;
    default:
        break;
    }
}

void dump_metadata(AVDictionary* const m, objstream::object& json_info)
{
    if (m && !(av_dict_count(m) == 1 && av_dict_get(m, "language", NULL, 0))) {
        AVDictionaryEntry *tag = NULL;
        while ((tag = av_dict_get(m, "", tag, AV_DICT_IGNORE_SUFFIX)))
            json_info[tag->key] = tag->value;
    }
}

} // namespace

int main(int argc, char *argv[])
{
    AVFormatContext *ctx = nullptr;
    objstream::object json_info;
    json_info["status"] = "error";
    
    av_register_all();
    avformat_network_init();

    init_opts();
    options = real_options;
    parse_options(NULL, argc, argv, options, opt_input_file);

    try {
        
        if (!input_filename) {
            throw std::runtime_error("No source url");
        }
        if (timeout) {
            std::string val(timeout);
            // Convert seconds to microseconds
            val += "000000";
            av_dict_set(&format_opts, "stimeout", val.c_str(), 0);
        }
        int res = 0;
        char errbuf[128];
        if ((res = avformat_open_input( &ctx, input_filename, NULL, &format_opts )) < 0)
        {
            av_strerror(res, errbuf, sizeof(errbuf));
            std::string msg = errbuf;
            if (res == AVERROR(EIO)) {
                msg = "Connection failed";
            }
            throw std::runtime_error(msg.c_str());
        }
        if ((res = avformat_find_stream_info( ctx, NULL )) < 0)
        {
            av_strerror(res, errbuf, sizeof(errbuf));
            throw std::runtime_error(errbuf);
        }
        dump_metadata(ctx->metadata, json_info);
        std::vector<objstream::object> json_streams;
        for (size_t i = 0; i < ctx->nb_streams; ++i) {
            objstream::object json_stream;
            dump_stream_info(ctx, i, json_stream);
            json_streams.push_back(json_stream);
        }
        if (json_streams.empty()) {
            json_info["reason"] = "Stream not available";
        } else {
            json_info["status"] = "ok";
            json_info["streams"] = json_streams;
        }
    } catch (std::runtime_error& e) {
        json_info["reason"] = e.what();
    }
    if (ctx) {
        avformat_close_input(&ctx);
    }
    std::cout << json_info << std::endl;
    
    uninit_opts();
    avformat_network_deinit();
    return 0;
}
