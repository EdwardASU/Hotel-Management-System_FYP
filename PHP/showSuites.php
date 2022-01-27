<?php
include_once "config.php";
$rooms = array();
$room = array();
$sql = "SELECT * from type";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
        $room['Name'] = $data['Type_Name'];
        $room['Cost'] = $data['Cost'];
        $room['Desc'] = $data['Descs'];
        array_push($rooms,$room);
    }
    }
    else{
      $rooms['status'] = "noRecord";
    }
   echo json_encode($rooms);
?>