<? // mysqli class
class mysql {
	public $connection = NULL;
	
	// Constructor function
	function __construct($errors=false, $debug=false) {
		
		$this->connection = new mysqli (
      'localhost',
      'root',
      '0cool',
      'leaflr'
		);
		$this->connection->set_charset('utf-8');
		if($this->connection->connect_errno) {
			print $this->connection->connect_error;
			$errMsg  = "ERROR (".$this->connection->connect_errno.") ";
			$errMsg .= $this->connection->connect_error;
		}
	} // end __construct

	function getRows($query) {
		$type = 'object';
		preg_match('/from (?P<table>.*)/i', $query, $table);
		$tableName = $table['table'];
		$retArray = array();
		$rowCount	= 0;
		if($result = $this->connection->query($query)) {
			switch($type) {
				case 'assoc':		// Return associative array -------------------
					while($assoc = $result->fetch_assoc()) {
						$retArray[] = $assoc;
					}
					break;				// End return associative array --------------
				case 'object':	// Return Object
					while($obj = $result->fetch_object()) {
						$retArray[] = $obj;
					}
					break;				// End Return Objecta ------------------------
			}
			$result->close();
			return $retArray;
		} else {
			// Result failed! Report Error!!
			$errMsg  = "ERROR (".$this->connection->errno.") ";
			$errMsg .= $this->connection->error;
			return;

		}
	} // End getRows

	function insert($query) {
		if($result = $this->connection->query($query)) {
			return $this->connection->insert_id;
		} else {
			$errMsg  = "ERROR (".$this->connection->errno.") ";
			$errMsg .= $this->connection->error;
      print $errMsg;
			return;
		}
  }
	function update($query) {
		preg_match('/SET (?P<table>.*).* values|\(/i', $query, $table);
		$tableName = $table['table'];
		if($result = $this->connection->query($query)) {
			return $this->connection->affected_rows;
		} else {
			$errMsg  = "ERROR (".$this->connection->errno.") ";
			$errMsg .= $this->connection->error;
			return;
		}
  }
  function sanitizeArray($array) {
    $retArray = array();
    foreach($array as $key => $val) {
      $val = mysqli_real_escape_string($this->connection, $val);
    //  if($key == 'id') {
    //    if(!$var = filter_var($val, FILTER_VALIDATE_INT)) { return "FAIL"; }
    //  }
      $retArray[$key] = $val;
    }
    return $retArray;
  }
}
