#!/usr/bin/expect


spawn telnet 172.31.14.151

expect "login:"

send "root\r"

expect "#"

send "gdbserver localhost:12312 --attach `ps | grep biz | cut -f8 -d' ' | head -n 1`\r"

interact
