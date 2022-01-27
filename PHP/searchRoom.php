<?php
include_once "config.php";
$rooms = array();
$room = array();
$keyword = htmlspecialchars($_POST['keyword']);
$sql = "SELECT * from room as a left join type as b on a.Room_type = b.Type_Name where a.Room_ID LIKE '%$keyword%' OR a.Room_type LIKE '%$keyword%' OR b.Cost LIKE '%$keyword%' OR b.Descs LIKE '%$keyword%'";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
        $room['RID'] = $data['Room_ID'];
        $room['R_TYPE'] = $data['Room_type'];
        $room['R_Status'] = $data['Room_status'];
        $room['R_Cost'] = $data['Cost'];
        $room['R_Desc'] = $data['Descs'];
        array_push($rooms,$room);
    }
    }
    else{
      $rooms['status'] = "noRecord";
    }
   echo json_encode($rooms);
?>