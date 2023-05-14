<?php  
session_start();
header("Access-Control-Allow-Origin: *");
header ("Content-type: application/json; charset=utf-8"); 
require_once 'validarDatos.php';
require_once '../sql/bd.php';

$bd = new Mensajeria_BD();
$datos= array(
    "accion" => $_POST["accion"],
    "usuario" => $_POST["usuario"],
    "password" => $_POST["password"]
);

if(empty($datos["usuario"]) || empty($datos["password"])){
    header('HTTP/ 400 Solicitud incorrecta');
    echo json_encode(array(
        "estado" => "error",
        "respuesta" => "Campos obligatorios",

    ));
    exit();

}else{

    if($datos["accion"] == "Entrar"){
        accionEntrar($datos, $bd);

    }else if($datos["accion"] == "Registrar"){
        accionRegistrar($datos, $expresiones, $bd);
    }
    
    
}

function accionEntrar($datos, $bd){
    $respuesta =  $bd->verificarUsuario($datos["usuario"], $datos["password"]);

    if($respuesta){
        $_SESSION['idUsuario'] = $bd->delvolverIdUsuario($datos["usuario"]);
        echo json_encode(array("tipo" => "autenticacion", "respuesta" => "aceptada", "usuario" => $_SESSION["idUsuario"]));
        exit();
    }else{
        header('HTTP/ 400 Solicitud incorrecta');
        echo json_encode(array("tipo" => "autenticacion", "respuesta" => "Los datos introducidos son incorrectos"));
        exit();
    }
}


function accionRegistrar($datos, $expresiones, $bd){
    $usuarioValido = preg_match($expresiones['usuario'], $datos['usuario']);
    $contraseñaValida = preg_match($expresiones['password'],$datos['password']);

    if($usuarioValido && $contraseñaValida){
        $existe = $bd->usuarioExistente($datos['usuario']);

        if(!$existe){
            $bd->crearUsuario($datos['usuario'], $datos['password']);
            $_SESSION['idUsuario'] = $bd->delvolverIdUsuario($datos["usuario"]);
            header('HTTP/ 200 Solicitud correcta');
            echo json_encode(array(
                "tipo" => "registar",
                "respuesta" => "aceptada"));
            exit();
            
        }else{
            header('HTTP/ 400 Solicitud incorrecta');
            echo json_encode(array(
                "tipo" => "registar",
                "respuesta" => "Este usuario ya existe"));
            exit();
        }
    }else{
        header('HTTP/ 400 Solicitud incorrecta');
        echo json_encode(array(
            "tipo" => "registar",
            "respuesta" => "Formato incorrecto"));
        exit();
    }
}

?>