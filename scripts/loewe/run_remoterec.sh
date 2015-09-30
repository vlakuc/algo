#!/bin/bash

export PROJ_HOME=codebase2011_remote_rec
#export PROJ_HOME=codebase2011_trunk
#TV_IP=172.31.14.143
TV_IP=$1
#TV_IP=172.16.14.202
#TV_IP=172.16.11.137


source /home/vkuchuk/proj/proj_env.sh

#cd $COMPENV_INSTALL_DIR/sl220+i686+linux-hosttools/bin
cd $COMPENV_INSTALL_DIR/hosttools+i686+linux-hosttools/bin


export LMQR2_UDPHOST=$TV_IP:12321
export LD_LIBRARY_PATH=../lib

#export BOOST_TESTS_TO_RUN=Sanity/TimersSanity/*Edit*
export BOOST_TESTS_TO_RUN=UnreworkedTests/*List*
#export BOOST_TESTS_TO_RUN=UnreworkedTests/*Delete*
export BOOST_TEST_SHOW_PROGRESS=yes
export BOOST_TEST_LOG_LEVEL=all

ulimit -c unlimited

RUN_CMD="./frame-app-runner -f ../lib/libapp-biz-proxy.so -f ../lib/libapp-console.so -f ../lib/libremoterec-app.so"
RUN_CORE="./frame-app-runner -f ../lib/libapp-biz-proxy.so -f ../lib/libapp-console.so -f ../lib/libapp-biz-test-env.so"

if [ "$1" == "gdb"  ]
then
    gdb --args $RUN_CMD 
elif [ "$1" == "core"  ]
then
    gdb --args $RUN_CMD core 
else
    rm ./core
    $RUN_CMD
fi


