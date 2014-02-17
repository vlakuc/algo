#!/bin/bash
SRC_DIR1=$HOME/proj/codebase2011_V2.3.X_CW40
SRC_DIR2=$HOME/proj/codebase2011_V2.3.X_CW40_VANILLA
SRC_DIR3=$HOME/proj/codebase2011_V2.3.X_V2.3.X_stab_CW44
SRC_DIR4=$HOME/proj/SL1_develop_stabilization1

PROJECT_SCOPE=(
    #$SRC_DIR1/loewe/common
    #$SRC_DIR2/loewe/common
    $SRC_DIR3/loewe/common
    #$SRC_DIR4/loewe/common
              )



for dest in ${PROJECT_SCOPE[*]}
do 
    echo "Tagging $dest"
    cd $dest 
    if [ "$1" == "clean"  ]; then
        rm -f ./cscope.files
        rm -f ./TAGS
        rm -f ./tags
        rm -f ./cscope.out
    fi
    
    find $dest -name '*.c' -o -name '*.h' -o -name '*.hpp' -o -name '*.cpp' -o -name '*.cxx' -o -name '*.hxx' -o -name '*.java' -o -name 'Makefile' -o -name 'makefile' -o -name '*.impl'>> ./cscope.files
    cat cscope.files | xargs ctags -a --extra=+f 
    cat cscope.files | xargs ctags -a -e --extra=+f 
done

notify-send "Tags ready"

