<?php
include_once "config.php";
class Check {
    public $status;
    public $type;
    
}
session_start();
$username = $_POST['SID'];
$password = $_POST['PW'];
$tID = htmlspecialchars($username);
$tPW = htmlspecialchars($password);
if($tID == 'Admin' && $tPW == '114514'){
    $_SESSION['ID'] = $tID;
    $_SESSION['Name'] = 'Administrator';
    $_SESSION['Type'] = 'Admin';
    $login = new Check();
    $login->status = "success";
    $login->type = "Admin";
       echo json_encode($login);
}
else{
    $epw = md5($tPW);
    $sql = "SELECT * from staff where Staff_ID = '$tID' AND password = '$epw'";
    $result = $conn->query($sql);
    if(!$result) {
     $login = new Check();
     $login->status = "database";
        echo json_encode($login);
    }
    if($result->num_rows > 0){
        $total = $result->fetch_assoc();
        $_SESSION['ID'] = $tID;
        $_SESSION['Name'] = $total['Staff_name'];
        $_SESSION['Type'] = $total['Staff_position'];
        $login = new Check();
        $login->status = "success";
        $login->type = $total['Staff_position'];
           echo json_encode($login);
        $sql2 = "UPDATE staff SET Staff_status = 'On Duty' where Staff_ID = '$tID' AND password = '$epw'";
        $result2 = $conn->query($sql2);
    }
    else{
        $login = new Check();
        $login->status = "failed";
           echo json_encode($login);
           
    }
}


?>