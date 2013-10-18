#!/bin/bash
source /home/vkuchuk/proj/proj_env.sh

cd $CODEBASE_PATH/loewe/chassis/sl200/project
make -f projectmakefile prefixclean distclean

