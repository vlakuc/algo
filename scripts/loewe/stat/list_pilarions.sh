#!/bin/bash

#START_REVISION=r183388 # first Denn's commit from 16.08.2012
#END_REVISION=HEAD
#BRANCH=https://develop.loewe.de/svn/tvsoft/
ALL_COMMITS_FILE=$1
COMMITTERS_LIST=$2
STAT_FILE=stat_ind_14.txt

#PEOPLE=(
#      "dgraphov"
#      "syuzvinsky"
#      "dlyubimov"
#      "iguliaev"
#      "yvpyasetskiy"
#      "mkpolyakov"
#      "ptaranov"
#      "vkatunin"
#      "ilevin"
#      "vkotov"
#      "otrenkin"
#      "asalnikov"
#      "aalanov"
#      "gpanchishen"
#      "agolovin"
#      "akosteltsev"
#      "vkuchuk"
#      "weggenti"
#      "dogance"
#      "vogtch"
#      "radikesa"
#      "kutterol"
#      "heinzeti"
#      "fresento"
#      "hossainri"
#      "bednarzse"
#      "luetjenje"
#      "timmmo"
#      "pechervo"
#      "selivanoig"
#      "andjelofi"
#      )
#for p in ${PEOPLE[*]}
#do 
#GREP_PATT+="$p"
#done
#SAVE_IFS=$IFS
#IFS="|"
#FOOJOIN="${PEOPLE[*]}"
#IFS=$SAVE_IFS
#echo $FOOJOIN
#GREP_PATT=$FOOJOIN

#bar=$(printf "%s\|" "${PEOPLE[@]}")
#GREP_PATT=${bar:1}


COMMITTERS=`cat $COMMITTERS_LIST`
echo "All" > $STAT_FILE
all_n=`cat $ALL_COMMITS_FILE | wc -l`
all=$(printf "%s %s" "All" "$all_n")
echo $all > $STAT_FILE
for p in $COMMITTERS
do 
    n=`cat $ALL_COMMITS_FILE | grep $p`
    echo "$n\n"
    #res=$(printf "%s %s" "$p" "$n")
    #echo $res >> $STAT_FILE
done
