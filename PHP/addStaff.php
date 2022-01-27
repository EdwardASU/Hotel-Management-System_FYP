<?php
include_once "config.php";
class Check {
    public $status;
    public $Pass;
    public $ID;
    public $Number;
}
$Name = htmlspecialchars($_POST['Name']);
$Position = htmlspecialchars($_POST['Position']);
$key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
$shfl = str_shuffle($key);
$pass = substr($shfl,0,6);
$passen = md5($pass);
$sql0 = "SELECT * from roles where Roles_Name = '$Position'";
$result0 = $conn->query($sql0);
     if($result0->num_rows > 0){
     $data = $result0->fetch_array(MYSQLI_ASSOC);
     $Number = $data['Number']+1;
     $prefix = $data['Roles_prefix'];
     $prer = str_pad($Number, 3, '0', STR_PAD_LEFT);
     $SID = $prefix.$prer;
     $sql2 = "UPDATE roles SET Number = '$Number' where Roles_Name = '$Position'";
    $result2 = $conn->query($sql2);
     }
$sql = "INSERT into staff(Staff_ID, password, Staff_name, Staff_position, Staff_status) VALUES('$SID','$passen', '$Name', '$Position', 'off')";
$result = $conn->query($sql);
if(!$result) {
    $booking = new Check();
   $booking->status = "database";
       echo json_encode($booking);
   }
else{
    $booking = new Check();
    $booking->status = "success";
    $booking->Pass = "$pass";
    $booking->ID = "$SID";
    $booking->Number = "$Number";
       echo json_encode($booking);
}
    
      
?>