CC=g++

bin_srcs=dump_stream_info.cpp
bin_srcs_ex=dump_stream_info_exopt.cpp

bin_target=dump_si
bin_target_ex=dump_si_ex

FFMPEG_PATH = /home/vkuchuk/proj/epiphan_svn_trunk/epiphan/vga2cpu/ltib/vga2web/src/ffmpeg/ffmpeg-2.2.1/
OBJSTREAM_PATH = /home/vkuchuk/proj/epiphan_svn_trunk/epiphan/vga2cpu/ltib/vga2web/src/libobjstream/libobjstream/

INCLUDE_PATH += -I$(FFMPEG_PATH)
INCLUDE_PATH += -I$(OBJSTREAM_PATH)/include

CXXFLAGS += -std=c++11 -ggdb -O0
LDFLAGS +=  -L$(FFMPEG_PATH)/libavformat -L$(FFMPEG_PATH)/libavcodec -L$(FFMPEG_PATH)/libavdevice -L$(FFMPEG_PATH)/libavfilter -L$(FFMPEG_PATH)/libavutil -L$(FFMPEG_PATH)/libswresample -L$(FFMPEG_PATH)/libswscale -L$(OBJSTREAM_PATH)/lib
CMDUTILS_OBJ = $(FFMPEG_PATH)/cmdutils.o

LDFLAGS +=   -lavformat -lswresample -lswscale -lavcodec -lavutil -lavdevice -lavfilter -lobjstream -lboost_program_options
#LDFLAGS +=   -lavformat -lavcodec -lavutil  -lz -lm -lpthread

all: $(bin_target) $(bin_target_ex)

$(bin_target):  $(bin_srcs)
	$(CC) $(CXXFLAGS) $(INCLUDE_PATH) $(bin_srcs) $(LDFLAGS) $(CMDUTILS_OBJ)  -o $(bin_target)

$(bin_target_ex): $(bin_srcs_ex)
	$(CC) $(CXXFLAGS) $(INCLUDE_PATH) $(bin_srcs_ex) $(LDFLAGS) -o $(bin_target_ex)

clean:
	rm -rf $(bin_target)

show:
	echo $(.VARIABLES)
