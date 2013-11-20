#!/bin/bash
CURRENT=`uname -r`

STREAM_PATH=/home/vkuchuk/Downloads/dtg/Streams
#STREAM_NAME=Standby_7.00.ts
#STREAM_NAME=UseOfEIT_7.00.ts
#STREAM_NAME=Timeoffset_7.00.ts
#STREAM_NAME=EITpf_7.00.ts
STREAM_NAME=TypesOfLinks_7.00.ts
#STREAM_NAME=CRID_1_7.00.ts


killall lstreamer

#sudo rmmod DtaNw
#sudo rmmod Dta
#sudo rmmod Dtu
#sudo insmod /lib/modules/$CURRENT/kernel/drivers/misc/Dta.ko
#sudo insmod /lib/modules/$CURRENT/kernel/drivers/misc/DtaNw.ko
#sudo insmod /lib/modules/$CURRENT/kernel/drivers/usb/DekTec/Dtu.ko
#while [ 1 ] ; do
#./lstreamer32 --configfile ./streamer.ini
./lstreamer --filename=$STREAM_PATH/$STREAM_NAME --frequency=490000000
#cd ~/proj/LOEWE_SL22/tv_infrastructure/trunk/lstreamer
#make -f Makefile.32
#~/proj/LOEWE_SL22/tv_infrastructure/trunk/lstreamer/bin/lstreamer --configfile ~/proj/streamer.ini 
#~/proj/LOEWE_SL22/tv_infrastructure/lstreamer/bin/lstreamer --configfile ./streamer.ini 
#done

