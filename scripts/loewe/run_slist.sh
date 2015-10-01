#!/bin/bash

#export PROJ_HOME=codebase2011_V2.3.X_CW40_VANILLA
#export PROJ_HOME=codebase2011_trunk
export PROJ_HOME=codebase2011_V2.4.X_CW14
#TV_IP=172.31.14.143
TV_IP=$1
#TV_IP=172.16.14.202
#TV_IP=172.16.11.137


source /home/vkuchuk/proj/proj_env.sh

#cd $COMPENV_INSTALL_DIR/sl220+i686+linux-hosttools/bin
cd $COMPENV_INSTALL_DIR/linuxhost+host+V2.4.X_CW14/bin


export LMQR2_UDPHOST=$TV_IP:12321
export LD_LIBRARY_PATH=../lib

#export BOOST_TESTS_TO_RUN=Sanity/TimersSanity/*Edit*
#export BOOST_TESTS_TO_RUN=Sanity/TimersSanity/*
#export BOOST_TESTS_TO_RUN=UnreworkedTests/*List*
#export BOOST_TESTS_TO_RUN=UnreworkedTests/*TestEnvServiceList*
#export BOOST_TESTS_TO_RUN=UnreworkedTests/*TimersForceExclusive*
#export BOOST_TESTS_TO_RUN=UnreworkedTests/*TimersOddTime*
#export BOOST_TESTS_TO_RUN=UnreworkedTests/*DeleteSerialRecordingTest*
export BOOST_TESTS_TO_RUN=UnreworkedTests/*DeletePeriodicTimersTest*
#export BOOST_TESTS_TO_RUN=UnreworkedTests/*14222*
#export BOOST_TESTS_TO_RUN=UnreworkedTests/*Delete*
#export BOOST_TESTS_TO_RUN=FreeviewTests/*Crid*

export BOOST_TEST_SHOW_PROGRESS=yes
export BOOST_TEST_LOG_LEVEL=all

ulimit -c unlimited

#RUN_CMD="./frame-app-runner -f ../lib/libapp-biz-proxy.so -f ../lib/libapp-console.so -f ../lib/libapp-biz-test-env.so"
RUN_CMD="./frame-app-runner -f ../lib/libapp-biz-proxy.so -f ../lib/libapp-biz-test-env.so"
RUN_CORE="./frame-app-runner -f ../lib/libapp-biz-proxy.so -f ../lib/libapp-console.so -f ../lib/libapp-biz-test-env.so"

if [ "$2" == "gdb"  ]
then
    gdb --args $RUN_CMD 
elif [ "$2" == "core"  ]
then
    gdb --args $RUN_CMD core 
else
    rm ./core
    echo $RUN_CMD
    $RUN_CMD 2>&1 | tee log.txt
fi


