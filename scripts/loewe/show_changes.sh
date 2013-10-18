#!/bin/bash                                                                                                                                                                                                  
#BRANCH_TO_CHECK=https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/domain/application_domain_cw03
#BRANCH_TO_CHECK=https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V1.11.X_CW07/loewe/chassis/sl200/project/sl2x0_base.cfg
#BRANCH_TO_CHECK=https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.1.X_CW16
BRANCH_TO_CHECK=https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/feature/double_rec_V2.3.X_CW40

#source /home/vkuchuk/proj/proj_env.sh                                                                                                                                                                       

cd /home/vkuchuk/proj/


for r in `svn log --stop-on-copy $BRANCH_TO_CHECK | grep -e "^r[[:digit:]]* |" | cut -d' ' -f1`
do
    echo "Changes in $r"
    svn diff -c$r $BRANCH_TO_CHECK --summarize
done
