<?php  
require_once '../sql/bd.php';

try{
    $bd = new Mensajeria_BD();

    $datos = array (
        "estado" => $_POST['estado'],
        "autor" => $_POST['autor'],
        "fecha" => date("Y-m-d"),
        "hora" => date("H:i:s")
    );

    echo $bd -> crearPublicacion($datos);

}catch(Exception $e){
    echo $e;

}
?>