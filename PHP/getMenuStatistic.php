<?php
include_once "config.php";
class Check {
    public $status;
    public $Number;
    public $profits;
}

$MID = htmlspecialchars($_POST['ID']);
$sql = "SELECT * from menu where Menu_ID = $MID";
$result = $conn->query($sql);
if(!$result) {
    $booking = new Check();
   $booking->status = "database";
       echo json_encode($booking);
   }
if($result->num_rows > 0){
    while($menus = $result->fetch_assoc()){
    $menu = $menus['Menu_name'];
    $cost = $menus['cost'];
    $sql2 = "SELECT count(*) as count from kitchen where Menu_ID = $MID AND MONTH(Date) = MONTH(CURRENT_DATE()) AND YEAR(Date) = YEAR(CURRENT_DATE())";
    $result2 = $conn->query($sql2);
            if($result2->num_rows > 0){
             $total = $result2->fetch_assoc();
                $count = $total['count'];
            }
    
    }
    $booking = new Check();
    $booking->status = "success";
    $booking->Number = $count;
    $booking->profits = $count * $cost;
    echo json_encode($booking);
}


?>