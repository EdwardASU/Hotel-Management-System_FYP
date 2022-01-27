<?php
include_once "config.php";
class Check {
    public $status;
    
}
$Name = htmlspecialchars($_POST['Name']);
$sql = "DELETE from type where Type_Name = '$Name'";
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