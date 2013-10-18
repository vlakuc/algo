#!/bin/bash
export PROJ_HOME=codebase2011_V2.1.X_CW16
source proj_env.sh
cd $COMPENV/../common/comp/i686-linux+stlinux-2.4/bin

GDB_BINARY=sh4-linux-gdb

#COMMANDS="target remote 192.168.2.124:12312"

#(echo $COMMANDS; cat) | ./$GDB_BINARY
#./$GDB_BINARY -x <(echo $COMMANDS)
./$GDB_BINARY -x /home/vkuchuk/proj/gdb_commands.txt


