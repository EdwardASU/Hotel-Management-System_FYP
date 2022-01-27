<?php
include_once "config.php";
$rooms = array();
$room = array();
$sql = "SELECT * from task";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
        $SerID = $data['Services_ID'];
        $room['SerID'] = $SerID;
        $room['RID'] = $data['Room_ID'];
        $room['Task'] = $data['Task_type'];
        $room['StfID'] = $data['Staff_ID'];
        $room['Status'] = $data['status'];
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