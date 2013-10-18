#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh

cd $CODEBASE_PATH/loewe/chassis/sl200/project

env | grep STCONNECT

make jtag-prog
#make  hwid-patch
#make  jtag-img
#make  init-prog


