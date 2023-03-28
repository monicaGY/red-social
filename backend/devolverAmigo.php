<?php  
require_once '../sql/bd.php';
$bd = new Mensajeria_BD();
$usuario = $bd->delvolverUsuarioPorId($_POST['idAmigo']);

echo $usuario;
?>