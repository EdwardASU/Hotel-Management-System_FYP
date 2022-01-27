<?php
include_once "config.php";
class Check {
    public $status;

}
$Name = htmlspecialchars($_POST['Name']);
$Prefix = htmlspecialchars($_POST['Prefix']);

$sql = "INSERT into roles(Roles_Name, Roles_prefix, Number) VALUES('$Name','$Prefix', '0')";
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