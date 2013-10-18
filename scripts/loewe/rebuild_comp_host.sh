#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh
export COMPENV=$CODEBASE_PATH/loewe/buildtools/compenv/linux-hosttools
export ENABLE_BROWSER=0

#cd $CODEBASE_PATH/loewe/chassis/sl200/project

make -f makefile -j4

