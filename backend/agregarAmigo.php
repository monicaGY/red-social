<?php  
require_once '../sql/bd.php';

try{

    $bd = new Mensajeria_BD();

    $datos = array(
        "usuario" => intval($_POST['usuario']),
        "amigoNombre" => $_POST['nombre'],
        "amigoId" => intval($_POST['idAmigo'])
    );

    $bd->agregarAmigo($datos);
}catch(Exception $e){
    echo $e;
}
?>