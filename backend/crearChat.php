<?php  
require_once '../sql/bd.php';

$bd = new Mensajeria_BD();
$datos = array (
    "remitente" => $_POST['remitente'],
    "destinatario" => $_POST['destinatario']
);
$resultado = $bd -> crearChat($datos);


if($resultado){
    $idChat = $bd -> devolverIdChat($datos);
    echo json_encode(array("tipo" => "mensajeria" , "accion" => "crear chat", "chat" => $idChat, "resultado" => "correcto"));
}else{
    echo json_encode(array("tipo" => "mensajeria" , "accion" => "crear chat", "resultado" => "fallido"));

}
    
?>