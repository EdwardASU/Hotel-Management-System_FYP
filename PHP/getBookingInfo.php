<?php
include_once "config.php";
class Check {
    public $status;
    public $Name;
    public $Period;
    public $Gender;
}
$RID = htmlspecialchars($_POST['ID']);
$sql = "SELECT * from room_record where Room_ID = '$RID' AND current_status = 'Booking' AND booking_date = CURDATE()";
$result = $conn->query($sql);
if(!$result) {
    $booking = new Check();
   $booking->status = "database";
       echo json_encode($booking);
   }
   if($result->num_rows > 0){
    $data = $result->fetch_array(MYSQLI_ASSOC);
        $booking = new Check();
        $booking->Gender = $data['Gender'];
        $booking->Name = $data['Customer_Name'];
        $booking->Period = $data['Duration'];

        $booking->status = "1";
       echo json_encode($booking);
    
    }
    else{
        $booking = new Check();
        $booking->status = "0";
        echo json_encode($booking);
    }

?>