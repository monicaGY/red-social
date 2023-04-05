<?php 

class Mensajeria_BD{

    private $_connection;
    private $_host = 'localhost';
    private $_dbname = 'mensajeria';
    private $_username = 'root';
    private $_password = '';

    function __construct(){

        try{
            $this->_connection = new PDO("mysql:host=$this->_host;dbname=$this->_dbname","$this->_username","$this->_password");

        }catch(PDOException $e){
            die ('Error en la conexión de datos: '. $e->getMessage());
        }

    }
    function getConnection(){
        return $this->_connection;
    }

    function verificarUsuario($usuario, $contraseña){

        $consulta = "SELECT * FROM usuario WHERE nombre='".$usuario."' and contraseña='".$contraseña."';" ;
        $consulta = $this->_connection->prepare($consulta);
        $consulta->execute();
        if($consulta->rowCount()>0){
            return true; 
            // $lista=[];
            // while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            //     $lista[] = $fila;
            // }
            // return json_encode($lista[0]['idUsuario']);
        }
    }

    function usuarioExistente($usuario){

        $consulta = "SELECT * FROM usuario WHERE nombre='".$usuario."';" ;
        $consulta = $this->_connection->prepare($consulta);
        $consulta->execute();

        if($consulta->rowCount()>0){
            return true;
        }
    }

    function crearUsuario($usuario, $contraseña){

        $consulta = 'INSERT INTO usuario(idUsuario,nombre,contraseña) VALUES (NULL,"'.$usuario.'","'.$contraseña.'")';
        $consulta = $this->_connection->prepare($consulta);
        $consulta->execute();

        if($consulta->rowCount()>0){
           return true;
    
        }
    }
    function delvolverIdUsuario($usuario){
        $consulta = "SELECT * FROM usuario WHERE nombre='".$usuario."';" ;
        $consulta = $this->_connection->prepare($consulta);
        $consulta->execute();

        if($consulta->rowCount()>0){
            $lista=[];
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $lista[] = $fila;
            }
            return $lista[0]['idUsuario'];
           
        }
    }

    function insertarMensaje($datos){
        $consulta = 'INSERT INTO mensaje(id,chat_id,remitente,destinatario,contenido,fecha,hora) 
        VALUES (NULL,"'.$datos['chatId'].'","'.$datos['remitente'].'","'.$datos['destinatario'].'","'.$datos['mensaje'].'","'.$datos['fecha'].'","'.$datos['hora'].'")';
        $consulta = $this->_connection->prepare($consulta);
        $consulta->execute();

        if($consulta->rowCount()>0){
           return true;
    
        }

    }
   
    function delvolverUsuarioPorId($id){
        $consulta = "SELECT * FROM usuario WHERE idUsuario=".$id.";" ;
        $consulta = $this->_connection->prepare($consulta);
        $consulta->execute();

        if($consulta->rowCount()>0){
            $lista=[];
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $lista[] = $fila;
            }
            return $lista[0]['nombre'];
           
        }
    }

    function agregarAmigo($datos){
        $consulta = 'INSERT INTO amigo (id, nombre, amigo) VALUES('.$datos["amigoId"].',"'.$datos["amigoNombre"].'",'.$datos["usuario"].')';
        $consulta = $this->_connection->prepare($consulta);
        $consulta->execute();

        if($consulta->rowCount()>0){
           return true;
    
        }
    
    }
    function crearChat($datos){
        $consulta = 'INSERT INTO chat (idChat,usuario_1, usuario_2) 
        VALUES (NULL,"'.$datos['remitente'].'","'.$datos['destinatario'].'")';
    
        $consulta = $this->_connection->prepare($consulta);
        $consulta->execute();


        $consult = 'SELECT idChat FROM chat WHERE usuario_1 = '.$datos['remitente'].' AND usuario_2 = '.$datos['destinatario'];
        $consult = $this->_connection->prepare($consult);
        $consult->execute();

        if($consult->rowCount()>0){
            $lista=[];
            while ($fila = $consult->fetch(PDO::FETCH_ASSOC)) {
                $lista[] = $fila;
            }
            $idChat = $lista[0]['idChat'];
            return $idChat;
        }  
    }
}
?>
