<?php
include_once "config.php";
class Check {
    public $status;
    
}
$RID = htmlspecialchars($_POST['ID']);
$Customer = htmlspecialchars($_POST['Customer']);
$Period = htmlspecialchars($_POST['Period']);
$Gender = htmlspecialchars($_POST['Gender']);
$date = htmlspecialchars($_POST['date']);
$sql = "INSERT into room_record(Room_ID, Customer_Name, Gender, booking_date, duration, current_status) VALUES('$RID', '$Customer', '$Gender', '$date', $Period, 'Booking')";
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