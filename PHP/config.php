<?php
 $host = 'localhost';
 $dbpw = '';
 $db = 'hotel';
 $un = 'root';
 $conn = new mysqli($host,$un,$dbpw,$db);
 date_default_timezone_set('Asia/Kuala_Lumpur');
if($conn->connect_error) die("Fatal Error");
?>