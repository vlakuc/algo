#!/bin/sh
FFMPEG_PATH=/home/vkuchuk/proj/epiphan_svn_trunk/epiphan/vga2cpu/ltib/vga2web/src/ffmpeg/ffmpeg-2.2.1/
OBJSTREAM_PATH=/home/vkuchuk/proj/epiphan_svn_trunk/epiphan/vga2cpu/ltib/vga2web/src/libobjstream/libobjstream/
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:${FFMPEG_PATH}/libavfilter:${FFMPEG_PATH}/libavdevice:${FFMPEG_PATH}/libavformat:${FFMPEG_PATH}/libavcodec:${FFMPEG_PATH}/libavutil:${FFMPEG_PATH}/libswscale:${FFMPEG_PATH}/libswresample:${OBJSTREAM_PATH}/lib"

gdb --args $@
#$@

