<?php
include_once "config.php";
$rooms = array();
$room = array();
$MID = htmlspecialchars($_POST['ID']);
$sql0 = "SELECT * from menu where Menu_ID = $MID";
$result0 = $conn->query($sql0);
if($result0->num_rows > 0){
    $menus = $result0->fetch_assoc();
    $cost = $menus['cost'];
}
$sql = "SELECT count(*) as count, MONTH(Date) as months from kitchen where Menu_ID = '$MID' AND EXTRACT(YEAR_MONTH FROM Date) > EXTRACT(YEAR_MONTH FROM CURDATE() - INTERVAL
5 MONTH) GROUP BY MONTH(Date)";
$result = $conn->query($sql);
if(!$result) {
    $rooms['status'] = "database";
   }
if($result->num_rows > 0){
    while($total = $result->fetch_assoc()){
    $room['count'] = $total['count'];
    $room['months'] = $total['months'];
    $room['profits'] = $total['count'] * $cost;
    array_push($rooms,$room);
        }
    }
    echo json_encode($rooms);

?>