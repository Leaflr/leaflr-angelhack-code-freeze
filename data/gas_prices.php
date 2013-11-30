<?
include("../lib/inc.php");

/* myGasFeed.com API Key
 * ===================== */
$api_key  = 'reappeiu8s';
$api_key  = 'rfej9napna';
$lat      = '38.5121';
$lng      = '-121.8333';
$rad      = '1';


//By lat / Lng
$url = "http://devapi.mygasfeed.com/stations/radius/".$lat."/".$lng."/".$rad."/mid/Distance/".$api_key.".json?callback=?";
print $url;

$gas_stations = json_decode("[".getCurlData($url)."]", true);

print_r($gas_stations);



