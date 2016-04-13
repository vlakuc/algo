#!/usr/bin/php
<?php
function res()
{
    return 2 == 3;
}


function checkOutput()
{
$str = "
ffprobe version 2.2.1 Copyright (c) 2007-2014 the FFmpeg developers
  built on Mar  2 2016 04:00:39 with gcc 5.3.0 (GCC)
  configuration: --enable-gpl --enable-nonfree --enable-shared --disable-static --prefix=/usr --libdir=/usr/lib64 --shlibdir=/usr/lib64 --disable-debug --enable-cross-compile --target-os=linux --arch=x86_64 --disable-programs --disable-doc --disable-everything --enable-ffmpeg --enable-ffprobe --enable-ffcopy --enable-muxer='avi,asf,asf_stream,flv,h263,h264,mjpeg,mpjpeg,jpeg,mp4,ffm,rtp,mp3,wmav2,mpegts,mpegts_rtp,mov,ismv,rtsp,sap,rawpacket,rawvideo,image2' --enable-demuxer='asf,asf_stream,avi,mov,flv,h263,mjpeg,mp4,ffm,rtsp,sdp,mpegts,rm,mjpeg,image2,mp3,wav,s16le,s16be,rawpacket,rawvideo' --enable-decoder='pcm_s16be,pcm_s16le,pcm_s16le_planar,pcm_s32be,pcm_s32le,pcm_s32le_planar,aac,mp3,pcm_alaw,pcm_mulaw,mjpeg,png,h264,rawvideo,mpeg4,msmpeg4v1,msmpeg4v2,msmpeg4v3,h264' --enable-encoder='h263,mjpeg,pcm_s16le,pcm_s16be,pcm_alaw,pcm_mulaw,rawvideo,png,audio_level,libx264,libmp3lame,libfaac,mpeg4,msmpeg4v2,msmpeg4v3,wmav2,libmfxhw64' --enable-parser='h263,h264,mjpeg,aac,mpegaudio' --enable-indev='alsa,v4l2' --enable-filter='scale,transpose,aformat,aresample' --enable-protocol='file,pipe,rtmp,rtp,udp,http,rtmpt' --enable-bsf=h264_mp4toannexb --extra-cflags=-I/home/epiphan/vga2cpu/ltib/rootfs.vga2cpu_x86_64/usr/include --extra-ldflags=-L/home/epiphan/vga2cpu/ltib/rootfs.vga2cpu_x86_64/usr/lib64 --enable-libfaac --enable-libx264 --enable-libmp3lame --enable-libmfxhw64
  libavutil      52. 66.100 / 52. 66.100
  libavcodec     55. 52.102 / 55. 52.102
  libavformat    55. 33.100 / 55. 33.100
  libavdevice    55. 10.100 / 55. 10.100
  libavfilter     4.  2.100 /  4.  2.100
  libswscale      2.  5.102 /  2.  5.102
  libswresample   0. 18.100 /  0. 18.100
  libpostproc    52.  3.100 / 52.  3.100
{
[rtsp @ 0x6282e0] method DESCRIBE failed: 401 Unauthorized
rtsp://172.31.14.145:1935/rtsp_server_auth/fargo.s01e01.mp4: Invalid data found when processing input
}";

#echo ($str);
$tmp = "hello\n workd";
var_dump(preg_split ('/$\R?^/m', $tmp));
#echo (trim(end(preg_split ('/$\R?^/m', $str))));

}

function startsWith($haystack, $needle)
{
     $length = strlen($needle);
     return (substr($haystack, 0, $length) === $needle);
}

function checkHtml()
{
    echo("<table style=" . '"margin-bottom: 2em;">');
    echo('<tr><td class="forms_tdtitle">Source URL</td>');
    echo('<td>"8554/out.ts"/></td>');

//   echo("</table>");

    $id = 'sdf#' . '2';
    echo $id;

//////////////
echo PHP_EOL;
echo(urlencode("abvвапро"));
echo PHP_EOL;
# echo(urldecode("abv%D0%B2%D0%B0%D0%BF%D1%80%D0%BE"));

echo (startsWith('RTSP34', 'RTSP'));




$check_link_html = '<span class="pseudo_href" id="id_check_rtsp" onclick="ocheckRtspSource(' . "'extgrabber'". ",'extgrabber_password'" .",'id_check_device_result'" .",'id_check_password_result'". '); return false;">check</span>';

echo $check_link_html;


//////////////////////////////////
print "Hello\n";

$last = exec('ls - 2>&1', $output, $res);  

print $res;
print_r($output);
//print "LAST: ".$last;

list($serial) = sscanf("SN/2350001", "SN/%d");
//print $serial;

$fname = "abc (5ff";
//sscanf($fname, "(%d).txt", $num);
//list($num) = sscanf($fname, "abc (%d).txt");

//print 'NAME: '.$sname."\n";

print "\n";

$pos = strrchr ( $fname, "(" );
$pon = strrchr ( $fname, ")" );

$dir = substr(strrchr($fname, "("), 1);

sscanf($dir, "%d)", $num);


//$name = "port141.preset".replace(/\\/g,'/').replace(/.*\//, '').split('.')[0];
//print $name

$s="ALC1150_Analog";
//print substr($s, strrpos($s,'.') > 0 ? strrpos($s,'.') + 1 : strlen($s));

$d = array('foo' => 'bar', 'baz' => 'long');
$r = array('sources' => [$d]);
//var_dump($r);
echo (json_encode($r));
$pattern = "/^D2P[0-9]+\..+/";
//$pattern = "/D2P/";
if (preg_match($pattern, "VD2P281122.hdmi-b")) {
    echo "\n" . "Found" . "\n";
} else {
    echo "\n" . "NOT Found" . "\n";
}

}

function str_remove_prefix($prefix, $str)
{
	if (substr($str, 0, strlen($prefix)) == $prefix)
		$str = substr($str, strlen($prefix));
	return $str;
}

function myIsSet()
{
  $codecNames = array(
	'h264'		=> 'H.264',
	'mpeg4'		=> 'MPEG-4',
	'mjpeg'		=> 'Motion JPEG',
	'flv'		=> 'FLV',
      	'aac'		=> 'AAC'
        );
  $value = 'h264';
  if(isset($codecNames[$value])) $value = $codecNames[$value];
  echo $value;
}



function checkArray() {

$ar = array();
$bar = array(1,2,3);
array_push($ar, $bar);
var_dump($ar);

$full_id = "$g[3]" . ":" . "$g[0]";

$str = "video5";
echo str_remove_prefix('video', $str) . "\n";

foreach(glob("/etc/*/*conf*") as $d) {
    echo "\n" . $d;
    }

foreach(scandir("/etc/") as $d) {
    echo "\n" . $d;
    }


}

myIsSet();

?>