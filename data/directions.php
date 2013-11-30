<?
include('../lib/inc.php');

$sensor = 'true';
$origin = filter_var($_GET['origin'], FILTER_SANITIZE_STRING);
$dest   = filter_var($_GET['dest'], FILTER_SANITIZE_STRING);
$mode   = 'bicycling';

$base_url = "http://maps.googleapis.com/maps/api/directions/json?origin=".$origin."&destination=".$dest."&mode=".$mode."&sensor=".$sensor;

print getCurlData($base_url);

