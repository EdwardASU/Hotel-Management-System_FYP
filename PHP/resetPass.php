<?php
include_once "config.php";
class Check {
    public $status;
    public $ID;
}
$ID = htmlspecialchars($_POST['ID']);
$key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
$shfl = str_shuffle($key);
$pass = substr($shfl,0,6);
$passen = md5($pass);
$sql = "UPDATE staff SET password = '$passen' where Staff_ID = '$ID'";
$result = $conn->query($sql);
if(!$result) {
    $booking = new Check();
   $booking->status = "database";
       echo json_encode($booking);
   }
else{
    
    $booking = new Check();
    $booking->status = "success";
    $booking->ID = "$pass";
       echo json_encode($booking);
}
    
      
?>