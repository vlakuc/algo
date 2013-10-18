#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh

export SIGNATURE_SERVER=localhost

cd $CODEBASE_PATH/loewe/chassis/sl200/project

make flash-img
