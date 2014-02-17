#!/bin/bash

START_REVISION=r183388 # first Denn's commit from 16.08.2012
END_REVISION=HEAD
BRANCH=https://develop.loewe.de/svn/tvsoft/
ALL_COMMITS_FILE=stat_all_13.txt
STAT_FILE=stat_ind_13.txt

PEOPLE=(
      "dgraphov"
      "syuzvinsky"
      "dlyubimov"
      "iguliaev"
      "yvpyasetskiy"
      "mkpolyakov"
      "ptaranov"
      "vkatunin"
      "ilevin"
      "vkotov"
      "otrenkin"
      "asalnikov"
      "aalanov"
      "gpanchishen"
      "agolovin"
      "akosteltsev"
      "vkuchuk"
      "weggenti"
      "dogance"
      "vogtch"
      "radikesa"
      "kutterol"
      "heinzeti"
      "fresento"
      "hossainri"
      "bednarzse"
      "luetjenje"
      "timmmo"
      "pechervo"
      "selivanoig"
      "andjelofi"
      )
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

bar=$(printf "%s\|" "${PEOPLE[@]}")
GREP_PATT=${bar:1}

GREP_PATT=${GREP_PATT%??}
echo $GREP_PATT
#echo ${GREP_PATT}
#svn log ${BRANCH} -r${START_REVISION}:${END_REVISION}| grep ^r | grep "${GREP_PATT}" | grep -v ") | [1-9] line" > $ALL_COMMITS_FILE 
svn log ${BRANCH} -r${START_REVISION}:${END_REVISION}| grep ^r | grep ") | [0-9][0-9] line" > $ALL_COMMITS_FILE 
echo "All" > $STAT_FILE
all_n=`cat $ALL_COMMITS_FILE | wc -l`
all=$(printf "%s %s" "All" "$all_n")
echo $all > $STAT_FILE
for p in ${PEOPLE[*]}
do 
    n=`cat $ALL_COMMITS_FILE | grep $p | wc -l`
    echo "n="$n
    res=$(printf "%s %s" "$p" "$n")
    echo $res >> $STAT_FILE
done
