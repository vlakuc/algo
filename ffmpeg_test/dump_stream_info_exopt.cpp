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
#include <libavutil/dict.h>
}

#include <vector>

#include <objstream.h>

#include <boost/program_options.hpp>
#include <boost/program_options/positional_options.hpp>


namespace po = ::boost::program_options;


namespace {


const char program_name[] = "ffinfo";
void show_usage(void)
{
    av_log(NULL, AV_LOG_INFO, "Simple multimedia streams analyzer with output in JSON format\n");
    av_log(NULL, AV_LOG_INFO, "usage: %s [OPTIONS] [INPUT_FILE]\n", program_name);
    av_log(NULL, AV_LOG_INFO, "\n");
}


std::map<std::string, int> LogLevels {
        { "quiet"  , AV_LOG_QUIET   },
        { "panic"  , AV_LOG_PANIC   },
        { "fatal"  , AV_LOG_FATAL   },
        { "error"  , AV_LOG_ERROR   },
        { "warning", AV_LOG_WARNING },
        { "info"   , AV_LOG_INFO    },
        { "verbose", AV_LOG_VERBOSE },
        { "debug"  , AV_LOG_DEBUG   }
    };

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
    AVDictionary* format_opts = nullptr;
    objstream::object json_info;
    json_info["status"] = "error";
    
    av_register_all();
    avformat_network_init();
    
    try {
        po::variables_map settings;
        po::options_description desc("Allowed options");
        desc.add_options()
            ( "help"    , "print help" )
            ( "loglevel"       , po::value<std::string>()->default_value("info")->value_name("level"),
              "logging level (quiet, panic, fatal, error, warning, info, verbose, debug)" )
            ( "timeout"       , po::value<std::string>()->value_name("timeout"), "tcp timeout" )
            ( "i"       , "input file"); // Need to add positional option also here, otherwilse wont't work
        po::positional_options_description p;
        p.add("i", -1);

        std::string timeout;
        std::string uri;

        po::store(po::command_line_parser(argc, argv).
                  options(desc).positional(p).run(), settings);
        
        if( settings.count("help") )
        {
            show_usage();
            std::cout << desc << std::endl;
            return 0;
        }
        if( settings.count("timeout") )
        {
            timeout = settings["timeout"].as<std::string>();
        }
        if (settings.count("i"))
        {
            uri = settings["i"].as<std::string>();
        }
        po::notify(settings);
        
        int logLevel = AV_LOG_INFO;
        auto it = LogLevels.find(settings["loglevel"].as<std::string>());
        if (it != LogLevels.end()) {
            logLevel = it->second;
        }
        av_log_set_flags(AV_LOG_SKIP_REPEATED);
        av_log_set_level(logLevel);
        
        if (uri.empty()) {
            throw std::runtime_error("No source url");
        }
        if (!timeout.empty()) {
            // Convert seconds to microseconds
            timeout += "000000";
            av_dict_set(&format_opts, "stimeout", timeout.c_str(), 0);
        }
        
        int res = 0;
        char errbuf[128];
        std::string msg = errbuf;
        if ((res = avformat_open_input( &ctx, uri.c_str(), NULL, &format_opts )) < 0)
        {
            av_strerror(res, errbuf, sizeof(errbuf));
            msg = errbuf;
            if (res == AVERROR(EIO)) {
                msg = "Connection failed";
            }
            throw std::runtime_error(msg.c_str());
        }
        if ((res = avformat_find_stream_info( ctx, NULL )) < 0)
        {
            av_strerror(res, errbuf, sizeof(errbuf));
            msg = errbuf;
            if (res == -1) {
                msg = "Stream not available";
            }
            throw std::runtime_error(msg.c_str());
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
    } catch (std::exception& e) {
        json_info["reason"] = e.what();
    }
    
    if (ctx) {
        avformat_close_input(&ctx);
    }
    if (format_opts) {
        av_dict_free(&format_opts);
    }
    std::cout << json_info << std::endl;
    
    avformat_network_deinit();
    return 0;
}
