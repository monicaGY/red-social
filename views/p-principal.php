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
   <script src='../js/p-publicar.js' type='module' defer></script>

</head>
<body class="fs-1 bg-light h-100 d-flex flex-column overflow-hidden" style="height:100vh;">
    <div id="tDivCabecera" class="d-flex align-items-center  p-2 gap-3 bg-primary" style="height:70px">
        <div class="flex-grow-1 text-light">dumbo</div>

        <img src="../src/buscador.png" height="40" id="tDivBuscar"></img>        
        <img src="../src/mensajeria.png" height="40" id="tDivMensajeria">
        <img src="../src/publicar.png" height="40" id="tImgPublicar">
         <div class="nav-item dropdown" id="tDivOpciones">
            <img class="nav-link dropdown-toggle" data-bs-toggle="dropdown" src="../src/menu.png">
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="./p-amigos.php">Mis amigos</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="../backend/cerrarSesion.php?cerrar=yes" >Cerrar Sesión</a></li>
            </ul>
        </div>
            

        
        
    </div>

    <div id="tDivVentana" class="d-none fixed-top bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style="height:100vh">
       
        <div class="border-opacity-50 border-4 border border-primary rounded-5 alert alert-light h-50 w-75 d-flex flex-column justify-content-center align-items-center" role="alert">
            <div>Compartir</div>

            <textarea id="tTxTareaPublicar" class=" my-3 form-control overflow-hidden w-75"  >
            </textarea>
                <div>
                    <button id="tBtnCancelar" type="submit" class="btn btn-danger">Cancelar</button>
                    <button id="tBtnPublicar" type="submit" class="btn btn-primary">Publicar</button>
                </div>
            </div>
            

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