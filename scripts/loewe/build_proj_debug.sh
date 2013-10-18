#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh

cd $CODEBASE_PATH/loewe/chassis/sl200/project

#make -dp -f projectmakefile -j4 debug install > ~/tmp/debug_make.txt
make -f projectmakefile -j4 debug install 

