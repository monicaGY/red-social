
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

    document.querySelector('#tBtnPublicar').addEventListener('click', publicarEstado)
}


function modificarTextTarea(){
    const nTxtPublicar = document.querySelector('#tTxTareaPublicar')
    nTxtPublicar.style.resize = "none"
    nTxtPublicar.style.height = "10px"
    nTxtPublicar.addEventListener('input', e => {
        e.target.style.height = (e.target.scrollHeight) + "px";
        
    })
}

function publicarEstado(){
    const mensaje = document.querySelector('#tTxTareaPublicar').value

    const elemento = document.querySelector('#tDivInfPublicar')
    mensajeInformativo(elemento)
}

function mensajeInformativo(elemento){
    const ventana = document.querySelector('#tDivVentana')
    const nTxtPublicar = document.querySelector('#tTxTareaPublicar')

    nTxtPublicar.value=""
    elemento.classList.remove('d-none')
    setTimeout(() => {
        ventana.classList.add('d-none')
        elemento.classList.add('d-none')

    }, 1500);
}