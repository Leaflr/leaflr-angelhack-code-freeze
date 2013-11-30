<?php
include("../lib/inc.php");

/* Return fueleconomy.gov data based on vehicle id
 * ====================================================================== */
$vid = filter_var($_GET['vid'], FILTER_VALIDATE_INT);

$url = "http://www.fueleconomy.gov/ws/rest/vehicle/" . $vid;
$ret = getCurlData($url);

print json_encode((array)simplexml_load_string($ret));
?>