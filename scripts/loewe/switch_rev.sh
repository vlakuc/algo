#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh

cd $CODEBASE_PATH
svn switch -r $1 https://develop.loewe.de/svn/tvsoft/codebase2011/trunk
