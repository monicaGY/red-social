<?php  
require_once '../sql/bd.php';

try{

    $bd = new Mensajeria_BD();

    $datos = array(
        "usuarioId" => intval($_POST['idUserLogeado']),
        "amigoId" => intval($_POST['idAmigo'])
    );

    $bd->eliminarAmigo($datos);
    echo 'correcto';
}catch(Exception $e){
    echo $e;
}
?>