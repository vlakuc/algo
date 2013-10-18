#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh

cd $CODEBASE_PATH/loewe/chassis/sl200/project

make -f projectmakefile -j4
#make -f projectmakefile
notify-send "Build finished!"
