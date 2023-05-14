document.addEventListener('DOMContentLoaded',setup)
let chatId= new URLSearchParams(window.location.search).get('chat');
let userAmigo = new URLSearchParams(window.location.search).get('amigo')
const botonEnviar = document.querySelector('#tBtnEnviar')

async function setup(){

    modificarTxtArea()

    if(userAmigo == null){
        const contenedorAlert = document.querySelector('#tDivAlert')
        contenedorAlert.classList.toggle('d-none')
    }else{
        const contenedor = document.querySelector('#ventanaChat')
        contenedor.classList.toggle('d-sm-flex')
        await mostrarConversacion(usuario, userAmigo)
    }

    document.querySelector('#tTxTareaMensaje').addEventListener('keydown', e => {
        const txt = e.target.value.trim()
        if(txt != ''){
            botonEnviar.classList.remove('d-none')
        }else{
            botonEnviar.classList.add('d-none')
        }
    })
    
    botonEnviar.addEventListener('click', async e => {
        try{
            if(chatId === null || chatId === undefined){
                chatId = await crearChat()
            }  
            await enviarMensajeBD()
        }catch(e){
            document.querySelector('#tDivPublicaciones').classList.toggle('d-none')
            document.querySelector('#tDivAlert').innerHTML= `ERROR: ${e.message}`
            document.querySelector('#contenedor-mensajes').scrollTop = document.querySelector('#contenedor-mensajes').scrollHeight

        }
    })  
}

function modificarTxtArea(){
    const element = document.querySelector('#tTxTareaMensaje')
    element.style.resize = "none"
    element.style.height = "10px"
    element.addEventListener('input', e => {

        if(e.target.scrollHeight<=200){
            e.target.style.height = (e.target.scrollHeight) + "px";
            const contenedor = document.querySelector('#contenedor-mensajes')
            contenedor.scrollTop = contenedor.scrollHeight
        }
    })
}
async function mostrarConversacion(userRegistrado,userAmigo){

    const response = await fetch(`http://localhost/00_git/chat/rest.php?idUsuario1=${userRegistrado}&idUsuario2=${userAmigo}`)
    const data = await response.json();
    const contenedor = document.querySelector('#contenedor-mensajes')

    construirCabecera(userAmigo)
    data.forEach(element => {
        const cajaMensaje = document.createElement('div')
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
    
    //solo aparece en dispositivos moviles
    document.querySelector('#regresar-atras').addEventListener('click', e => {
        window.location = 'p-mensajeria.php';
    })
}

function mostrarMensaje(){
    const nTxtMensaje = document.querySelector('#tTxTareaMensaje')
    const contenedor = document.querySelector('#contenedor-mensajes')

    const cajaMensaje = document.createElement('div')
    contenedor.appendChild(cajaMensaje)

    const mensaje = document.createElement('div')
    mensaje.setAttribute('class','d-inline-flex bg-light rounded-3 p-2 m-2')
    mensaje.innerHTML = nTxtMensaje.value
    cajaMensaje.appendChild(mensaje)
    cajaMensaje.setAttribute('class','d-flex flex-row-reverse')
    nTxtMensaje.value = '';
    contenedor.scrollTop = contenedor.scrollHeight
    document.querySelector('#tBtnEnviar').classList.add('d-none')
}

async function enviarMensajeBD(){
    const data = new FormData()

    const mensaje = document.querySelector("#tTxTareaMensaje").value.trim()

    if(chatId === null || chatId === undefined){
        throw new Error('no se ha podido crear el chat con el usuario')
    }
    
    if(mensaje === ""){
        throw new Error("no puedes enviar mensajes vacíos")
    }
    data.append('mensaje',mensaje)
    data.append('chat',chatId)
    data.append('remitente',usuario)
    data.append('destinatario',userAmigo)

    const response = await fetch('../backend/insertarMensaje.php', {
        method: 'POST',
        body: data
    })

    if (response.ok) {
        mostrarMensaje()
        // return response.text()
    } else {
        throw new Error("no se ha podido enviar el mensaje")
    }

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

async function crearChat(){
    const data = new FormData()

    data.append('remitente',usuario)
    data.append('destinatario',userAmigo)

    const response = await fetch('../backend/crearChat.php', {
        method: 'POST',
        body: data
    })

    if(response.ok) {
        const datos = await response.json();

        if(datos.resultado === "correcto"){
            chatId = datos.chat
            return chatId
        }else{
            throw new Exception("2 no se ha creado el chat")
        }
    }

}

