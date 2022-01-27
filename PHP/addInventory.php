<?php
include_once "config.php";
class Check {
    public $status;
    
}
$Name = htmlspecialchars($_POST['Name']);
$Stock = htmlspecialchars($_POST['Stock']);
$sql = "INSERT into Inventory(inv_Name, Stock_num) VALUES('$Name', '$Stock')";
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