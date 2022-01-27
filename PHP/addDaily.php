<?php
include_once "config.php";
class Check {
    public $status;
}
$SID = htmlspecialchars($_POST['ID']);
$Floor = htmlspecialchars($_POST['floor']);
$Task = htmlspecialchars($_POST['Task']);
$date = date("Y-m-d");
$sql = "INSERT into task (Services_ID, Staff_ID, Room_ID, Task_type, Date, status) VALUES ('0', '$SID' ,'$Floor', '$Task' , '$date', 'Daily')";
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