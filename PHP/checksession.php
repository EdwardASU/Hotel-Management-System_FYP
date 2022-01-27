<?php
include_once "config.php";
class Check {
    public $status;
    public $Name;
    public $ID;
    public $Type;
    
}
session_start();
    if(isset($_SESSION['ID'])){
        $login = new Check();
        $login->status =  'success';
        $login->ID =  $_SESSION['ID'];
        $login->Name = $_SESSION['Name'];
        $login->Type = $_SESSION['Type'];
        echo json_encode($login);
    }
    else{
    $login = new Check();
    $login->status =  'failed';
    echo json_encode($login);
    }
    

?>