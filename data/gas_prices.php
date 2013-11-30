<?php
include("../lib/inc.php");

/* Unused for now. Need better API to return gas prices based on zipcode.
 *  Built in for future reference
 * ====================================================================== */
$zipcode = filter_var($_GET['zipcode'], FILTER_VALIDATE_INT);

$url = "http://www.fueleconomy.gov/ws/rest/fuelprices";
$ret = getCurlData($url);

print json_encode((array)simplexml_load_string($ret));
?>



