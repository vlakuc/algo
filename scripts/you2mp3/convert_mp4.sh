#/bin/bash

SUFF="mp4"
suff="wav"

for f in *.mp4; do
	wav_file="${f%$SUFF}$suff"
	mp3_file="${wav_file%$suff}mp3"
	ffmpeg -i "$f" "$wav_file" 
	lame "$wav_file" "$mp3_file"
	rm "$f" "$wav_file" 
done
