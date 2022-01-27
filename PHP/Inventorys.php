<?php
include_once "config.php";
$rooms = array();
$room = array();
$sql = "SELECT * from inventory";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
        $room['InvID'] = $data['Inv_ID'];
        $room['InvName'] = $data['inv_Name'];
        $room['S_Number'] = $data['Stock_num'];
        $room['W_Number'] = $data['Warning_num'];
        
        array_push($rooms,$room);
    }
    }
    else{
      $rooms['status'] = "noRecord";
    }
   echo json_encode($rooms);
?>