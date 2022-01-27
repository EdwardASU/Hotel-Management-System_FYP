<?php
include_once "config.php";
class Check {
    public $status;
    public $ID;
}
$Name = htmlspecialchars($_POST['Name']);
$ID = htmlspecialchars($_POST['ID']);
$Position = htmlspecialchars($_POST['Position']);
$sql = "SELECT * from staff where Staff_ID = '$ID'";
$result = $conn->query($sql);
if($result->num_rows > 0){
    $data0 = $result->fetch_array(MYSQLI_ASSOC);
    $Roles = $data0['Staff_position'];
}
if($Position != $Roles){
    $sql0 = "SELECT * from roles where Roles_Name = '$Position'";
    $result0 = $conn->query($sql0);
     if($result0->num_rows > 0){
     $data = $result2->fetch_array(MYSQLI_ASSOC);
     $Number = $data['Number']+1;
     $prefix = $data['Roles_prefix'];
     $prer = str_pad($Number, 3, '0', STR_PAD_LEFT);
     $SID = $prefix.$prer;
     $sql3 = "UPDATE roles SET Number = '$Number' where Roles_Name = '$Position'";
    $result3 = $conn->query($sql3);
     }
}
else{
    $SID = $ID;
}
$sql1 = "UPDATE staff SET Staff_name = '$Name', Staff_position = '$Position' where Staff_ID = '$ID'";
$result1 = $conn->query($sql1);
$sql2 = "UPDATE staff SET Staff_ID = '$SID' where Staff_name = '$Name' AND Staff_position = '$Position'";
$result2 = $conn->query($sql2);
if(!$result) {
    $booking = new Check();
   $booking->status = "database";
       echo json_encode($booking);
   }
else{
    
    $booking = new Check();
    $booking->status = "success";
    $booking->ID = "$SID";
       echo json_encode($booking);
}
    
      
?>