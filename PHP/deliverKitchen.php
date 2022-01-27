<?php
include_once "config.php";
class Check {
    public $status;
    
}
$ID = htmlspecialchars($_POST['ID']);
$RID = htmlspecialchars($_POST['RID']);
$date = date("Y-m-d");
$sql = "UPDATE kitchen set status = 'Complete' where Services_ID = '$ID'";
$result = $conn->query($sql);

if(!$result) {
    $booking = new Check();
   $booking->status = "database";
       echo json_encode($booking);
   }
   else{
    $sql3 = "INSERT into task (Services_ID, Room_ID, Task_type, Date, status) VALUES ($ID, '$RID', 'Food Delivery', '$date', 'Pending')";
    $result3 = $conn->query($sql3);
    if(!$result3) {
        $booking = new Check();
       $booking->status = "database";
           echo json_encode($booking);
       }
       else{
    $booking = new Check();
    $booking->status = "success";
       echo json_encode($booking);
       $sql2 = "UPDATE room_services set Status = 'Deliver' where Services_ID = '$ID'";
        $result2 = $conn->query($sql2);
       }
   }
?>