#!/usr/bin/php
<?



//Header( "Content-type: application/json" );
//Header( "Cache-Control: no-cache, must-revalidate" );

// Constructs url from conponents returned by parse_url()
function unparse_url($componenets) { 
    $url =  isset($componenets['scheme']) ? $componenets['scheme'] . '://' : '';

    if (isset($componenets['user'])) {
        $url .= $componenets['user'];
        $url .= isset($componenets['pass']) ? ":".$componenets['pass']."@" : ':@';
    }
    
    $url .= isset($componenets['host']) ? $componenets['host'] : '';
    $url .= isset($componenets['port']) ? ":".$componenets['port'] : '';
    $url .= isset($componenets['path']) ? $componenets['path'] : '';
    $url .= isset($componenets['query']) ? "?".$componenets['query'] : '';
    $url .= isset($componenets['fragment']) ? "#".$componenets['fragment'] : '';
    return $url;
}

// Connects to RTSP server and retrives stream information
// If url contains credentials they are not replaced with provided arguments
function get_rtsp_source_status($url, $username = "", $password = "", $prefer_tcp_transport = "udp")
{
    $descriptorspec = array(
        0 => array("pipe", "r"),
        1 => array("pipe", "w"),
        2 => array("pipe", "w"));

    $url_components = parse_url($url);
    if (!isset($url_components['user']))
    {
        $url_components['user'] = $username;
        $url_components['pass'] = $password;
    }
    $url = escapeshellarg(unparse_url($url_components));
    $rtsp_flags = $prefer_tcp_transport == 'tcp' ? '-rtsp_flags prefer_tcp' : '';
//    $executable="/usr/bin/timeout -t3 /usr/bin/ffprobe ".$rtsp_flags." -print_format json -show_streams ".$url;

    $executable="/usr/bin/timeout -t15 /usr/bin/ffinfo " . $url;

    error_log("KUCHUK: " . $executable);

    $process = proc_open($executable, $descriptorspec, $pipes);

    
    $errors="";
    $output="";
    $return_value="";

    if (is_resource($process))
    {
        $output = stream_get_contents($pipes[1]);
        fclose($pipes[1]);
        $errors = stream_get_contents($pipes[2]);
        fclose($pipes[2]);
        $return_value=proc_close($process);
    }

    error_log("KUCHUK result: " . $return_value);
//    error_log($output);
    
    $result = array();

    if ($return_value == 0) {
        $result["status"] = "ok";
        $result["reason"] = "";
        $result["streams"] = json_decode($output, true)["streams"];
        error_log(print_r($result));
   //    $result = $output;
    }
    else {
        $result["status"] = "error";
        if ($return_value == 143) {
            $result["reason"] = "Connection timeout";
        } else {
            $err_msgs = array_slice(preg_split('/$\R?^/m', $errors), -2);
            $msg = strstr($err_msgs[0], 'Failed to resolve hostname');
            if (empty($msg)) {
                $msg = end(split(':', trim(end($err_msgs))));
            }
            $result["reason"] = $msg;
        }
        $result["streams"] = array();
    }
//    error_log(json_encode($result));
    return json_encode($result);
//    return $output;
}

// $url = isset($_REQUEST['rtsp_url']) ? $_REQUEST['rtsp_url'] : '';
// $username = isset($_REQUEST['user']) ? $_REQUEST['user'] : '';
// $password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
// $transport = isset($_REQUEST['rtsp_transport']) ? $_REQUEST['rtsp_transport'] : '';
$url = 'tsp://fff:fff@172.31.14.140:8554/out.ts';
echo $url;
// echo get_rtsp_source_status($url, $username, $password, $transport);

?>