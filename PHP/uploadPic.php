<?php
include_once "config.php";
class Check {
    public $status;
}
$filename = $_POST['filename'];
$target_directory = '../Menu/';
$target_file = $target_directory.basename($_FILES['file']['name']);
$filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

if($filetype != "jpg" && $filetype != "png" && $filetype != "jpeg"){
    $booking = new Check();
    $booking->status = "type";
        echo json_encode($booking);

}
else{
    try{
    $newfilename = $target_directory.$filename.".jpg";
    if(move_uploaded_file($_FILES['file']['tmp_name'],$newfilename)){
        $booking = new Check();
        $booking->status = "success";
            echo json_encode($booking); 
    }
}
catch(Exception $e){
echo $e->getMessage();
}
}
?>