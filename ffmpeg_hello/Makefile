
C_FLAGS=-I/home/vkuchuk/proj/ffmpeg
LD_FLAGS=-L/home/vkuchuk/proj/ffmpeg

main:
	gcc $(C_FLAGS) main.c -o player -lavutil -lavformat -lavcodec -lswscale -lz -lbz2 `sdl-config --cflags --libs`
