
CFLAGS = -g -I/home/vkuchuk/proj/ffmpeg/libavcodec -I/home/vkuchuk/proj/ffmpeg/ -I/home/vkuchuk/proj/ffmpeg/libavformat

LDFLAGS =  -L/home/vkuchuk/proj/ffmpeg/libavcodec
LDFLAGS += -L//home/vkuchuk/proj/ffmpeg/libavformat
LDFLAGS += -L/home/vkuchuk/proj/ffmpeg/libavutil
LDFLAGS += -L/home/vkuchuk/proj/ffmpeg/libswresample
LDFLAGS += -L/home/vkuchuk/proj/ffmpeg/libswscale

LIBS =  -static -lavformat -lavutil  -lavcodec
#LDFLAGS += -lavformat -lavcodec -lavutil
LDFLAGS += -lavformat -lavcodec  -lswscale -lavutil  -lz -lm -lpthread

all: muxing options scaling_video

muxing: muxing.c
	gcc muxing.c -o muxing $(CFLAGS) $(LDFLAGS) -lswresample -lswscale

options: options.c
	gcc options.c -o options $(CFLAGS) $(LDFLAGS)


scaling_video: scaling_video.c
	gcc $^ -o $@ $(CFLAGS) $(LDFLAGS)

clean:
	rm muxing options scaling_video