<?php  
require_once '../sql/bd.php';

// echo $_POST['mensaje'];
// echo $_POST['chat'];
// echo $_POST['remitente'];
// echo $_POST['destinatario'];

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
    echo 'bien';

}catch(Exception $e){  
    echo $e;
}

?>