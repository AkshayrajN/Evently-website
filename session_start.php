<?php 

session_start();

/*session is started if you don't write this line can't use $_Session  global variable*/

$_SESSION["newsession"]=200;
echo "connected";

?>