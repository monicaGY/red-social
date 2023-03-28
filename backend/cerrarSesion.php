<?php
session_start();  
if(isset($_GET['cerrar'])){
    session_destroy();
    header("Location: http://localhost/00_git/chat/");
}
?>