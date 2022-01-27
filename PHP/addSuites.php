<?php
include_once "config.php";
class Check {
    public $status;

}
$Name = htmlspecialchars($_POST['Name']);
$Cost = htmlspecialchars($_POST['Cost']);
$Desc = htmlspecialchars($_POST['Desc']);
$sql = "INSERT into type(Type_Name, Cost, Descs) VALUES('$Name','$Cost', '$Desc')";
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