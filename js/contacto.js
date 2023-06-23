import { cambiarFormatoHora } from "./formatearDate.js";
import { cambiarFormatoFechaSinYear } from "./formatearDate.js";
import { meses } from "./formatearDate.js";
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
        contenedor.classList.toggle('d-none')
        construirCabecera(userAmigo)
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
                const response = await fetch(`http://localhost/00_git/chat/rest.php?user1=${usuario}&user2=${userAmigo}`)
                const data = await response.json()
                if(data.length == 1){
                    chatId = data[0].idChat

                }else{
                    chatId = await crearChat()

                }
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
    var fechaAnterior = null
    const response = await fetch(`http://localhost/00_git/chat/rest.php?idUsuario1=${userRegistrado}&idUsuario2=${userAmigo}`)
    const data = await response.json();
    const contenedor = document.querySelector('#contenedor-mensajes')

    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild)
    }
    
    data.forEach(element => {

        const fecha = cambiarFormatoFechaSinYear(element.fecha,meses)
        const nDivFecha = document.createElement('div')
        nDivFecha.setAttribute('data-fecha',fecha)
        nDivFecha.setAttribute('class','bg-light rounded-4 mx-auto fs-6 p-1 text-center bg-opacity-50')
        nDivFecha.setAttribute('style','width:110px')
        nDivFecha.innerHTML = fecha
        contenedor.appendChild(nDivFecha)

        if(fecha === fechaAnterior){
            nDivFecha.remove()
        }
        fechaAnterior = fecha

        const cajaMensaje = document.createElement('div')
        contenedor.appendChild(cajaMensaje)

        const mensaje = document.createElement('div')
        mensaje.setAttribute('class',' bg-light text-end rounded-3 p-2 m-2')
        const hora =cambiarFormatoHora(element.hora)
        mensaje.innerHTML = (`${element.contenido}
            <div class="fw-semibold opacity-75" style="font-size:small">${hora}</div>`)
        cajaMensaje.appendChild(mensaje)
        cajaMensaje.setAttribute('class','d-flex flex-row')
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


async function enviarMensajeBD(){
    const data = new FormData()

    const mensaje = document.querySelector("#tTxTareaMensaje").value.trim()

    if(chatId === null || chatId === "undefined"){
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
        await mostrarConversacion(usuario, userAmigo)
    } else {
        throw new Error("no se ha podido enviar el mensaje")
    }

    const nTxtMensaje = document.querySelector('#tTxTareaMensaje')
    nTxtMensaje.value = '';

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

