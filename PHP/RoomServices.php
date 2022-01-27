<?php
include_once "config.php";
class Check {
    public $status;
    
}
$RID = htmlspecialchars($_POST['ID']);
$Type = htmlspecialchars($_POST['Type']);
$date = date("Y-m-d");
$sql0 = "SELECT * from room_record where Room_ID = '$RID' AND current_status = 'checked-in'";
$result0 = $conn->query($sql0);
if($result0->num_rows > 0){
    $data0 = $result0->fetch_assoc();
        $RecordID = $data0['Record_ID'];
        
    }
if($Type == "Room"){
    $Request = htmlspecialchars($_POST['Request']);
    $Remark = htmlspecialchars($_POST['Remark']);
    $sql = "INSERT into room_services (Room_ID,Record_ID, Services_type, Remark, Date, Status) VALUES ('$RID','$RecordID', '$Type', '$Remark', '$date', 'Pending')";
    $result = $conn->query($sql);
    if(!$result) {
        $login = new Check();
        $login->status = "database";
           echo json_encode($login);
       }
    $sql2 = "SELECT * from room_services where Room_ID = '$RID' AND Status = 'Pending' AND Services_type = 'Room'";
    $result2 = $conn->query($sql2);
    if($result2->num_rows > 0){
        $data = $result2->fetch_assoc();
        $SerID = $data['Services_ID'];
            
        }
    $sql3 = "INSERT into task (Services_ID, Room_ID, Task_type, Date, status) VALUES ($SerID, '$RID', '$Request', '$date', 'Pending')";
    $result3 = $conn->query($sql3);
    $login = new Check();
    $login->status = 'success';
     echo json_encode($login);
}
if($Type == "Kitchen"){
    $Request = htmlspecialchars($_POST['Request']);
    $Remark = htmlspecialchars($_POST['Remark']);
    $sql = "INSERT into room_services (Room_ID,Record_ID, Services_type, Remark, Date, Status) VALUES ('$RID','$RecordID', '$Type', '$Remark', '$date', 'Pending')";
    $result = $conn->query($sql);
    if(!$result) {
        $login = new Check();
        $login->status = "database";
           echo json_encode($login);
       }
    $sql2 = "SELECT * from room_services where Room_ID = '$RID' AND Status = 'Pending' AND Services_type = 'Kitchen'";
    $result2 = $conn->query($sql2);
    if($result2->num_rows > 0){
        $data = $result2->fetch_assoc();
            $SerID = $data['Services_ID'];
            
        }
    $sql3 = "INSERT into kitchen (Services_ID, Room_ID, Menu_ID, Date, Status) VALUES ($SerID, '$RID', '$Request', '$date', 'Pending')";
    $result3 = $conn->query($sql3);
    $login = new Check();
    $login->status = 'success';
     echo json_encode($login);
}

?>