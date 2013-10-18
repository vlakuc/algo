#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh

export COMPENV=$CODEBASE_PATH/loewe/buildtools/compenv/linux-hosttools
export ENABLE_BROWSER=0
export USE_CRASH_LOGGER=0
export ENABLE_NETCFG=0
export ENABLE_MASMAN=0
export ENABLE_RESMON_TV=0

cd $CODEBASE_PATH/loewe/buildtools/projects/loewe/biz

make -f projectmakefile -j4

