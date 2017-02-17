#include <fcntl.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <linux/videodev2.h>
#include <sys/mman.h>
#include <SDL/SDL.h>
#include <SDL/SDL_image.h>
#include <SDL/SDL_video.h>
#include <time.h>

int WIDTH = 0;
int HEIGHT = 0;
struct v4l2_fract FRAME_INTERVAL = { 0 };

struct CaptureMode {
    int width;
    int height;
    struct v4l2_fract fr_intr;
};

#define NUM_MODES 256

struct CaptureMode modes[NUM_MODES] = { 0 };

char* PATH = "";
int NUM_FRAMES = 0;
//int PIXEL_FORMAT = V4L2_PIX_FMT_MJPEG;
int PIXEL_FORMAT = V4L2_PIX_FMT_YUYV;

struct v4l2_buffer bufferinfo;
void* buffer_start = NULL;

void vk_check_pixformat(const int fd)
{
    struct v4l2_fmtdesc fmtdesc;
    memset(&fmtdesc,0,sizeof(fmtdesc));
    fmtdesc.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    while (ioctl(fd,VIDIOC_ENUM_FMT,&fmtdesc) == 0)
    {    
        if (fmtdesc.pixelformat == PIXEL_FORMAT)
        {
            printf("%s\n", fmtdesc.description);
            return;
        }

        fmtdesc.index++;
    }
    fprintf(stderr, "Device doesn't support PIXEL_FORMAT\n");
    exit(EXIT_FAILURE);
}

void vk_get_capture_modes(const int fd)
{
    struct v4l2_frmsizeenum frmsize = { 0 };
    struct v4l2_frmivalenum frmival = { 0 };
    
    frmsize.pixel_format = PIXEL_FORMAT;
    frmsize.index = 0;
    int counter = 0;

    printf("Getting streaming modes...\n");
    while (ioctl(fd, VIDIOC_ENUM_FRAMESIZES, &frmsize) >= 0)
    {
        if (frmsize.type != V4L2_FRMSIZE_TYPE_DISCRETE)
        {
            frmsize.index++;
            continue;
        }
        frmival.index = 0;
        frmival.pixel_format = PIXEL_FORMAT;
        frmival.width = frmsize.discrete.width;
        frmival.height = frmsize.discrete.height;
        printf("Check %dx%d\n", frmival.width, frmival.height);

        while (ioctl(fd, VIDIOC_ENUM_FRAMEINTERVALS, &frmival) >= 0)
        {
            if (counter == NUM_MODES)
                return;
            struct CaptureMode m = { 0 };
            m.width = frmsize.discrete.width;
            m.height = frmsize.discrete.height;
            m.fr_intr = frmival.discrete;
            modes[counter] = m;
            printf("Adding mode %dx%d@%f\n", m.width, m.height, (double)m.fr_intr.denominator / m.fr_intr.numerator );
        
            frmival.index++;
            counter++;
        }
        frmsize.index++;
    }
}

void vk_close(const int fd)
{
    int type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    if(ioctl(fd, VIDIOC_STREAMOFF, &type) < 0){
        perror("VIDIOC_STREAMOFF");
        exit(EXIT_FAILURE);
    }

    if (munmap(buffer_start, bufferinfo.length ) != 0)
    {
         perror("mumap");
         exit(EXIT_FAILURE);
    }

    if(close(fd) != 0) {
        perror("close");
        exit(EXIT_FAILURE);
    }
}

int vk_open(const char* path)
{
    int fd;
    if ((fd = open(path, O_RDWR)) < 0)
    {
        perror("open");
        exit(EXIT_FAILURE);
    }

    struct v4l2_capability cap;
    if(ioctl(fd, VIDIOC_QUERYCAP, &cap) < 0){
        perror("VIDIOC_QUERYCAP");
        exit(EXIT_FAILURE);
    }
    if (!(cap.capabilities & V4L2_CAP_VIDEO_CAPTURE))
    {
        fprintf(stderr, "The device does not handle single-planar video capture.\n");
        exit(EXIT_FAILURE);
    }
    if (!(cap.capabilities & V4L2_CAP_STREAMING))
    {
        fprintf(stderr, "The device does not handle frame streaming.\n");
        exit(EXIT_FAILURE);
    }
    /* if (!(cap.capabilities & V4L2_CAP_TIMEPERFRAME)) */
    /* { */
    /*     fprintf(stderr, "The device does not handle frame rate settingg.\n"); */
    /*     exit(EXIT_FAILURE); */
    /* } */
    return fd;
}

