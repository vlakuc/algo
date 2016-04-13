#!/bin/bash

while (( 1 ))
do
curl -u admin:'' 'http://172.31.14.141/admin/recorder1/get_params.cgi?rec_enabled'
curl -u admin:'' 'http://172.31.14.141/admin/recorder2/get_params.cgi?rec_enabled'
curl -u admin:'' 'http://172.31.14.141/admin/recorder1/set_params.cgi?rec_enabled=on'
sleep 1
curl -u admin:'' 'http://172.31.14.141/admin/recorder2/set_params.cgi?rec_enabled=on'
curl -u admin:'' 'http://172.31.14.141/admin/recorder1/get_params.cgi?rec_enabled'
curl -u admin:'' 'http://172.31.14.141/admin/recorder2/get_params.cgi?rec_enabled'

sleep 10

curl -u admin:'' http://172.31.14.141/admin/allinfo.cgi > log.txt
NUM=`grep "ffrecorder2 --logname ffrecorderm" log.txt | wc -l`
echo "NUM: "$NUM
[ $NUM -ne 2 ] && echo "Not 2" && exit 1

curl -u admin:'' 'http://172.31.14.141/admin/recorder1/set_params.cgi?rec_enabled=off'
curl -u admin:'' 'http://172.31.14.141/admin/recorder2/set_params.cgi?rec_enabled=off'
curl -u admin:'' 'http://172.31.14.141/admin/recorder1/get_params.cgi?rec_enabled'
curl -u admin:'' 'http://172.31.14.141/admin/recorder2/get_params.cgi?rec_enabled'

curl -u admin:'' http://172.31.14.141/admin/allinfo.cgi > log.txt
NUM=`grep "ffrecorder2 --logname ffrecorderm" log.txt | wc -l`
echo "NUM: "$NUM
[ $NUM -ne 0 ] && echo "Not 0" && exit 1
sleep 10
let COUNT++
echo "LOOP: " $COUNT
done

