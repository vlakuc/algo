#!/bin/bash

source proj_env.sh


cd $CODEBASE_PATH/loewe/chassis/sl200/project

sed 's/ENABLE_SECURE_STBSP=1/ENABLE_SECURE_STBSP=0/g' sl220.cfg > tmpf;
mv tmpf sl220.cfg




