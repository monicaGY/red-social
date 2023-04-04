<?php  
require_once '../sql/bd.php';

try{
    $bd = new Mensajeria_BD();


    $datos = array(
        "chatId" => $_POST['chat'],
        "remitente" => $_POST['remitente'],
        "destinatario" => $_POST['destinatario'],
        "mensaje" => $_POST['mensaje'],
        "fecha" => date("Y-m-d"),
        "hora" => date("H:i:s")
    );
    $bd->insertarMensaje($datos);

}catch(Exception $e){  
    echo $e;
}

?>