#!/bin/bash
#M       https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/feature/double_rec_V2.3.X_CW40/loewe/common/biz/tests/test-env/include/tests/double-recording-test.h
#M       https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/feature/double_rec_V2.3.X_CW40/loewe/common/biz/tests/test-env/src/tests/double-recording-test.cpp
#Changes in r385554
#Changes in r383249
#Changes in r382678
#Changes in r382579
#Changes in r382402
#Changes in r382253
#Changes in r382232
#Changes in r382224
#Changes in r382159
#Changes in r382029
#Changes in r381997
#Changes in r381878
SOURCE=/home/vkuchuk/proj/codebase2011_double_rec_V2.3.X_CW40
DEST=/home/vkuchuk/proj/codebase2011_V2.3.X_CW40_VANILLA
#svn merge  -c381878 https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/feature/double_rec_V2.3.X_CW40
cd $DEST 

svn merge  -c381878 \
           -c381997 \
           -c382029 \
           -c382159 \
           -c382224 \
           -c382232 \
           -c382253 \
           -c382402 \
           -c382579 \
           -c382678 \
           -c383249 \
           -c385554 \
            https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/feature/double_rec_V2.3.X_CW40

cp $SOURCE/loewe/common/biz/tests/test-env/include/tests/double-recording-test.h $DEST/loewe/common/biz/tests/test-env/include/tests/
cp $SOURCE/loewe/common/biz/tests/test-env/src/tests/double-recording-test.cpp $DEST/loewe/common/biz/tests/test-env/src/tests/
