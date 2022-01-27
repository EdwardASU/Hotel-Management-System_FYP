<?php
include_once "config.php";
class Check {
    public $status;
    public $Female;
    public $profits;
    public $Male;
    public $total;
}
$RID = htmlspecialchars($_POST['ID']);
$sql = "SELECT COUNT(*) as count , sum(Final_payment) as profits from Room_record where Room_ID = '$RID' AND MONTH(check_in_date) = MONTH(CURRENT_DATE()) AND YEAR(check_in_date) = YEAR(CURRENT_DATE()) AND Gender = 'Male' AND current_status = 'Finish'";
$result = $conn->query($sql);
if(!$result) die('database');
if($result->num_rows > 0){
    $total = $result->fetch_assoc();
    $count = $total['count'];
    $Malep = $total['profits'];
}
$sql2 = "SELECT COUNT(*) as count, sum(Final_payment) as profits from Room_record where Room_ID = '$RID' AND MONTH(check_in_date) = MONTH(CURRENT_DATE()) AND YEAR(check_in_date) = YEAR(CURRENT_DATE()) AND Gender = 'Female' AND current_status = 'Finish'";
$result2 = $conn->query($sql2);
if(!$result2) die('database');
if($result2->num_rows > 0){
    $total2 = $result2->fetch_assoc();
    $count2 = $total2['count'];
    $Femalep = $total2['profits'];
}
    $booking = new Check();
    $booking->status = "success";
    $booking->Male = $count;
    $booking->Female = $count2;
    $booking->profits = $Malep + $Femalep;
    $booking->total = $count + $count2;
    echo json_encode($booking);
?>