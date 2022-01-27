<?php
include_once "config.php";
class Check {
    public $status;
    
}
$ID = htmlspecialchars($_POST['ID']);
$SID = htmlspecialchars($_POST['SID']);
$Status = htmlspecialchars($_POST['Status']);
$date = date("Y-m-d");
if($Status == "Daily"){
    $sql = "UPDATE task set status = 'Daily_Complete' where Date = '$date' AND Staff_ID = '$SID' AND Services_ID = '$ID'";
    $result = $conn->query($sql);
}
if($Status == 'Accepted'){
    $sql = "UPDATE task set status = 'Complete' where Services_ID = '$ID'";
    $result = $conn->query($sql);
    $sql2 = "UPDATE room_services set Status = 'Complete' where Services_ID = '$ID'";
    $result2 = $conn->query($sql2);
}


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