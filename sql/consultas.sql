-- obtener (ID) los amigos de un usuario
SELECT amigo.id FROM usuario INNER JOIN amigo
on usuario.idUsuario = amigo.amigo
where usuario.idUsuario =2;

-- aparecen las publicaciones de sus amigos a excepción del usuario registrado

SELECT * FROM usuario INNER JOIN amigo
on usuario.idUsuario = amigo.amigo
INNER JOIN publicacion
ON amigo.id = publicacion.idAutor
where usuario.idUsuario =2;

-- aparecen las publicaciones de sus amigos incluido el usuario registrado
SELECT publicacion.* FROM usuario INNER JOIN amigo
on usuario.idUsuario = amigo.amigo
INNER JOIN publicacion
ON amigo.id = publicacion.idAutor
where usuario.idUsuario =2
UNION
SELECT publicacion.* FROM publicacion
where idAutor =2
ORDER BY fecha, hora;