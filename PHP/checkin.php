<?php
include_once "config.php";
class Check {
    public $status;
    
}
$RID = htmlspecialchars($_POST['ID']);
$Customer = htmlspecialchars($_POST['Customer']);
$Period = htmlspecialchars($_POST['Period']);
$Gender = htmlspecialchars($_POST['Gender']);
$Booking = htmlspecialchars($_POST['Booking']);
$date = date("Y-m-d");
if(($Booking) == '1'){
$sql = "UPDATE room_record SET current_status = 'checked-in', Customer_Name = '$Customer', duration = '$Period', Gender = '$Gender', check_in_date = '$date' where Room_ID = '$RID' AND booking_date = CURDATE()";
}
else{
$sql = "INSERT into room_record(Room_ID, Customer_Name, Gender, check_in_date, duration, current_status) VALUES('$RID', '$Customer', '$Gender', '$date', $Period, 'checked-in')";
}

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
       $sql2 = "UPDATE room SET Room_status = 'checked-in' where Room_ID = '$RID'";
       $result2 = $conn->query($sql2);
   }
?>