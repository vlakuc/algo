#!/bin/bash
CMD="picocom --baud 115200 /dev/ttyUSB$1 --send-cmd \"sb -vv\" --receive-cmd \"rb --vv\""
echo $CMD
script -f -c "$CMD" pico.log 


