<?php
include_once "config.php";
$roomsc = array();
$rooma = array();
$Type = htmlspecialchars($_POST['Type']);
$Rooms = array();
$Rooms = $_POST['Rooms'];
foreach($Rooms as $room){
    $sql2 = "SELECT * from room where Room_ID = '$room'";
    $result2 = $conn->query($sql2);
    if($result2->num_rows > 0){
        while($data = $result2->fetch_array(MYSQLI_ASSOC)){
        if($data['Room_status'] == '' || $data['Room_status'] == 'Available' || $data['Room_status'] == 'Unavailable'){
        $sql = "UPDATE room SET Room_type = '$Type', Room_status = 'Available' where Room_ID = '$room'";
        $result = $conn->query($sql);
        if(!$result) {
            $rooma['status']='database';
            $rooma['ID'] = $room;
            array_push($roomsc,$rooma);
           }
           else{
            $rooma['status']='success';
            $rooma['ID'] = $room;
            array_push($roomsc,$rooma);
               
               }
             }
        else{
            $rooma['status']='database';
            $rooma['ID'] = $room;
            array_push($roomsc,$rooma);
            }
            }
        }
        
    }
    echo json_encode($roomsc);


   
?>