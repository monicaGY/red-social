<?php session_start() ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>chats</title>
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">
    <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.js"></script>
    <!-- <script src='../js/chats.js' type='module' defer></script> -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

</head>
<body class="fs-1 bg-light h-100 d-flex flex-column overflow-hidden" style="height:100vh;">
    <div class=" d-flex align-items-center  p-2 gap-2 bg-primary" style="height:70px">
        <div class="flex-grow-1 text-light">dumbo</div>
        <div id="tDivMensajeria" style="height:50px">
            <i class="far fa-envelope-open sm-fa-10x m-2"></i>
        </div>
         
         <div class="nav-item dropdown" id="tDivOpciones">
            <img class="nav-link dropdown-toggle" data-bs-toggle="dropdown" src="../src/menu.png">
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Opcion</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="../backend/cerrarSesion.php?cerrar=yes" >Cerrar Sesión</a></li>
            </ul>
        </div>
            

        
        
    </div>

    <script>
        let usuario = '<?php
            echo $_SESSION['idUsuario'];

            if(empty($_SESSION['idUsuario'])){
                header("Location: http://localhost/00_git/chat/");
            }
        ?>'

        document.querySelector("#tDivMensajeria").addEventListener('click', e => {
            window.location ="./p-mensajeria.php"

        }
        
        
        )

        

    </script>
</body>
</html>