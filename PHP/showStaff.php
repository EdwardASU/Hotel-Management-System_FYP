<?php
include_once "config.php";
$rooms = array();
$room = array();
$sql = "SELECT * from staff";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
        $room['SID'] = $data['Staff_ID'];
        $room['Name'] = $data['Staff_name'];
        $room['Position'] = $data['Staff_position'];
        $room['status'] = $data['Staff_status'];
        array_push($rooms,$room);
    }
    }
    else{
      $rooms['status'] = "noRecord";
    }
   echo json_encode($rooms);
?>