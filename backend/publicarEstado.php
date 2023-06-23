<?php  
require_once '../sql/bd.php';

$bd = new Mensajeria_BD();

$datos = array (
    "estado" => $_POST['estado'],
    "autor" => $_POST['autor'],
    "fecha" => date("Y-m-d"),
    "hora" => date("H:i:s")
);
$resultado = $bd -> crearPublicacion($datos);

if($resultado){
    echo json_encode(array("tipo" => "estado", "accion" => "publicar", "resultado" => "correcto"));
}
?>