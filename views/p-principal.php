<?php session_start() ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>chats</title>
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">
    <link href="https://getbootstrap.com/docs/5.2/assets/css/docs.css" rel="stylesheet">
    <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.js"></script>
    <link rel="stylesheet" href="style.css">
   <script src='../js/p-principal.js' type='module' defer></script>
   <script src='../js/p-publicar.js' type='module' defer></script>
   <script src='../js/p-publicaciones.js' type='module' defer></script>


</head>
<body class="fs-1 bg-opacity-10 bg-dark bg-gradient gap-3 h-100 d-flex flex-column overflow-hidden" style="height:100vh;">
    
    <!-- NAVBAR TELEFONO -->
    <div id="tDivCabecera" class=" d-flex align-items-center justify-content-center p-2 gap-3 bg-primary" style="height:90px">

        <nav class="d-sm-none navbar">
            <div>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLightNavbar" aria-controls="offcanvasLightNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="w-75 offcanvas offcanvas-start text-bg-light" tabindex="-1" id="offcanvasLightNavbar" aria-labelledby="offcanvasLightNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasLightNavbarLabel">Menú</h5>
                        <button type="button" class="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item"><a class="nav-link active" aria-current="page" id="tNavPublicar" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLightNavbar" aria-controls="offcanvasLightNavbar">Publicar estado</a></li>
                            <li class="nav-item"><a class="nav-link" id="tNavBuscar">Buscar usuarios</a></li> 
                            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cuenta</a>
                                <ul class="dropdown-menu dropdown-menu-light">
                                  <li><a class="dropdown-item"  onclick="window.location = './p-mensajeria.php' ">Mensajería</a></li>
                                  <li><a class="dropdown-item" href="./p-amigos.php">Mis amigos</a></li>
                                  <li><hr class="dropdown-divider"></li>
                                  <li><a class="dropdown-item" href="../backend/cerrarSesion.php?cerrar=yes">Cerrar sesión</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <div class="flex-grow-1 text-light">
            <img src="../src/logo.png " style="height:70px">
        </div>

        <img src="../src/buscador.png" height="40" id="tDivBuscar" class="d-none d-sm-block"></img>        
        <img src="../src/mensajeria.png" height="40" id="tDivMensajeria" class="d-none d-sm-block" onclick=" window.location = './p-mensajeria.php' ">
        <img src="../src/publicar.png" height="40" id="tImgPublicar" class="d-none d-sm-block">
        <div class="nav-item dropdown d-none d-sm-block" id="tDivOpciones">
            <img class="nav-link dropdown-toggle" data-bs-toggle="dropdown" src="../src/menu.png">
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="./p-amigos.php">Mis amigos</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="../backend/cerrarSesion.php?cerrar=yes" >Cerrar Sesión</a></li>
            </ul>
        </div>
    </div>

    <!-- VENTANA REALIZAR PUBLICACIÓN -->
    <div id="tDivVentana" class="d-none fixed-top bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style="height:100vh">
       
        <div class="border-opacity-50 border-4 border border-primary rounded-5 alert alert-light h-50 w-75 d-flex flex-column justify-content-center align-items-center" role="alert">
            <div>Compartir</div>

                <textarea id="tTxTareaPublicar" maxlength="5000"class=" my-3 form-control overflow-hidden w-75"  >
                </textarea>

            <div id="tDivInf">
                <div id="tDivInfCancelar" class="d-none p-2 fs-6 alert alert-danger align-items-center d-flex w-auto" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 16 16" role="img" aria-label="Advertencia:">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                    </svg>
                    <div>Se canceló la publicación</div>
                </div>

                <div id="tDivInfAvisar" class="d-none p-2 fs-6 alert alert-danger align-items-center d-flex w-auto" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 16 16" role="img" aria-label="Advertencia:">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                    </svg>
                    <div>Debes de rellenar el campo</div>
                </div>

                <div id="tDivInfPublicar" class="d-none p-2 fs-6 alert alert-success d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  <div>Publicación realizada con éxito</div>
                </div>
            </div>
                <div>
                    <button id="tBtnCancelar" type="submit" class="btn btn-danger">Cancelar</button>
                    <button id="tBtnPublicar" type="submit" class="btn btn-primary">Publicar</button>
                </div>
            </div>
            

        </div>
    </div>

    <!-- ALERT CUANDO NO SE REALIZO UNA PUBLICACIÓN -->
    <div id="tDivPublicaciones" class="container flex-grow-1 d-flex flex-column gap-2" style="overflow-y: scroll; height:calc(100vh - 120px)" >
    </div>

    <!-- BUSCAR USUARIOS -->
   <div id="tDivPantallaBuscar" style="height:100vh" class="p-4 d-none">
        <div class="d-flex gap-3 ">
            <div id="tDivAtras">
                <img src="../src/atras.png" width="50">
            </div>
         <input id="tInpBuscar" class="flex-grow-1 mx-auto form-control" style="max-width:500px"type="text" placeholder="Buscar">
        </div>

        <div id="nDivUsuarios" class="container pt-4 ">
        </div>

    </div>



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