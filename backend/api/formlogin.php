<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');
// include('http://localhost:443/Trail/Evently-Website/session_start.php');
session_start();
$inputData = file_get_contents('php://input');
$decodedData = json_decode($inputData, true);

$localhost="localhost";
$username="root";
$pass= '';
$dbname="evently";

$con=mysqli_connect($localhost,$username,$pass,$dbname);
// var_dump($decodedData);
if ($decodedData != null) {
    // Process the form data
    $uname = $decodedData['username'];
    $password = $decodedData['password'];
   
        //read from db
       
        $query="select * from users where username='$uname' and password='$password' limit 1";
        
        $result=$con->query($query);
        
      
        
            if($result && mysqli_num_rows($result)==1){
                $response = array('Status' => 200, 'message' => 'Sucessfully loggedin');
                    echo json_encode($response);
                     header("Location:http://localhost:443/Trail/Evently-Website/session_start.php");
                    die;
                }
                else{
                    $response = array('Status' => 403, 'message' => 'Wrong password');
                    echo json_encode($response);
                }
            
    }

    else{
        $response = array('Status' => 403, 'message' => 'Error decoding JSON data');
    echo json_encode($response);
    }

?>