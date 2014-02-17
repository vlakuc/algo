#!/bin/bash
#log and test path

#variables for start WeBiz
TV_IP="172.31.14.152"
#export LMQR2_UDPHOST=$1:12321

export LMQR2_UDPHOST=$TV_IP:12321
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/home/vkuchuk/export/codebase2011_application_domain_cw03/hosttools+i686+linux-hosttools/lib
   
export DISPLAY=:0.0
#TEST_FILE="webbiz_epg.html"

TEST_FILE="test.html"

cd $1
./generator.py > $TEST_FILE
#variable for stop player when test execution is finshed

##test_identifier
#player_log=/var/www/player_logs/$2.log
#test_log=/var/www/tests_logs/$2.log
#test_script=/var/www/tests/$2.html
#player_setting=/var/www/player_settings/$2.ini
#
#
##remove old logs
#rm $player_log
#rm $test_log
##create new empty files for logs
#cat /dev/null >$player_log
#cat /dev/null >$test_log
#
#
##start player	
##to start streaming in loop for case if test execution is longer than stream 
##player output is redirect to log	
##save cycle pid to kill it when test is finished
#while [ 1 ]
# do /var/www/_scripts/player/lstreamer --configfile $player_setting >> $player_log 2>&1 
# done & 
#player1=$!
#
##start process of time monitoring, if test is not finished in 120 sec it will be killed
##save cycle pid to kill it if test is finished faster 120 sec
#currnt_time=$(date +%s)
#((stop_time=$currnt_time+120))
#while [ 1 ]
# do
# currnt_time=$(date +%s)
#   if (($currnt_time<$stop_time))
#    then
#     sleep 2s
#    else
#     killall WeBiz
#   fi
# done &
#time_cycle=$!
#
##start test execution 
/home/vkuchuk/bizmon/WeBiz $TEST_FILE 2>&1
#/home/vkuchuk/bizmon/WeBiz $1 2>&1

#stop all processes started during test
#kill $time_cycle
#kill $player1
#killall "lstreamer"
