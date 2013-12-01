<?php
include("../lib/inc.php");

/* Store information from survey in MySQL database
 * ====================================================================== */

$car_table = array(
    "car_year" => $_POST['caryear'],
    "car_make" => $_POST['carmake'],
    "car_model" => $_POST['carmodel'],
    "car_vid" => $_POST['carvid'],
    "car_fuel_type" => $_POST['carfueltype'],
    "car_mpg_city" => $_POST['carmpgcity'],
    "car_mpg_hwy" => $_POST['carmpghwy'],
    "car_co2" => $_POST['carco2'],
);

//insert into mysql table
//return unique_id as carid

$trip_table = array(
   "trip_distance" => $_POST['tripdistance'],
   "trip_road_type" => $_POST['roadtype'],
);

//insert into mysql table
//return unique_id as tripid

$survey_table = array(
   "survey_carid" => $carid,
   "survey_tripid" => $tripid,
   "survey_freq" => $_POST['freq'],
   "survey_zipcode" => $_POST['zip'],
   "survey_vehicle_nospec" => $_POST['vehicle_nonspec'],
   "survey_created_at" => date('Y-m-d h:i:s A'),
);
   

?>