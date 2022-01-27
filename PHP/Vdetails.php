<?php
include_once "config.php";
$RID = htmlspecialchars($_POST['ID']);
$status = htmlspecialchars($_POST['Rstatus']);
$rooms = array();
$room = array();
$sql = "SELECT * from room as a left join type as b on a.Room_type = b.Type_Name left join room_record as c on a.Room_ID = c.Room_ID where a.Room_ID = '$RID'";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    $data = $result->fetch_assoc();
        $room['RID'] = $RID;
        $room['R_TYPE'] = $data['Room_type'];
        $room['R_Status'] = $status;
        $room['R_Cost'] = $data['Cost'];
        
        
    }
    if($status == "checked-in"){
        $sql2 = "SELECT * from room_record where Room_ID = '$RID' AND current_status = 'checked-in'";
        $result2 = $conn->query($sql2);
        if(!$result2) {
            $rooms['status'] = "database";
           }
           if($result2->num_rows > 0){
            $data2 = $result2->fetch_assoc();
            $room['CusName'] = $data2['Customer_Name'];
            $room['ChkinDate'] = $data2['check_in_date'];
            $room['Period'] = $data2['Duration'];
           }
    }
     array_push($rooms,$room);
     
        echo json_encode($rooms);
?>