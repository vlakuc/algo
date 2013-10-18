#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh

export COMPENV=$CODEBASE_PATH/loewe/buildtools/compenv/linux-hosttools
export COMPENV_PROJECT_LOCATION=$CODEBASE_PATH/loewe/buildtools/projects/tara/uiapp/host
export COMPENV_PROJECT_VARIANT=hosttools
export CODEBASE_DIR=$CODEBASE_PATH

cd $CODEBASE_PATH/loewe/buildtools/projects/tara/uiapp/bizmon/
./buildBizMon.sh