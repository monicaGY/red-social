import { cambiarFormatoFechaConYear } from "./formatearDate.js";
import { meses } from "./formatearDate.js";
export async function publicacionesDelUsuario(){
    const response = await fetch(`http://localhost/00_git/chat/rest.php?user=${usuario}&publicaciones`)

    const publicaciones =await response.json();

    const contenedor = document.querySelector('#tDivPublicaciones')
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild)
    }

    publicaciones.forEach(publicacion => {

        if(publicacion.amigo === usuario || publicacion.idUsuario === usuario){
            mostrarPublicaciones(publicacion)

        }
        

    });
    



}

async function mostrarPublicaciones(publicacion){

    const contenedor = document.querySelector('#tDivPublicaciones')

   
        const nPublicacion = document.createElement('div')
        const nBody = document.createElement('div')
        const nCabecera = document.createElement('div')
        const nUser = document.createElement('h5')
        const nHora = document.createElement('h6')
        const nTxt = document.createElement('p')
        const nFecha = document.createElement('h6')
        
        contenedor.appendChild(nPublicacion)
        nPublicacion.appendChild(nBody)
        nBody.appendChild(nCabecera)
        nCabecera.appendChild(nUser)
        nCabecera.appendChild(nHora)
        nBody.appendChild(nTxt)
        nBody.appendChild(nFecha)

        nPublicacion.setAttribute('class','card')
        nBody.setAttribute('class','card-body')
        nCabecera.setAttribute('class','d-flex')
        nUser.setAttribute('class','flex-grow-1 card-title')
        nHora.setAttribute('class','card-subtitle mb-2 text-muted')
        nTxt.setAttribute('class','card-text fs-5')
        nFecha.setAttribute('class','d-flex flex-row-reverse card-subtitle mb-2 text-muted')
        
        nUser.innerHTML = `@${publicacion.nombre}`        
        nHora.innerHTML = publicacion.hora.substr(0,5)        
        nTxt.innerHTML = publicacion.mensaje            
        nFecha.innerHTML = cambiarFormatoFechaConYear(publicacion.fecha,meses)
    

}