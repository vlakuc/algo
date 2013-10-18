#!/bin/bash

CODE_BASE_PATH=/home/vkuchuk/proj/
CODE_BASE_PREF="codebase2011_"
CODE_BASE_DIR="${CODE_BASE_PREF}194261"
CODE_BASE=$CODE_BASE_PATH/$CODE_BASE_DIR

REVISION_DIR=/home/vkuchuk/proj/revisions

REVISION_LIST=(
    #    196650
    #    196646
        196354
        196169
    #    195500
    #    195199
    #    194844
    #    194695
    #    194634
              )

rm -rf $REVISION_DIR
mkdir -p $REVISION_DIR


for rev in ${REVISION_LIST[*]}
do 
    cd $REVISION_DIR
    cp -r $CODE_BASE ./
    mv ./$CODE_BASE_DIR ${CODE_BASE_PREF}${rev}
    cd ${CODE_BASE_PREF}${rev}
    svn switch -r ${rev} https://develop.loewe.de/svn/tvsoft/codebase2011/trunk
    
done



