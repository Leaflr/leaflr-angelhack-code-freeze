<?php
include("../lib/inc.php");

/* Store information from survey in MySQL database
 * ====================================================================== */

$mysql = mysql();

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

//insert vehicle into mysql table
//return carid
$q = "
INSERT INTO vehicle (vehicle_id,  year, 
                     make, model, fuel_type,
                     mpg_city, mpg_hwy, co2)
  VALUES($car_table['car_vid'], 
         $car_table['car_year'],
	 $car_table['car_make'],
	 $car_table['car_model'],
	 $car_table['car_fuel_type'],
	 $car_table['car_mpg_city'],
	 $car_table['car_mpg_hwy'],
	 $car_table['car_co2'])
";

$carid = $mysql->insert($q);

$trip_table = array(
   "trip_distance" => $_POST['tripdistance'],
   "trip_hwy_per" => $_POST['hwyper'],
);

//insert trip in mysql table
//return tripid
$q = "
INSERT INTO trip (distance, hwy_per) 
  VALUES($trip_table[trip_distance],
	 $trip_table[trip_hwy_per])
";

$tripid = $myql->insert($q);

$survey_table = array(
   "survey_freq" => $_POST['freq'],
   "survey_zipcode" => $_POST['zip'],
   "survey_vehicle_nonspec" => $_POST['vehicle_nonspec'],
   "survey_created_at" => date('Y-m-d h:i:s A')
);

$q = "
INSERT INTO survey (vehicle_id, trip_id, freq,
       	    	    zipcode, vehicle_nonspec, created_at)
   VALUES($carid, $tripid,
          $survey_table['survey_freq'],
	  $survey_table['survey_zipcode'],
	  $survey_table['survey_vehicle_nonspec'],
	  now())

";

$mysql->insert($q);
   

?>