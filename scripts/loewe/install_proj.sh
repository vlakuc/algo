#!/bin/bash

source /home/vkuchuk/proj/proj_env.sh

cd $CODEBASE_PATH/loewe/buildtools/compenv/
ln -fs $TOOLCHAIN_PATH archives 

#./disable_security.sh


make install

#    Add following lines to /etc/exports

#echo "/home/export 192.168.169.*(insecure,insecure_locks,anonuid=0,anongid=0,no_root_squash,no_subtree_check,rw,async,nohide)" >> /etc/exports

#echo "/home/export *.loewe-komp.de(insecure,insecure_locks,anonuid=0,anongid=0,no_root_squash,no_subtree_check,rw,async,nohide)" >> /etc/exports
#sudo usermod -a -G dialout vkuchuk
