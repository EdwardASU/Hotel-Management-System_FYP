<?php
include_once "config.php";
class Check {
    public $status;
}
$Name = htmlspecialchars($_POST['Name']);
$Cost = htmlspecialchars($_POST['Cost']);
$Desc = htmlspecialchars($_POST['Desc']);
$sql = "UPDATE type SET Cost = '$Cost', Descs = '$Desc' where Type_Name = '$Name'";
$result = $conn->query($sql);
$sql2 = "UPDATE type SET Type_Name = '$Name' where Cost = '$Cost' AND Descs = '$Desc'";
$result2 = $conn->query($sql2);
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