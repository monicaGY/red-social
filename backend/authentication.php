<?php  
session_start();
require_once 'validarDatos.php';
require_once '../sql/bd.php';
$bd = new Mensajeria_BD();

if($_POST){
    $continuar=false;
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];
    $accion = $_POST['accion'];

    if($accion == 'Entrar'){
        $continuar =  $bd->verificarUsuario($usuario, $contraseña);
    }

    if($accion == 'Registrar'){
        $usuarioValido = preg_match($expresiones['usuario'], $_POST['usuario']);
        $contraseñaValida = preg_match($expresiones['contraseña'],$_POST['contraseña']);
    
        if($usuarioValido && $contraseñaValida){

            $existe=$bd->usuarioExistente($usuario);

            if(!$existe){
                $continuar = $bd->crearUsuario($usuario, $contraseña);
                
            }
        }
    }

    if($continuar){
        $_SESSION['idUsuario'] = json_encode($bd->delvolverIdUsuario($usuario));

      
        header("Location: http://localhost/00_git/chat/views/p-principal.php",TRUE,301);
        exit();
    }else{
        header("Location: http://localhost/00_git/chat/index.html",TRUE,301);
        exit();
    }
    
}
?>