<?php
include_once "config.php";
$RID = htmlspecialchars($_POST['ID']);
$rooms = array();
$room = array();
$RSCost = 0;
$sql = "SELECT * from room_record where Room_ID = '$RID' AND current_status = 'checked-in'";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   if($result->num_rows > 0){
    $data = $result->fetch_array(MYSQLI_ASSOC);
    $RecordID = $data['Record_ID'];
    $room['RecordID'] = $RecordID;
    $room['CusName'] = $data['Customer_Name'];
    $room['ChkDate'] = $data['check_in_date'];
    $room['Period'] = $data['Duration'];
    $sql2 = "SELECT * from room_services where Room_ID = '$RID' and Record_ID = '$RecordID'";
    $result2 = $conn->query($sql2);
    if($result2->num_rows > 0){
        while($data2 = $result2->fetch_array(MYSQLI_ASSOC)){
            $SerID = $data2['Services_ID'];
            
            $sql3 = "SELECT * from kitchen as a left join menu as b on a.Menu_ID = b.Menu_ID where a.Services_ID = '$SerID' AND a.Room_ID = '$RID' AND Status = 'Complete'";
            $result3 = $conn->query($sql3);
            if($result3->num_rows > 0){
                $room['Rs'] = '1';
                while($data3 = $result3->fetch_array(MYSQLI_ASSOC)){
                    $RSCost += $data3['cost'];
                }
                $room['RSPrice'] = $RSCost;
            }
        }
    }
   }
   array_push($rooms,$room);
   echo json_encode($rooms);
?>