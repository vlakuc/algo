DEV_IP=172.31.14.141

TEST_PATH=/home/vkuchuk/proj/epiphan_svn_trunk/epiphan/vga2cpu/ltib/firmwares
TEST_ARCH=`ls $TEST_PATH | grep tests | grep Pearl | sort -r | head -n1`

scp  $TEST_PATH/$TEST_ARCH root@$DEV_IP:/data
