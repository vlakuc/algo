#!/bin/bash


source /home/vkuchuk/proj/proj_env.sh

CODE_DIRS=(
    codebase2011_after_crid
    codebase2011_before_crid
          )

for dest in ${CODE_DIRS[*]}
do 
    export PROJ_HOME=$dest
    #./install_proj.sh
    ./build_proj.sh
    ./build_img.sh
done


