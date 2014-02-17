#!/bin/bash

COMMITTERS_LIST=$1
STAT_FILE=$2

OUT_DIR=out

COMMITTERS=`cat $COMMITTERS_LIST`
for p in $COMMITTERS
do 
    INFO_FILE=$OUT_DIR/$p/info.txt 
    #n=`egrep -o 'S?[SHT]?[LF][12]?-[0-9]+' $INFO_FILE | sort -u | wc -l`
    n=`egrep -o 'S?[SHT]?[LF][12]?-[0-9]+' $INFO_FILE | sort -u | wc -l`
    s=`grep Header: $INFO_FILE | cut -f2 -d':' | sort -u | awk '{print}' ORS='] ['`

    res=$(printf "%s: %s: %s" "$p" "$n" "$s")
    #echo $res >> $STAT_FILE
    echo $res
done

