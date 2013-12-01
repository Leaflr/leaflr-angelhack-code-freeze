<?php
include("../lib/inc.php");

/* Return fueleconomy.gov data based on vehicle id
 * ====================================================================== */
$vid = filter_var($_GET['vid'], FILTER_VALIDATE_INT);
$year = filter_var($_GET['year'], FILTER_VALIDATE_INT);
$make = $_GET['make'];
$model = $_GET['model'];

if (isset($vid)) {
   $url = "http://www.fueleconomy.gov/ws/rest/vehicle/" . $vid;
}

//given year, returns all makes for that year
//unless year = 0, then all 
if (isset($year)) {
   if($year == 0){
      $url = "http://www.fueleconomy.gov/ws/rest/vehicle/menu/year";
   } else {
      $url = "http://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=" . $year;
   }
}

//given year and make, returns all models
if (isset($make) && isset($year)) {
   $url = "http://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=".$year."&make=".$make;
}

//given year, make, and model, returns options
if (isset($model) && isset($make) && isset($year)) {
   $url = "http://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=".$year."&make=".$make."&model=".$model;

}

$ret = getCurlData($url);

print json_encode((array)simplexml_load_string($ret));
?>