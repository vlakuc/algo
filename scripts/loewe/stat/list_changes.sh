#!/bin/bash

ALL_COMMITS_FILE=$1
COMMITTERS_LIST=$2

BRANCH=https://develop.loewe.de/svn/tvsoft/
OUT_DIR=out_changes

COMMITTERS=`cat $COMMITTERS_LIST`
for p in $COMMITTERS
do 
    mkdir -p $OUT_DIR/$p
    REV_FILE=$OUT_DIR/$p/revs.txt
    cat $ALL_COMMITS_FILE | grep ^r |  grep "$p " | grep lines | cut -f1 -d " "| cut -f2 -d"r" > $REV_FILE
    for r in `cat $REV_FILE` 
    do
       echo $r 
       INFO_FILE=$OUT_DIR/$p/$r
       s=`svn log -v -c$r $BRANCH | grep "(from "`
       if [ ! -z "$s" -a "$s" != " " ]; then
          echo "$s is branch"
	  continue
       fi
       svn diff --summarize -c$r $BRANCH >> $INFO_FILE 
    done
done

