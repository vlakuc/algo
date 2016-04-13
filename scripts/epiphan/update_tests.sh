DEV_IP=172.31.14.141

TEST_PATH=/home/vkuchuk/proj/epiphan_svn_trunk/epiphan/vga2cpu/ltib/vga2web/subsys/base/skell-v2c.1.0/opt/tests/presets

scp -r  $TEST_PATH/* root@$DEV_IP:/data/tests/presets
