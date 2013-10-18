#!/bin/bash

#export PROJ_HOME=codebase2011_double_rec_V2.3.X_CW40
export PROJ_HOME=codebase2011_V2.3.X_CW40_VANILLA
#TV_IP=172.31.14.171
TV_IP=172.31.14.138
#TV_IP=172.31.14.152
#TV_IP=172.31.14.169

source /home/vkuchuk/proj/proj_env.sh

cd $COMPENV_INSTALL_DIR/sl220+i686+linux-hosttools/bin


export LMQR2_UDPHOST=$TV_IP:12321
export LD_LIBRARY_PATH=../lib

ulimit -c unlimited

RUN_CMD="./frame-app-runner -f ../lib/libapp-biz-proxy.so -f ../lib/libapp-console.so -f ../lib/libapp-biz-test-env.so"
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

#./frame-app-runner -f ../lib/libapp-biz-proxy.so
#gdb --args  ./frame-app-runner -f ../lib/libapp-console.so

