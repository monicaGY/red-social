<?php  session_start(); 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto</title>
    <script src='../js/chats.js' type='module' defer></script>
<script src='../js/contacto.js' type='module' defer></script>
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">
    <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.js"></script>

</head>
<body class="border-opacity-10 bg-opacity-10 bg-dark bg-gradient d-flex overflow-hidden" style="max-width:1000px; margin:auto;" >
    
    <div id="tDivChats" class=" bg-opacity-50 bg-light bg-gradient flex-column overflow-hidden flex-grow-1" >
        <div class="text-light gap-3 bg-primary p-2 d-flex align-items-center justify-content-center" style="height:70px">
            <div style="width:50px" onclick=" window.location = 'p-principal.php' ">
                <img src="../src/atras.png" height="35"> 
            </div>   
            <div class="flex-grow-1 ">Chats</div>
        </div> 
        <div id="contenedor-chats" class="border-3 border-light overflow-auto flex-grow-1 d-flex flex-column mb-5" style="height:calc(100vh - 50px)"></div>
    </div>

    <div id="ventanaChat" class=" d-none overflow-hidden 
        bg-dark bg-opacity-10 bg-gradient d-flex flex-column justify-content-between flex-grow-1" style="max-width:100%; height: 100vh;">
         <!-- VENTANA DE UN CHAT PARA ENVIAR UN MENSAJE -->
        <div id="header-contacto" class=" align-items-center p-2 
        gap-3 d-flex bg-primary text-light" style="height:81px">
            <div class="d-inline-flex">
                <img id="regresar-atras" class="d-block d-sm-none" src="../src/atras.png" width="50">
                <img src="../src/foto-perfil.png" width="50">
            </div>
                    
                    
        </div>
        <!-- VENTANA DE ALERT -->
        <div id="tDivPublicaciones" class="d-none container">
            <div id="tDivAlertPublicar"class="mt-2 fs-6 alert alert-danger alert-dismissible fade show" role="alert">
                <strong id="tDivAlert"></strong> 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
        <div id="contenedor-mensajes" class="overflow-auto flex-grow-1 d-flex flex-column mt-2" style ="height:100%;">
        </div>

        <div id="formEnviarMensaje" class="align-items-end p-2 gap-2 d-inline-flex" style="max-width:100%">

            
            <textarea id="tTxTareaMensaje" placeholder="Escribe . . ." class=" rounded-5 form-control" style="height:50px"></textarea>
            <input id="tBtnEnviar" class="d-none form-control rounded-pill "  style="height:35px"type="submit" id="tInpEnviar" value="Enviar">

        </div>
    </div>

    <!-- VENTANA PARA QUE PULSE EN UN CHAT -->
    <div id="tDivInfAlert" class="d-none flex-grow-1 bg-dark w-25 bg-opacity-25  align-items-center justify-content-center">
        <div class="w-75 h-25 border rounded-5 border-3 border-light gap-2 d-flex flex-column align-items-center justify-content-center alert alert-secondary" role="alert">
            <img src="../src/logo.png" height="90">
            <p  class="mb-0 w-75 text-center">Toca en un chat para iniciar conversaciones con tus amigos</p>
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
    <script src='../js/contacto.js' type='module' defer></script>

</body>
</html>