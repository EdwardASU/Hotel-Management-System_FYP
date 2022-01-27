<?php
include_once "config.php";
echo "<table border = '1px solid black' width='30%' style='text-align: center;'>";
$sql = "SELECT * from type";
$result = $conn->query($sql);
if(!$result) die('database');
if($result->num_rows > 0){
    while($type = $result->fetch_assoc()){
    $typen = $type['Type_Name'];
    $sql2 = "SELECT count(*) as count from room as a left join room_record as b on a.Room_ID = b.Room_ID where Room_type = '$typen'";
    $result2 = $conn->query($sql2);
        if(!$result2) die('database');
            if($result2->num_rows > 0){
             while($total = $result2->fetch_assoc()){
                $count = $total['count'];
               
                }
            }
            
            echo "
        <tr>
        <th>".$typen.":</th>
        <td>".$count."</td>
        </tr>";
    }
 
}

echo "</table>";
?>