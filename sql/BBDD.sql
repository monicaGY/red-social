CREATE TABLE usuario(
    idUsuario INT AUTO_INCREMENT PRIMARY KEY ,
    nombre VARCHAR(20) ,
    contraseña VARCHAR(20) NOT NULL
);

CREATE TABLE chat(
    idChat INT AUTO_INCREMENT PRIMARY KEY,
    usuario_1 int NOT NULL,
    usuario_2 int NOT NULL,
    FOREIGN KEY (usuario_1) REFERENCES usuario(idUsuario),
    FOREIGN KEY (usuario_2) REFERENCES usuario(idUsuario)
);


CREATE TABLE mensaje(
    id int AUTO_INCREMENT PRIMARY KEY,
    chat_id int NOT NULL,
	remitente INT NOT NULL,
    destinatario INT NOT NULL,
    contenido VARCHAR(5000),
    fecha date,
    hora time,
    
    FOREIGN KEY (chat_id) REFERENCES chat(idChat),
    FOREIGN KEY (remitente) REFERENCES usuario(idUsuario),
    FOREIGN KEY (destinatario) REFERENCES usuario(idUsuario)
    
    
)

CREATE TABLE amigo(
	id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    amigo INT NOT NULL,
    
    FOREIGN KEY (amigo) REFERENCES usuario(idUsuario)
);

CREATE TABLE publicacion(
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensaje VARCHAR(1000) NOT NULL,
    fecha date,
    hora time,
    idAutor INT NOT NULL,

    FOREIGN KEY (idAutor) REFERENCES usuario(idUsuario)

)