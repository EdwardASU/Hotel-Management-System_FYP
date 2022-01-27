<?php
include_once "config.php";
class Check {
    public $status;
    
    
}
session_start();
if(isset($_SESSION['ID'])){
    $SID = $_SESSION['ID'];
    if($SID != 'Admin'){
        $sql2 = "UPDATE staff SET Staff_status = 'Off' where Staff_ID = '$SID'";
        $result2 = $conn->query($sql2);
    }
}
session_unset();
session_destroy();
    $login = new Check();
    $login->status =  'success';
    echo json_encode($login);
    

?>