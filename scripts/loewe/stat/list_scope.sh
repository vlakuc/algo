#!/bin/bash

COMMITTERS_LIST=$1
STAT_FILE=$2

OUT_DIR=out

COMMITTERS=`cat $COMMITTERS_LIST`
for p in $COMMITTERS
do 
    INFO_FILE=$OUT_DIR/$p/info.txt 
    REVS_FILE=$OUT_DIR/$p/revs.txt 
    r=`egrep -o '[0-9]+' $REVS_FILE | wc -l`
    #echo `egrep -o 'S?[SHT]?[LF][12]?-[0-9]+' $INFO_FILE | sort -u` 
    n=`egrep -o 'S?[SHT]?[LlF][12]?-[0-9]+' $INFO_FILE | sort -u | wc -l`
    #s=`grep Header: $INFO_FILE | cut -f2 -d':' | sort -u | awk '{print}' ORS='] ['`

    #res=$(printf "%s: %s: %s: %s" "$p" "$r" "$n" "$s")
    res=$(printf "%s: %s: %s" "$p" "$r" "$n")
    #echo $res >> $STAT_FILE
    echo $res
done

