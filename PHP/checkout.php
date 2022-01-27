<?php
include_once "config.php";
class Check {
    public $status;
    
}
$ReID = $_POST['ID'];
$Total = $_POST['Total'];
$Date = date("Y-m-d");
$RID = $_POST['RID'];
$sql = "UPDATE room_record set current_status = 'Finish', check_out_date = '$Date', Final_payment = '$Total' where Record_ID = '$ReID'";
$result = $conn->query($sql);

if(!$result) {
    $login = new Check();
    $login->status = "database";
       echo json_encode($login);
    
}
$sql2 = "UPDATE room SET Room_status = 'Available' where Room_ID = '$RID'";
       $result2 = $conn->query($sql2);
       $login = new Check();
$login->status = "success";
echo json_encode($login);




?>