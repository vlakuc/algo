#!/bin/bash

source proj_env.sh

export COMPENV=$CODEBASE_PATH/loewe/buildtools/compenv/linux-hosttools

cd $CODEBASE_PATH/loewe/chassis/sl200/project

make -f projectmakefile -j4 debug install

