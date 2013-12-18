#while [ 1 ];
#do /var/www/_scripts/player/lstreamer --configfile /home/user/vkuchuk/AltInst1.ini
#done;
killall lstreamer

LSTREAMER=/var/www/_scripts/player/lstreamer
CONFIG_PATH=/home/user/vkuchuk/algo/scripts/loewe/lstreamer
#CONFIG_FILE=AltInst1.ini
#CONFIG_FILE=EITpf.ini
CONFIG_FILE=Si26a.ini

#/var/www/_scripts/player/lstreamer --configfile /home/user/vkuchuk/AltInst1.ini& 
#/var/www/_scripts/player/lstreamer --configfile /home/user/vkuchuk/AltInst2.ini& 
$LSTREAMER --configfile $CONFIG_PATH/$CONFIG_FILE

