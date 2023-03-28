document.addEventListener('DOMContentLoaded',setup)
//FAKLTA CONSEGUIR EL ID DEL CHAT
let chatId= new URLSearchParams(window.location.search).get('chat');
let userAmigo = new URLSearchParams(window.location.search).get('amigo')

async function setup(){
    
        
    document.querySelector('#tInpEnviar').addEventListener('click',enviarMensajeBD)
    await mostrarConversacion(usuario, userAmigo)
    document.querySelector('#regresar-atras').addEventListener('click', e => {
        window.location = 'chats.php';
    })
        
}


// function scrollUltimoMensaje(){

// }
async function mostrarConversacion(userRegistrado,userAmigo){

    const response = await fetch(`http://localhost/00_git/chat/rest.php?idUsuario1=${userRegistrado}&idUsuario2=${userAmigo}`)
    const data = await response.json();
    const contenedor = document.querySelector('#contenedor-mensajes')

    construirCabecera(userAmigo)
    data.forEach(element => {
        const cajaMensaje = document.createElement('div')
        // cajaMensaje.setAttribute('class','d-flex')
        contenedor.appendChild(cajaMensaje)


        const mensaje = document.createElement('div')
        mensaje.setAttribute('class','d-inline-flex bg-light rounded-3 p-2 m-2')
        mensaje.innerHTML = element.contenido
        cajaMensaje.appendChild(mensaje)
        if(element.remitente === parseInt(userRegistrado)){
            cajaMensaje.setAttribute('class','d-flex flex-row-reverse')
        }
    });
    
    document.querySelector('#contenedor-mensajes').scrollTop = document.querySelector('#contenedor-mensajes').scrollHeight

}

function mostrarMensaje(){
    const nInpMensaje = document.querySelector('#tInpMensaje')
    const contenedor = document.querySelector('#contenedor-mensajes')

    const cajaMensaje = document.createElement('div')
    contenedor.appendChild(cajaMensaje)

    const mensaje = document.createElement('div')
    mensaje.setAttribute('class','d-inline-flex bg-light rounded-3 p-2 m-2')
    mensaje.innerHTML = nInpMensaje.value
    cajaMensaje.appendChild(mensaje)
    cajaMensaje.setAttribute('class','d-flex flex-row-reverse')


    nInpMensaje.value = '';
    contenedor.scrollTop = contenedor.scrollHeight

}

function enviarMensajeBD(){
    const data = new FormData()

    const mensaje = document.querySelector("#tInpMensaje").value

    data.append('mensaje',mensaje)
    data.append('chat',chatId)
    data.append('remitente',usuario)
    data.append('destinatario',userAmigo)

    fetch('../backend/insertarMensaje.php',{
        method:'POST',
        body:data
    })
    .then(function(response){
        if(response.ok){
            mostrarMensaje()
            return response.text()
        }
    })
    // .then(function(text){
    //     //imprime el mensaje de php
    //     console.log(text)
    // })
    // .catch(function(error){
    //     console.log(error);
    // })

}

function construirCabecera(id){
    const data = new FormData()


    data.append('idAmigo',id)

    fetch('../backend/devolverAmigo.php',{
        method:'POST',
        body:data
    })
    .then(function(response){
        if(response.ok){
            
            return response.text()
        }
    })
    .then(function(text){
        //imprime el mensaje de php
        const cabecera = document.querySelector("#header-contacto")
        const nDivNombre = document.createElement('div')
        cabecera.appendChild(nDivNombre)
        nDivNombre.innerHTML = text
    })
    .catch(function(error){
        console.log(error);
    })

}