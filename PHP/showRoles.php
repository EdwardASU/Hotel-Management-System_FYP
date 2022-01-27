<?php
include_once "config.php";
$rooms = array();
$room = array();
$sql = "SELECT * from roles";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
        $room['Name'] = $data['Roles_Name'];
        $room['Prefix'] = $data['Roles_prefix'];
        array_push($rooms,$room);
    }
    }
    else{
      $rooms['status'] = "noRecord";
    }
   echo json_encode($rooms);
?>