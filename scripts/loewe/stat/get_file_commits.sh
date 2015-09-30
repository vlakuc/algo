#!/bin/bash
#START_REVISION=r183388 # first Denn's commit from 16.08.2012
START_REVISION=117538
END_REVISION=$1 
BRANCH=https://develop.loewe.de/svn/tvsoft/
ALL_COMMITS_FILE=changes.txt

#svn log ${BRANCH} -r${START_REVISION}:${END_REVISION}| grep ^r | grep ") | [0-9][0-9] line" > $ALL_COMMITS_FILE 
#CMD="svn log ${BRANCH} -r${START_REVISION}:r${END_REVISION} | grep lines | cut -f1 -d' ' | sed 's/r/-c/'>"

#REVS=`svn log -l100 ${BRANCH} | grep vkuchuk | grep lines | cut -f1 -d' ' | sed 's/r/-c/'`
while (( START_REVISION < END_REVISION ))
do

    #exit 1
    let left=END_REVISION-$2
    #echo from $left to $END_REVISION
    REVS=`svn log -r$left:r${END_REVISION} ${BRANCH} | grep lines | cut -f1 -d' ' | sed 's/r/-c/'`
    for r in $REVS
    do
        #echo $r
        fn=`svn diff $r --summarize ${BRANCH} | grep $3 | cut -f8 -d' '`
        if [ "$fn" ]
        then
            echo $fn
            svn log $r $fn
            svn diff $r $fn
        fi
    done
    let END_REVISION=left-1
    #echo end $END_REVISION
done
exit 0

# echo "Start" > out.txt

# while (( START_REVISION > END_REVISION ))
# do
#     echo $START_REVISION #>> out.txt
#     validRev=`svn log -c$START_REVISION ${BRANCH} | grep lines`
#     if [ "$validRev" ]
#     then
#         fn=`svn diff -c$START_REVISION --summarize ${BRANCH} | grep $1`
#         if [ "$fn" ]
#         then
#             echo $fn
#             svn diff -c$START_REVISION ${BRANCH}
#         else
#             echo not match
#         fi
#     else
#         echo not valid
#     fi
#     let START_REVISION--
# done
