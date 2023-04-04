<?php  
require_once '../sql/bd.php';

try{

    $bd = new Mensajeria_BD();

    // echo $_POST['usuario'];
    // echo $_POST['nombre'];
    // echo $_POST['idAmigo'];
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