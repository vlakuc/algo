#!/bin/bash

export PROJ_HOME=codebase2011_host
#export PROJ_HOME=codebase2011_V2.0.X_CW13

source /home/vkuchuk/proj/proj_env.sh

export COMPENV=$CODEBASE_PATH/loewe/buildtools/compenv/linux-hosttools

export ENABLE_AWOX_SERVER=0
export ENABLE_BROWSER=0
export ENABLE_HDR_TO_UPNP=0
export ENABLE_USB=0
#export LD_LIBRARY_PATH=/usr/lib
MODULES=(
    #loewe/common/loreg
    #loewe/common/concierge/lapi/interface
    #loewe/common/concierge/lapi/app
#  loewe/buildtools/project
# loewe/common/sidec
# loewe/common/csplice/osal
# loewe/common/csplice/debug
# loewe/common/sidec/test
# loewe/common/csplice/osal
# loewe/common/csplice/debug
# loewe/common/csplice/lore
# loewe/common/splice/lfc
# loewe/common/splice/libloewevalues
# loewe/common/splice/libloewetools
# loewe/common/csplice/lemory
# loewe/common/csplice/lmq
# loewe/common/csplice/lmq/plugins/lmqr2tcp
# loewe/common/lots
# loewe/common/lostar/v2
#loewe/common/timely/api
#loewe/common/tisto
loewe/common/lostar/v2/test/alpha/
# loewe/common/fsal2
# loewe/common/loshell
# loewe/common/frame

#   loewe/common/port
#   loewe/common/syscfgservice
#   loewe/common/timely
#   loewe/common/pucman
#   oss/lgpl/libcsoap/libcsoap-1.1.0
#   oss/mit/libxml/2.7.8
#   loewe/common/ws/soap/common
#   loewe/common/ws/soap/client
#   loewe/common/ma/reggie
#   loewe/common/md/common/helper	
#   loewe/common/ssu/ssuupdate
#   loewe/common/updtservice
#    loewe/common/rcm/rcm
#   loewe/common/ma/vamp
#   loewe/common/ma/common
#   loewe/common/ma/domain/tv
#   loewe/common/ma/quern
#  loewe/common/loreg
#   loewe/common/chassisintf
#   loewe/common/tv/supportednetwork
#   loewe/common/kpi
#   loewe/common/md/servicelist
#   loewe/common/tv/stationscan
#   loewe/common/tv/tuner
#   loewe/common/tv/tvservice
#   loewe/common/tv/tvanytime
#   loewe/common/tv/hdr
#   loewe/common/tv/sound
#   loewe/common/tv/ttx
#   loewe/common/tv/testpic
#   loewe/common/tv/tvserviceevent
#   loewe/common/tv/video
#   loewe/common/tv/soundprojector
#   loewe/common/tv/hotelmode
#   loewe/common/tv/mpctrl
#   loewe/common/tv/cec
#   loewe/common/tv/servicemode
#   loewe/common/tv/colortemperature
#   loewe/common/tv/lightmodule
#   loewe/common/tv/storemode
#   loewe/common/tv/servicemode_ext
#    loewe/common/graphics/imgdecode
#    loewe/common/graphics/imgdecode/io/mdc_input
#   loewe/common/graphics/imgdecode/plugins/png
#   loewe/common/graphics/loewelibjpeg
#   loewe/common/graphics/ljpeg
#  loewe/common/graphics/imgdecode/plugins/jpg
#  loewe/chassis/sl200/secure-stbsp-sl2-m25/mali/
#    loewe/common/graphics/gfx_layer/gfx_com
#   loewe/common/graphics/dfb_renderclient
#    loewe/common/graphics/photoviewer
#   loewe/common/stash
#   loewe/common/tisto
#   loewe/common/tv/tuneservice
#   loewe/common/csplice/xcvt
#   loewe/common/tv/ci
#   loewe/common/md/favourites/garage
#   loewe/common/md/favourites/garage/rpc
#   loewe/common/masman
#   loewe/common/table
#   loewe/common/tvstand
#   loewe/common/browser/lobster/common
#   loewe/common/browser/lobster/client
#   loewe/common/browser/browserbizconnclient
# #  !loewe/chassis/sl200/stlinux-2.4/tools/launchd
# #  !loewe/common/browser/lobster/starter
#   loewe/common/csplice/jobworker
#   loewe/common/netcfg/wlanconfig
#   loewe/common/netcfg
#   loewe/common/loreg
#   loewe/common/loreg/component
#   loewe/common/md/vtuner/barley

#   loewe/common/graphics/gfx_layer
#   loewe/common/browser/browserdvbconnclient

#   loewe/common/ma/domain/vamp
#   loewe/common/loft
#   oss/mpl/taglib/1.7.0
#   loewe/common/md/file/granary
# #  ! com/awox/upnp/r39675
# #  ! loewe/common/md/awox-upnp/cooperative
# #  ! loewe/common/md/awox-upnp/oat
#   loewe/common/ma/mountebank
#   loewe/dvb/projects/sl200/hdr
#   oss/mit/libxml/2.7.8
#   loewe/dvb/projects/sl200/hdr/hdrinfo
#   loewe/dvb/projects/sl200/common
#   loewe/common/keyboard
#   loewe/common/eventtrove
#   loewe/common/tv/mme
#   loewe/common/tv/ci/impl/heimdall
#   loewe/common/md/playlists/plastron
#   loewe/dvb/projects/sl200/startup
#   loewe/common/tv/epgnightupdate
#   loewe/common/nightupdate
#   loewe/common/ws/dial
#   loewe/common/biz
#   loewe/chassis/sl200/sysstart/sipc 
#   loewe/common/loslink # ???
#   loewe/common/tvstand
#  loewe/common/uiapp/gui
# # com/opera/sdk-12.10-ST-3.4.0
# loewe/common/uiapp/factoryloop
# loewe/common/graphics/loewestagecraft/client_library
#  loewe/common/uiapp

# loewe/common/csplice/lmq/tools/r2tcpserver
#loewe/chassis/sl200/startup/biz

              )
MAKE_COMMAND="make debug install"
#MAKE_COMMAND="make -f projectmakefile"
for dest in ${MODULES[*]}
do 
    cd $CODEBASE_PATH/$dest 
    if [ "$1" == "clean"  ]
    then
	make clean
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


