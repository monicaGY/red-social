<?php  
include './sql/bd.php';
$bd = new Mensajeria_BD();

if(isset($_GET)){


    // if(isset($_GET['usuario'])){

    //     $consulta = 
    //         'SELECT * FROM `mensaje` 
    //         INNER JOIN chat on 
    //         chat.idChat = mensaje.destinatario
    //         WHERE remitente ="'.$_GET['usuario'].'";';
    // }
    if(isset($_GET['user']) && empty($_GET['amigos'])){
        $consulta =
            'SELECT chat.idChat, usuario.idUsuario, usuario.nombre 
            FROM `chat` INNER JOIN usuario
            ON chat.usuario_1 = usuario.idUsuario OR chat.usuario_2 = usuario.idUsuario
            WHERE (usuario_1 = "'.$_GET['user'].'" OR usuario_2="'.$_GET['user'].'") 
            AND usuario.idUsuario<>"'.$_GET['user'].'";';
    }

    if(isset($_GET['idUsuario1']) && isset($_GET['idUsuario2'])){
        $consulta=
            'SELECT * FROM mensaje 
            where (remitente ='.$_GET['idUsuario1'].' OR remitente='.$_GET['idUsuario2'].')  
            AND (destinatario='.$_GET['idUsuario1'].' OR destinatario='.$_GET['idUsuario2'].') 
            ORDER BY fecha, hora;';
    }

    // if(isset($_GET['usuarios']) && isset($_GET['usuario'])){
    //     $consulta =
    //         'SELECT DISTINCT(usuario.nombre), usuario.idUsuario 
    //         from usuario LEFT JOIN amigo ON amigo.amigo = usuario.idUsuario
    //         WHERE (AMIGO.amigo IS NULL || amigo.amigo!='.$_GET['usuario'].') 
    //         AND usuario.nombre LIKE "'.$_GET['usuarios'].'%"';
    // }

    if(isset($_GET['usuario'])){
        $consulta = 'SELECT usuario.idUsuario,usuario.nombre AS principal,amigo.id as idAmigo, amigo.nombre AS segundario, amigo.amigo
            from usuario INNER JOIN amigo ON amigo.amigo = usuario.idUsuario WHERE usuario.idUsuario='.$_GET['usuario'];
    }
    if(isset($_GET['usuarios'])){
        $consulta = 'SELECT * FROM `usuario`
        WHERE nombre LIKE "'.$_GET['usuarios'].'%"';
    }

    $consulta = $bd->getConnection()->prepare($consulta);
    $consulta->execute();

    $lista=[];

    while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
        $lista[] = $fila;
    }

    echo json_encode($lista);
}
?>