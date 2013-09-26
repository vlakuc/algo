#!/bin/bash

incr=50
start=1

rm -f links.txt

while [ 1 ]; do
	wget --no-check-certificate "https://gdata.youtube.com/feeds/api/users/fondrabakademii/uploads?max-results=50&start-index=$start&prettyprint=true&fields=entry(title,media:group(media:player(@url)))" -O out.xml
	valid=0
	for l in `cat out.xml | grep https | cut -f1 -d'&' | cut -f2 -d"'"`; do
		echo $l >> links.txt
		let valid=1
	done
	let start=start+incr
	echo $start 
	if [ $valid -eq 0 ]; then
		break
	fi
done
