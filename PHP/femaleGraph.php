<?php
include_once "config.php";
$rooms = array();
$room = array();
if(isset($_POST['ID'])){
    $RID = htmlspecialchars($_POST['ID']);
    $sql = "SELECT count(*) as count, MONTH(check_in_date) as months from room_record where Room_ID = '$RID' AND EXTRACT(YEAR_MONTH FROM check_in_date) > EXTRACT(YEAR_MONTH FROM CURDATE() - INTERVAL
    5 MONTH) AND Gender = 'Female' AND current_status = 'Finish' GROUP BY MONTH(check_in_date)";
    
}
else{
    $sql = "SELECT count(*) as count, MONTH(check_in_date) as months from room_record where EXTRACT(YEAR_MONTH FROM check_in_date) > EXTRACT(YEAR_MONTH FROM CURDATE() - INTERVAL
    5 MONTH) AND Gender = 'Female' AND current_status = 'Finish' GROUP BY MONTH(check_in_date)"; 
}
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
if($result->num_rows > 0){
    while($total = $result->fetch_assoc()){
    $room['Female'] = $total['count'];
    $room['Months'] = $total['months'];
    array_push($rooms,$room);
        }
    }
                echo json_encode($rooms);
?>
