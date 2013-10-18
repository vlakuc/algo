#!/bin/bash
CURRENT=`uname -r`
#sudo rmmod DtaNw
#sudo rmmod Dta
#sudo rmmod Dtu
#sudo insmod /lib/modules/$CURRENT/kernel/drivers/misc/Dta.ko
#sudo insmod /lib/modules/$CURRENT/kernel/drivers/usb/DekTec/Dtu.ko
#sudo insmod /lib/modules/$CURRENT/kernel/drivers/misc/Dtu.ko
#sudo insmod /lib/modules/$CURRENT/kernel/drivers/misc/DtaNw.ko
#sudo insmod /lib/modules/$CURRENT/kernel/drivers/usb/DekTec/Dtu.ko
while [ 1 ] ; do
./lstreamer32 --configfile ./streamer.ini
#cd ~/proj/LOEWE_SL22/tv_infrastructure/trunk/lstreamer
#make -f Makefile.32
#~/proj/LOEWE_SL22/tv_infrastructure/trunk/lstreamer/bin/lstreamer --configfile ~/proj/streamer.ini 
#~/proj/LOEWE_SL22/tv_infrastructure/lstreamer/bin/lstreamer --configfile ./streamer.ini 
done

