<?php
include_once "config.php";
class Check {
    public $status;
    
}
$sql = "SELECT * from room_record where current_status = 'Booking' AND booking_date = CURDATE()";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
   else{
    if($result->num_rows > 0){
        while($data = $result->fetch_array(MYSQLI_ASSOC)){
            $RID = $data['Room_ID'];
            $sql2 = "UPDATE room SET Room_status = 'booking' where Room_ID = '$RID'";
           $result2 = $conn->query($sql2);
    
        }
        }
        $login = new Check();
        $login->status = "success";
        echo json_encode($login);
   }
   
?>