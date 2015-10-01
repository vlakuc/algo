#!/bin/bash
#export PROJ_HOME=codebase2011_application_domain_cw03


#TV_IP=172.31.14.143
TV_IP=$1

#export PROJ_HOME=codebase2011_CRID
source /home/vkuchuk/proj/proj_env.sh

export COMPENV=$CODEBASE_PATH/loewe/buildtools/compenv/linux-hosttools
export COMPENV_PROJECT_LOCATION=$CODEBASE_PATH/loewe/buildtools/projects/tara/uiapp/host
export COMPENV_PROJECT_VARIANT=hosttools
export CODEBASE_DIR=$CODEBASE_PATH
#cd $CODEBASE_PATH/loewe/buildtools/projects/tara/uiapp/bizmon/

LMQR2_UDPHOST=$TV_IP:12321 LD_LIBRARY_PATH=$LD_LIBRARY_PATH:./nokia/qt/libraries/desktop/4.8.0/:$COMPENV_INSTALL_DIR/hosttools+i686+linux-hosttools/lib/ ./BizMon

