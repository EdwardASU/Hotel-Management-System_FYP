<?php
include_once "config.php";
class Check {
    public $status;
    
}
$MID = htmlspecialchars($_POST['ID']);
$sql = "DELETE from menu where Menu_ID = '$MID'";
$result = $conn->query($sql);
if(!$result) {
    $booking = new Check();
   $booking->status = "database";
       echo json_encode($booking);
   }
   else{
    $booking = new Check();
    $booking->status = "success";
       echo json_encode($booking);
      
   }
?>