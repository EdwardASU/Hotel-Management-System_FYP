<?php
include_once "config.php";
class Check {
    public $status;

}
$MID = htmlspecialchars($_POST['ID']);
$Name = htmlspecialchars($_POST['Name']);
$Price = htmlspecialchars($_POST['Price']);
$Desc = htmlspecialchars($_POST['Desc']);
$sql = "UPDATE menu SET Menu_name = '$Name', cost = '$Price', Descs = '$Desc' where Menu_ID = '$MID'";
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