void vk_setup(const int fd)
{
    int w = WIDTH, h = HEIGHT;
    struct v4l2_fract fintr = FRAME_INTERVAL;

    struct v4l2_format format = { 0 };
    format.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    format.fmt.pix.pixelformat = PIXEL_FORMAT;
    format.fmt.pix.width = w;
    format.fmt.pix.height = h;


    if(ioctl(fd, VIDIOC_S_FMT, &format) < 0){
        perror("VIDIOC_S_FMT");
        exit(EXIT_FAILURE);
    }

    struct v4l2_streamparm streamparm = { 0 };
    streamparm.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    streamparm.parm.capture.timeperframe = fintr;

    if(ioctl(fd, VIDIOC_S_PARM, &streamparm) < 0){
        perror("VIDIOC_S_PARAM");
        exit(EXIT_FAILURE);
    }

    struct v4l2_requestbuffers bufrequest;
    bufrequest.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    bufrequest.memory = V4L2_MEMORY_MMAP;
    bufrequest.count = 1;
 
    if(ioctl(fd, VIDIOC_REQBUFS, &bufrequest) < 0){
        perror("VIDIOC_REQBUFS");
        exit(EXIT_FAILURE);
    }

    memset(&bufferinfo, 0, sizeof(bufferinfo));
 
    bufferinfo.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    bufferinfo.memory = V4L2_MEMORY_MMAP;
    bufferinfo.index = 0;
 
    if(ioctl(fd, VIDIOC_QUERYBUF, &bufferinfo) < 0){
        perror("VIDIOC_QUERYBUF");
        exit(EXIT_FAILURE);
    }

    buffer_start = mmap(
        NULL,
        bufferinfo.length,
        PROT_READ | PROT_WRITE,
        MAP_SHARED,
        fd,
        bufferinfo.m.offset
        );
 
    if (buffer_start == MAP_FAILED)
    {
         perror("mmap");
         exit(EXIT_FAILURE);
    }
 
    memset(buffer_start, 0, bufferinfo.length);

    //struct v4l2_buffer bufferinfo;
    memset(&bufferinfo, 0, sizeof(bufferinfo));
     
    bufferinfo.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    bufferinfo.memory = V4L2_MEMORY_MMAP;
    bufferinfo.index = 0; /* Queueing buffer index 0. */
     
    // Activate streaming
    int type = bufferinfo.type;
    if(ioctl(fd, VIDIOC_STREAMON, &type) < 0){
        perror("VIDIOC_STREAMON");
        exit(EXIT_FAILURE);
    }
}

int vk_reopen(const int fd)
{
    vk_close(fd);
    return vk_open(PATH);
}

void vk_read(const int fd)
{
    // Put the buffer in the incoming queue.
    if(ioctl(fd, VIDIOC_QBUF, &bufferinfo) < 0){
        perror("VIDIOC_QBUF");
        exit(1);
    }
     
    // The buffer's waiting in the outgoing queue.
    if(ioctl(fd, VIDIOC_DQBUF, &bufferinfo) < 0){
        perror("VIDIOC_DQBUF");
        exit(1);
    }
}

void vk_playback(const int fd, const int num_frames)
{
    SDL_RWops* buffer_stream;
    SDL_Surface* frame;
    SDL_Rect position = {.x = 0, .y = 0};
    struct v4l2_fract fintr = FRAME_INTERVAL;

    int i = 0;

    printf("Playing %dx%d@%f\n", WIDTH, HEIGHT, (double)fintr.denominator / fintr.numerator);

    for (i; i < num_frames; i++)
    {
        // Get the screen's surface.
        SDL_Surface* screen = SDL_SetVideoMode(
             WIDTH,
             HEIGHT,
             32, SDL_HWSURFACE
        );
    
        vk_read(fd);
         
        // Create a stream based on our buffer.
        buffer_stream = SDL_RWFromMem(buffer_start, bufferinfo.length);
          
        // Create a surface using the data coming out of the above stream.
        frame = IMG_Load_RW(buffer_stream, 0);
          
        // Blit the surface and flip the screen.
        SDL_BlitSurface(frame, NULL, screen, &position);
        SDL_Flip(screen);
    }
    // Free everything, and unload SDL & Co.
    SDL_FreeSurface(frame);
    SDL_RWclose(buffer_stream);
}

void vk_init()
{
    int fd = vk_open(PATH);
    vk_check_pixformat(fd);
    vk_get_capture_modes(fd);
    close(fd);
}

int main(int argc, void** argv)
{
    if (argc < 3) {
        printf("Usage: %s v4l_path num_frames\n", argv[0]);
        printf("Example: %s /dev/video0 30\n", argv[0]);
        return EXIT_FAILURE;
    }
    PATH = argv[1];
    NUM_FRAMES = atoi(argv[2]);
    SDL_Init(SDL_INIT_VIDEO);
    IMG_Init(IMG_INIT_JPG);
    vk_init();

    int i = 0;

    for (i; i < NUM_MODES && modes[i].width > 0; i++)
    {
        WIDTH = modes[i].width;
        HEIGHT = modes[i].height;
        FRAME_INTERVAL = modes[i].fr_intr;
        clock_t begin = clock();

        int fd = vk_open(PATH);
        vk_setup(fd);

        clock_t end = clock();
        double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
        printf("Setup time %f\n", time_spent);
        vk_playback(fd, NUM_FRAMES);
        vk_close(fd);
    }

    IMG_Quit();
    SDL_Quit();

    return EXIT_SUCCESS;
}
