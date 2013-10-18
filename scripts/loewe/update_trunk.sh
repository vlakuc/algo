#!/bin/bash

export PROJ_HOME=codebase2011_1_9

cd /home/vkuchuk/proj/$PROJ_HOME

svn up

~/devel.sh

../build_proj.sh

