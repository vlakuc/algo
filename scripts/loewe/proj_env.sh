#!/bin/bash

SRC_HOME=/home/vkuchuk/proj/$PROJ_HOME
BUILDSDIR=/home/vkuchuk/export/$PROJ_HOME
#BUILDSDIR=/home/vkuchuk/$SRC_HOME

export CODEBASE_PATH=$SRC_HOME


export COMPENV=$CODEBASE_PATH/loewe/buildtools/compenv/stlinux-2.4
#eexport COMPENV=$CODEBASE_PATH/loewe/buildtools/compenv/linux-hosttools

export COMPENV_INSTALL_DIR=$BUILDSDIR

export COMPENV_OS_DETECTED=linux

export COMPENV_PROJECT_LOCATION=$CODEBASE_PATH/loewe/chassis/sl200/project

export COMPENV_PROJECT_VARIANT=sl220 

#export COMPENV_STCONNECT_IP=192.168.169.83
#export COMPENV_STCONNECT_IP=STMCLT1484-A
#export COMPENV_STCONNECT_IP=STMCLT1710-A

#export COMPENV_STCONNECT_IP=STMCLT1624-A

#export COMPENV_STCONNECT_IP=STMCLT1624-A
export COMPENV_STCONNECT_IP=STMCLT1769-A
#export COMPENV_STCONNECT_IP=STMCLT1541-A
#export COMPENV_STCONNECT_IP=STMCLT1413-A
#export COMPENV_STCONNECT_IP=STMCLT1642-A

#export COMPENV_NFSSERVER=192.168.2.184
#export COMPENV_NFSSERVER=172.30.177.182
#export COMPENV_NFSSERVER=172.16.14.47
#export COMPENV_NFSSERVER=172.30.176.35
export COMPENV_NFSSERVER=172.31.14.160

TOOLCHAIN_PATH=/home/vkuchuk/toolchain/


############ Eclipse #############
PROJECT_DIR=$CODEBASE_PATH
CMPENV_DEF_LOGMODE=both
PATH=$PATH:$PROJECT_DIR/loewe/buildtools/compenv/common/comp/i686­linux+stlinux­2.4/bin
COMPENV_INSTALL_INCLUDE_DIR=$COMPENV_INSTALL_DIR/sl200+stlinux­2.4/loewe/include


