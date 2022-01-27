<?php
include_once "config.php";
class Check {
    public $status;
    
}
$Stock = htmlspecialchars($_POST['Stock']);
$IID = htmlspecialchars($_POST['ID']);
$Supply = htmlspecialchars($_POST['Supply']);
$NewStock = $Stock + $Supply;
$sql = "UPDATE inventory SET Stock_num = '$NewStock' where Inv_ID = '$IID'";
$result = $conn->query($sql);
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
?>