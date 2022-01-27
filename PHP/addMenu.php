<?php
include_once "config.php";
class Check {
    public $status;
    public $ID;
}
$Name = htmlspecialchars($_POST['Name']);
$Price = htmlspecialchars($_POST['Price']);
$Desc = htmlspecialchars($_POST['Desc']);
$sql = "INSERT into menu(Menu_name, cost, Descs) VALUES('$Name', '$Price', '$Desc')";
$result = $conn->query($sql);
if(!$result) {
    $booking = new Check();
   $booking->status = "database";
       echo json_encode($booking);
   }
   else{
     $sql2 = "SELECT * from menu where Menu_name = '$Name' AND cost = '$Price'";
     $result2 = $conn->query($sql2);
     if($result2->num_rows > 0){
     $data = $result2->fetch_array(MYSQLI_ASSOC);
     $MID = $data['Menu_ID'];
     }
    $booking = new Check();
    $booking->status = "success";
    $booking->ID = "$MID";
       echo json_encode($booking);
      
   }
?>