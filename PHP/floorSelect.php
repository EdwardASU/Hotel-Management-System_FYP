<?php
include_once "config.php";
$floor = array();
class flds {
    public $fld;
    
}
$sql = "SELECT * from floor";
$result = $conn->query($sql);
if(!$result) {
    $floor['status'] = "database";
   }
   if($result->num_rows > 0){
    while($data = $result->fetch_array(MYSQLI_ASSOC)){
    $FID = $data['FID'];
    //$flds = new flds();
    //$flds->$fld = $FID;
    array_push($floor,$FID);
    }
   }
   else{
    $floor['status'] = "noRecord"; 
   }
   echo json_encode($floor);
?>