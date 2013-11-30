<?php
include("../lib/inc.php");

/* Uses Yahoo finance API to return current oil price
 * ====================================================================== */

$url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22CLG14.NYM%22%29&env=store://datatables.org/alltableswithkeys&format=json";
$ret = getCurlData($url);

$array = json_decode($ret,True);

$q_date = $array['query']['results']['quote']['LastTradeDate'];
$q_price = $array['query']['results']['quote']['LastTradePriceOnly'];

$results_array = array(
   "date" => $q_date,
   "price" => $q_price,
);

print json_encode((array)$results_array);
?>