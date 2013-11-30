<?

function Dumper($msg) {
  print "<pre>";
  var_dump($msg);
  print "</pre>";
}

function getCurlData($url) {
  $ch = curl_init();
  
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_URL, $url);

  return curl_exec($ch);
}
