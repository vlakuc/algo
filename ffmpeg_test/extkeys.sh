#!/bin/bash

ffmpeg -ss 0 -i $1 -t 13 -q:v 2 -vf select="eq(pict_type\,PICT_TYPE_I)" -vsync 0 frame%03d.jpg
