#!/bin/bash
START_REVISION=r183388 # first Denn's commit from 16.08.2012
END_REVISION=HEAD
BRANCH=https://develop.loewe.de/svn/tvsoft/
ALL_COMMITS_FILE=stat_all_14.txt

svn log ${BRANCH} -r${START_REVISION}:${END_REVISION}| grep ^r | grep ") | [0-9][0-9] line" > $ALL_COMMITS_FILE 

