
document.addEventListener('DOMContentLoaded',setup)


function setup(){
    const ventana = document.querySelector('#tDivVentana')
    const nTxtPublicar = document.querySelector('#tTxTareaPublicar')
    modificarTextTarea(nTxtPublicar)


    document.querySelector('#tImgPublicar').addEventListener('click', e => {
        ventana.classList.remove('d-none')
        nTxtPublicar.focus()
        nTxtPublicar.style.height = "10px"


    })


   document.querySelector('#tBtnCancelar').addEventListener('click', e => {
        ventana.classList.add('d-none')
        nTxtPublicar.value=""
    })

    document.querySelector('#tBtnPublicar').addEventListener('click', publicarEstado)
}


function modificarTextTarea(element){
    element.style.resize = "none"
    element.style.height = "10px"
    element.addEventListener('input', e => {
        e.target.style.height = (e.target.scrollHeight) + "px";
        
    })
}

function publicarEstado(){

}