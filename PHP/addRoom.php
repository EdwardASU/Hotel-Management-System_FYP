<?php
include_once "config.php";
class Check {
    public $status;
    
}
$floor = htmlspecialchars($_POST['Floor']);
$room = htmlspecialchars($_POST['Room']);
$sql0 = "SELECT count(*) as count from floor";
$result0 = $conn->query($sql0);
if($result0->num_rows > 0){
 $data = $result0->fetch_array(MYSQLI_ASSOC);
 $count = $data['count'];
 $curFloor = $count + 1;
 $newFloor = $count + $floor;
 for($curFloor; $curFloor <= $newFloor; $curFloor++){
    $sql = "INSERT into floor (Floor) VALUES ($curFloor);";
    $result = $conn->query($sql);
    
for($i = 1; $i <= $room; $i++){
    $prer = str_pad($i, 2, '0', STR_PAD_LEFT);
    $RID = $curFloor."-".$prer;
    $sql2 = "INSERT into room (Room_ID, FID) VALUES ('$RID', '$curFloor')";
    $result2 = $conn->query($sql2);
    
}
if(!$result) {
    $booking = new Check();
    $booking->status = "database";
       echo json_encode($booking);
   }
   else{
    $booking = new Check();
    $booking->status = "success";
    echo json_encode($booking);
   }
 }
 
}
else{
    for($f = 1; $f <= $floor; $f++){
        $sql = "INSERT into floor (Floor) VALUES ($f);";
        $result = $conn->query($sql);
        
    for($r = 1; $r <= $room; $r++){
        $prer = str_pad($r, 2, '0', STR_PAD_LEFT);
        $RID = $f."-".$prer;
        $sql2 = "INSERT into room (Room_ID, FID) VALUES ('$RID', '$f')";
        $result2 = $conn->query($sql2);
    }
    if(!$result) {
        $booking = new Check();
        $booking->status = "database";
           echo json_encode($booking);
       }
       else{
        $booking = new Check();
        $booking->status = "success";
           echo json_encode($booking);
       }
}
}
?>