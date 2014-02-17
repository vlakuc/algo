#!/bin/bash

ALL_COMMITS_FILE=$1
COMMITTERS_LIST=$2

BRANCH=https://develop.loewe.de/svn/tvsoft/
OUT_DIR=out

COMMITTERS=`cat $COMMITTERS_LIST`
for p in $COMMITTERS
do 
    mkdir -p $OUT_DIR/$p
    REV_FILE=$OUT_DIR/$p/revs.txt
    INFO_FILE=$OUT_DIR/$p/info.txt 
    cat $ALL_COMMITS_FILE | grep $p | cut -f1 -d'|' > $REV_FILE
    for r in `cat $REV_FILE` 
    do
       svn log -$r $BRANCH >> $INFO_FILE 
    done
done

