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
        
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">
    <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.js"></script>

</head>
<body class="d-flex gap-3 " style="max-width:1000px; margin:auto; " >
    
    <div class="flex-column overflow-hidden flex-grow-1">

        <div class="text-light align-items-center bg-primary p-2" style="height:50px">Chats</div> 
        <div class="flex-grow:1 contenedor-chats d-flex flex-column" style="overflow-y: scroll;"></div>

       
    </div>

    <div class="d-none d-sm-flex overflow-hidden bg-secondary d-flex flex-column justify-content-between flex-grow-1" style="height: 100vh;">
        <div id="header-contacto" class="align-items-center p-2 gap-3 d-flex bg-dark text-light" style="height:70px">
            <div id="regresar-atras">
                <img src="../src/atras.png" width="50">
                <img src="../src/foto-perfil.png" width="50">
            </div>
                    
                    
        </div>

        <div id="contenedor-mensajes" class="flex-grow-1 d-flex flex-column" style="overflow-y: scroll;">
        </div>

        <div id="formEnviarMensaje" class="d-inline-flex " >

            <input type="text" id="tInpMensaje" class="w-100">
            <input type="submit" id="tInpEnviar" value="Enviar">

        </div>
    </div>

    <script >
        let usuario = '<?php echo $_SESSION['idUsuario']; 
            if(empty($_SESSION['idUsuario'])){
                header("Location: http://localhost/00_git/chat/");
            }
        ?>'
    </script>
    <script src='../js/contacto.js' type='module' defer></script>

</body>
</html>