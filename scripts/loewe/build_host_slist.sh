#!/bin/bash

export PROJ_HOME=codebase2011_V2.3.X_CW40_VANILLA

#export PROJ_HOME=codebase2011_double_rec_V2.3.X_CW40


source /home/vkuchuk/proj/proj_env.sh

export COMPENV=$CODEBASE_PATH/loewe/buildtools/compenv/linux-hosttools


export ENABLE_AWOX_SERVER=0
export ENABLE_BROWSER=0
export ENABLE_HDR_TO_UPNP=0
export ENABLE_USB=0


TEST_DIR=$CODEBASE_PATH/loewe/common/biz/tests/test-env
#export LD_LIBRARY_PATH=/usr/lib
MODULES=(
    loewe/buildtools/projects/loewe/biz-test-env/
    #loewe/buildtools/projects/loewe/slisttest
              )

MAKE_COMMAND="make -f projectmakefile debug all"
MAKE_CLEAN_COMMAND="make -f projectmakefile clean"
for dest in ${MODULES[*]}
do 
    cd $CODEBASE_PATH/$dest 
    if [ "$1" == "clean"  ]; then
	$MAKE_CLEAN_COMMAND
    elif [ "$1" == "inc" ]; then
        echo "INC"
        cd $TEST_DIR
        make -f makefile install
    elif [ "$1" == "inc_clean" ]; then
        echo "INC clean"
        cd $TEST_DIR
        make -f makefile clean
    else
	eval $MAKE_COMMAND     
	ret_code=$?
	echo Result=$ret_code
	if [ $ret_code != 0 ]; then
		printf "Error : [%d]" $ret_code
		exit $ret_code
	fi
    fi
done


