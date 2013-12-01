<?php
include("../lib/inc.php");

/* Return fueleconomy.gov data based on vehicle id
 * ====================================================================== */

if (isset($_GET['vid'])) {
   $vid = filter_var($_GET['vid'], FILTER_VALIDATE_INT);
   $url = "http://www.fueleconomy.gov/ws/rest/vehicle/" . $vid;
}

//given year, returns all makes for that year
//unless year = 0, then all 
if (isset($_GET['year'])) {
   $year = filter_var($_GET['year'], FILTER_VALIDATE_INT);
   if($year == 0){
      $url = "http://www.fueleconomy.gov/ws/rest/vehicle/menu/year";
   } else {
      $url = "http://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=" . $year;
   }
}

//given year and make, returns all models
if (isset($_GET['make']) && isset($year)) {
   $make = filter_var($_GET['make'], FILTER_SANITIZE_STRING);
   $url = "http://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=".$year."&make=".urlencode($make);
}

//given year, make, and model, returns options
if (isset($_GET['model']) && isset($make) && isset($year)) {
   $model = filter_var($_GET['model'], FILTER_SANITIZE_STRING);
   $base_url = "http://www.fueleconomy.gov/ws/rest/vehicle/menu/options?";
   
   $url = "year=".$year."&make=".urlencode($make)."&model=".urlencode($model);
   $url = $base_url.$url;

}

$ret = getCurlData($url);
print json_encode((array)simplexml_load_string($ret));
?>
