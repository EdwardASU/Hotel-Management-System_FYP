<?php
include_once "config.php";
class Check {
    public $status;
    
}
$RID = $_POST['ID'];
$Date = $_POST['BDate'];
if($Date == "today"){
    $Dates = date("Y-m-d");
    $sql = "UPDATE room_record set current_status = 'Cancel' where Room_ID = '$RID' AND booking_date = '$Dates'";
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
}   
else{
$sql = "UPDATE room_record set current_status = 'Cancel' where Room_ID = '$RID' AND booking_date = '$Date'";
$result = $conn->query($sql);
if(!$result) {
 $login = new Check();
 $login->status = "database";
    echo json_encode($login);

}
$login = new Check();
$login->status = "success";
echo json_encode($login);
}

?>