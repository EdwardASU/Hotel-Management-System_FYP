<?php
include_once "config.php";
$rooms = array();
$room = array();
$sql = "SELECT * from menu";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
        $room['MID'] = $data['Menu_ID'];
        $room['M_Name'] = $data['Menu_name'];
        $room['cost'] = $data['cost'];
        $room['Desc'] = $data['Descs'];
        
        array_push($rooms,$room);
    }
    }
    else{
      $rooms['status'] = "noRecord";
    }
   echo json_encode($rooms);
?>