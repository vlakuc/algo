#!/bin/bash


LIB_PATH=/home/vkuchuk/proj/epiphan_svn_trunk/epiphan/vga2cpu/ltib/vga2web/src
LIBLOG_PATH=$LIB_PATH/liblog/liblog/lib/
LIBOBJ_PATH=$LIB_PATH/libobjstream/libobjstream/lib/

export LD_LIBRARY_PATH=$LIBOBJ_PATH:$LIBLOG_PATH
./main
