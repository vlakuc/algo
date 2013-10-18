#!/bin/bash
source /home/vkuchuk/proj/proj_env.sh
cd $COMPENV/../common/comp/i686-linux+stlinux-2.4/bin

GDB_BINARY=sh4-linux-gdb

./$GDB_BINARY -x /home/vkuchuk/proj/gdb_commands_local.txt


