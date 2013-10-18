#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh
export PATH=$PATH:$CODEBASE_PATH/loewe/buildtools/compenv/common/comp/i686-linux+stlinux-2.4/bin/
# path to dvbcrash.log
$CODEBASE_PATH/loewe/tools/scripts/crashlogs/evalCrashlog.sh $1

