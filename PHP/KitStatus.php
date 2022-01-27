<?php
include_once "config.php";
$rooms = array();
$room = array();
$Status = $_POST['Stats'];
$sql = "SELECT * from kitchen where Status = '$Status'";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
        $SerID = $data['Services_ID'];
        $room['SerID'] = $SerID;
        $room['RID'] = $data['Room_ID'];
        $MID = $data['Menu_ID'];
        $room['StfID'] = $data['Staff_ID'];
        $room['Status'] = $data['Status'];
        $sql2 = "SELECT * from menu where Menu_ID = '$MID' ";
        $result2= $conn->query($sql2);
        if($result2->num_rows > 0){
        $data2 = $result2->fetch_array(MYSQLI_ASSOC);
        $room['Meals'] = $data2['Menu_name'];
        }
        $sql3 = "SELECT * from room_services where Services_ID = '$SerID'";
        $result3= $conn->query($sql3);
        if($result3->num_rows > 0){
        $data3 = $result3->fetch_array(MYSQLI_ASSOC);
        $room['Remark'] = $data3['Remark'];
        }
        array_push($rooms,$room);
    }
    }
    else{
      $rooms['status'] = "noRecord";
    }
   echo json_encode($rooms);
?>