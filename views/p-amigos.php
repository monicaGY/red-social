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
<body class="fs-1 bg-light ">
    <div class="text-light bg-primary p-3">
        Mis amigos
    </div>

    <div id="tDivAmigos">

    </div>

    <script>
        let usuario = '<?php
            echo $_SESSION['idUsuario'];

            if(empty($_SESSION['idUsuario'])){
                header("Location: http://localhost/00_git/chat/");
            }
        ?>'
    </script>
</body>
</html>