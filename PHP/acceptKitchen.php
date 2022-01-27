<?php
include_once "config.php";
class Check {
    public $status;
    
}
$ID = htmlspecialchars($_POST['ID']);
$SID = htmlspecialchars($_POST['SID']);
$sql = "UPDATE kitchen set Staff_ID = '$SID', status = 'Cooking' where Services_ID = '$ID'";
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
       $sql2 = "UPDATE room_services set Status = 'Cooking' where Services_ID = '$ID'";
        $result2 = $conn->query($sql2);
      
   }
?>