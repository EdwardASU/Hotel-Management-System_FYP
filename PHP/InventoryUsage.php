<?php
include_once "config.php";
class Check {
    public $status;

}
$ID = htmlspecialchars($_POST['ID']);
$Stock = htmlspecialchars($_POST['Stock']);
$Usage = htmlspecialchars($_POST['Usage']);
$newStock = $Stock - $Usage;
$sql = "UPDATE inventory SET Stock_num = '$newStock' where Inv_ID = '$ID'";
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