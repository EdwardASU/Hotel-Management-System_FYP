<?php
include_once "config.php";
$BookRecords = array();
$Record = array();
$RID = htmlspecialchars($_POST['ID']);
$sql = "SELECT * from room_record where Room_ID = '$RID' AND current_status = 'Booking'";
$result = $conn->query($sql);
if(!$result) {
    $BookRecords['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
        $Record['BookingDate'] = $data['booking_date'];
        $Record['CusName'] = $data['Customer_Name'];
        $Record['BPeriod'] = $data['Duration'];
        
        array_push($BookRecords,$Record);
    }
    }
    else{
        $BookRecords['status'] = "noRecord";
    }
   echo json_encode($BookRecords);
?>