#!/usr/bin/expect

#spawn telnet 192.168.2.100
spawn ssh user@172.31.14.148

expect "user@172.31.14.148's password:"

send "1234567\r"


expect "$"

#send "kill -KILL `ps -ae | grep runLuxPlayer.sh | cut -f1 -d' '`\r"

#send "kill -KILL `ps -ae | grep lstreamer | cut -f1 -d' '`\r"

#expect "$"

send "cd /home/kx/lstreamer32/bin ; ./stopPlayer.sh\r"

expect "$"

#send "./runLuxPlayer.sh\&\r"
#spawn /home/kx/lstreamer32/bin/runLuxPlayer.sh

#send "sudo -b -k ./runLuxPlayer.sh\r"

#send "./runLuxPlayer.sh\r"

#expect "password for user:"

#send "1234567\r"

expect "$"

#close