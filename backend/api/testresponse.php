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

if ($decodedData != null) {
    // Process the form data
    $firstName = $decodedData['first_name'];
    $lastName = $decodedData['last_name'];
    $email = $decodedData['email'];
    $uname = $decodedData['username'];
    $password = $decodedData['password'];

    // ... Your further processing logic ...
    //  var_dump($decodedData);
    
    // Prepare the response
//     $con = new mysqli("localhost:3306","root","","evently");

//    if ($con->connect_error) {
//     echo "". $con->connect_error;}
$con=mysqli_connect($localhost,$username,$pass, $dbname);
if(mysqli_connect_errno()){
    die("Failed to connect".mysqli_connect_error());
}
// else{
//     echo "connected";
// }

        $check="select * from users where username='$uname'";
            $res=mysqli_query($con, $check);
            if(mysqli_num_rows($res)>0){
                $error_resp = array('Status' => 401, 'message' => 'data exists');
                http_response_code(401);
                // Send the response
                echo json_encode($error_resp);
                
            }
            else{
            $query="Insert into `users` (username,first_name,last_name,email,password) values('$uname','$firstName','$lastName','$email','$password')";
            mysqli_query($con,$query);
                // echo ' <script> alert("Username created")</script>';
                $response = array('Status' => 200, 'message' => 'Form data received successfully');
    http_response_code(200);
    // Send the response
    echo json_encode($response);
            }
    
    // print_r($response);
} else {
    // Handle JSON decoding error
    $response = array('Status' => 403, 'message' => 'Error decoding JSON data');
    echo json_encode($response);
}
?>
