#while [ 1 ];
#do /var/www/_scripts/player/lstreamer --configfile /home/user/vkuchuk/AltInst1.ini
#done;
killall lstreamer

/var/www/_scripts/player/lstreamer --configfile /home/user/vkuchuk/AltInst1.ini& 
/var/www/_scripts/player/lstreamer --configfile /home/user/vkuchuk/AltInst2.ini& 
