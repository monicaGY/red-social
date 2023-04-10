import { mostrarPublicaciones } from "./p-publicaciones.js";

document.addEventListener('DOMContentLoaded',setup)


function setup(){
    modificarTextTarea()

    document.querySelector('#tImgPublicar').addEventListener('click', e => {
        const nTxtPublicar = document.querySelector('#tTxTareaPublicar')
        const ventana = document.querySelector('#tDivVentana')
        ventana.classList.remove('d-none')
        nTxtPublicar.focus()
        nTxtPublicar.style.height = "10px"


    })


   document.querySelector('#tBtnCancelar').addEventListener('click', e => {
        const elemento = document.querySelector('#tDivInfCancelar')
        mensajeInformativo(elemento)
    })

    document.querySelector('#tBtnPublicar').addEventListener('click', publicarEstadoBD)
}


function modificarTextTarea(){
    const nTxtPublicar = document.querySelector('#tTxTareaPublicar')
    nTxtPublicar.style.resize = "none"
    nTxtPublicar.style.height = "10px"
    nTxtPublicar.addEventListener('input', e => {
        e.target.style.height = (e.target.scrollHeight) + "px";
        
    })
}

function publicarEstadoBD(){
    var elemento = null

    try{
        const mensaje = document.querySelector('#tTxTareaPublicar').value    
        if(mensaje.trim() === ''){
            throw 'vacio'
        }

        enviarEstadoBD(mensaje)
        elemento = document.querySelector('#tDivInfPublicar')

        
    }catch(e){
        if(e === 'vacio'){
            elemento = document.querySelector('#tDivInfAvisar')

        }      
    }finally{
        mensajeInformativo(elemento)
    }
}

function mensajeInformativo(elemento){
    const ventana = document.querySelector('#tDivVentana')
    const nTxtPublicar = document.querySelector('#tTxTareaPublicar')

    nTxtPublicar.value=""
    elemento.classList.remove('d-none')
    setTimeout(() => {
        if(elemento.id != 'tDivInfAvisar'){
            ventana.classList.add('d-none')
        }
        elemento.classList.add('d-none')

    }, 1500);

    nTxtPublicar.focus()
}

function enviarEstadoBD(estado){
    const data = new FormData()
    data.append('estado',estado)
    data.append('autor',usuario)   

    fetch('../backend/publicarEstado.php',{
        method:'POST',
        body:data
    })
    .then(function(response){
        if(response.ok){
            return response.text()
        }
    })
    .then(function(text){
        mostrarPublicaciones()
    })
     .catch(function(error){
         console.log(error);
    })
}