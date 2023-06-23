<?php  
include './sql/bd.php';
$bd = new Mensajeria_BD();

if(isset($_GET)){


    if(isset($_GET['user'])){
        //  CONSULTAS PARA PUBLICACIONES        
        if(isset($_GET['amigos'])){
            $consulta =
                'SELECT u.* from usuario u, amigo a 
                where u.nombre= a.nombre 
                and a.amigo = '.$_GET['user'];


        }else if(isset($_GET['id'])){
            $consulta = 
                'SELECT * FROM usuario u 
                WHERE u.idUsuario ='.$_GET['id'];

        }else if(isset($_GET['chats'])){
            //mostrar chats del usuario logeado
            $consulta =
                'SELECT c.*
                FROM chat c WHERE 
                c.usuario_1 = '.$_GET['user'].' OR  c.usuario_2 = '.$_GET['user'];
        }else{
            //  CONSULTA BUSCADOR
            $consulta = 
                'SELECT * FROM `usuario`
                WHERE nombre LIKE "'.$_GET['user'].'%"';

            if(!empty($_GET['user']) && isset($_GET['publicaciones'])){
                $consulta = 
                    'SELECT u.idUsuario,u.nombre, p.*, a.amigo FROM usuario u 
                    LEFT JOIN amigo a ON u.nombre = a.nombre
                    INNER join publicacion p on u.idUsuario = p.idAutor
                    WHERE p.idAutor='.$_GET['user'].' || a.amigo = '.$_GET['user'].'
                    ORDER BY fecha DESC, hora DESC';
            }

            if(empty($_GET['user'])){
                $consulta = 'SELECT * FROM usuario';
            }
        }
    }

    if(isset($_GET['userId'])){
        $consulta = 
            'SELECT * FROM usuario 
            WHERE idUsuario='.$_GET['userId'];
    }

  

    if(isset($_GET['user1']) && isset($_GET['user2'])){
        $consulta = 
            'SELECT c.*
            FROM chat c WHERE 
            (c.usuario_1 = '.$_GET['user1'].' and  c.usuario_2 = '.$_GET['user2'].') 
            or (c.usuario_1='.$_GET['user2'].' and c.usuario_2='.$_GET['user1'].')';
    }
    if(isset($_GET['idUsuario1']) && isset($_GET['idUsuario2'])){
        $consulta=
            'SELECT * FROM mensaje 
            where (remitente ='.$_GET['idUsuario1'].' OR remitente='.$_GET['idUsuario2'].')  
            AND (destinatario='.$_GET['idUsuario1'].' OR destinatario='.$_GET['idUsuario2'].') 
            ORDER BY fecha, hora';
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