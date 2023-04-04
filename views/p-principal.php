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
    <link rel="stylesheet" href="style.css">
   <script src='../js/p-principal.js' type='module' defer></script>

</head>
<body class="fs-1 bg-light h-100 d-flex flex-column overflow-hidden" style="height:100vh;">
    <div id="tDivCabecera" class="d-flex align-items-center  p-2 gap-3 bg-primary" style="height:70px">
        <div class="flex-grow-1 text-light">dumbo</div>

        <img src="../src/buscador.png" height="40" id="tDivBuscar"></img>        
        <img src="../src/mensajeria.png" height="40" id="tDivMensajeria">
        
         <div class="nav-item dropdown" id="tDivOpciones">
            <img class="nav-link dropdown-toggle" data-bs-toggle="dropdown" src="../src/menu.png">
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Mis amigos</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="../backend/cerrarSesion.php?cerrar=yes" >Cerrar Sesión</a></li>
            </ul>
        </div>
            

        
        
    </div>



   <div id="tDivPantallaBuscar" style="height:100vh" class="d-none">
        <div class="my-3 d-flex mx-2">
            <div id="tDivAtras">
                <img src="../src/atras.png" width="50">
            </div>
         <input id="tInpBuscar" class="form-control" type="text" placeholder="Buscar">
        </div>

        <div id="nDivUsuarios" >
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