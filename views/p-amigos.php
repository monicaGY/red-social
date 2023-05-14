<?php session_start() ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">
    <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.js"></script>
    <title>Dumbo</title>
    <script src='../js/p-amigos.js' type='module' defer></script>
</head>
<body class="fs-1 bg-opacity-10 bg-dark bg-gradient">
    <div class="d-flex gap-3 text-light bg-primary p-3">
        <div style="width:50px" onclick=" window.location = 'p-principal.php' ">
            <img src="../src/atras.png" height="35"> 
        </div>  
        Mis amigos
    </div>

    <div id="tDivAmigos" class="container bg-light rounded-bottom"></div>

    <script>
        let usuario = <?php 
        if(empty($_SESSION["idUsuario"])){
            ?>
            window.location = "../index.html";
            <?php
        }else{
            echo $_SESSION["idUsuario"];
        }
        ?>
    </script>
</body>
</html>