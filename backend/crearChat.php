<?php  
require_once '../sql/bd.php';

try{
    $bd = new Mensajeria_BD();

    $datos = array (
        "remitente" => $_POST['remitente'],
        "destinatario" => $_POST['destinatario']
    );
    $bd -> crearChat($datos);
    echo $bd -> devolverIdChat($datos);
    

}catch(Exception $e){  
    echo $e;
}
?>