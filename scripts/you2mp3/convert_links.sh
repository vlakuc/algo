#!/bin/bash

for l in `cat links.txt`; do
	./youtube2mp3.sh $l
	./convert_mp4.sh
done
