# get commiters from input stat file
cat $1 | cut -f2 -d'|' | sort -u 
