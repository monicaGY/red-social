import { mostrarPublicaciones } from "./p-publicaciones.js";
document.addEventListener('DOMContentLoaded',setup)

function setup(){
    mostrarPublicaciones()
    document.querySelector('#tDivBuscar').addEventListener('click',buscarUsuarios)
}

function buscarUsuarios(){
    abrirBuscador()
    document.querySelector('#tDivPublicaciones').classList.add('d-none')
    document.querySelector("#tInpBuscar").addEventListener('input', mostrarUsuarios)
    document.querySelector("#tInpBuscar").focus()
}

function abrirBuscador(){
    document.querySelector('#tDivPantallaBuscar').classList.remove('d-none')
    document.querySelector('#tDivCabecera').classList.add('d-none')


    document.querySelector('#tDivAtras').addEventListener('click',cerrarBuscador)
}

function cerrarBuscador(){
    document.querySelector('#tDivPantallaBuscar').classList.add('d-none')
    document.querySelector('#tDivCabecera').classList.remove('d-none')
    document.querySelector('#tDivPublicaciones').classList.remove('d-none')

}
async function mostrarUsuarios(e){
    const contenedorUsers = document.querySelector('#nDivUsuarios')
    const nombre = e.target.value
    while(contenedorUsers.hasChildNodes()){
        contenedorUsers.removeChild(contenedorUsers.firstChild)
    }

    if(!nombre){
        return
    }

    const response = await fetch(`http://localhost/00_git/chat/rest.php?usuarios=${nombre}`)    
    const listaUsuarios = await response.json()


    const respuesta = await fetch(`http://localhost/00_git/chat/rest.php?usuario=${usuario}`)
    const listaAmigos = await respuesta.json()
    
    listaUsuarios.forEach(user => {
        const nDivCaja = document.createElement('div')
        const nImg = document.createElement('img')
        const nDivNombre = document.createElement('div')
        const nDivImg = document.createElement('div')


        contenedorUsers.appendChild(nDivCaja)
        nDivCaja.appendChild(nDivImg)
        nDivImg.appendChild(nImg)
        nDivCaja.appendChild(nDivNombre)
        
        

        nDivNombre.setAttribute('class','flex-grow-1 ')
        nImg.setAttribute('src','../src/foto-perfil.png')
        nImg.setAttribute('height',50)
        


        nDivCaja.setAttribute('id',user.idUsuario)
        nDivCaja.setAttribute('class','d-flex border p-2 gap-2 align-items-center')
        nDivNombre.innerHTML = user.nombre

        
        const nImgAñadir = document.createElement('img')
        nDivCaja.appendChild(nImgAñadir)
        nImgAñadir.setAttribute('height',30)
        nImgAñadir.setAttribute('src','../src/agregar-usuario.png')
        nImgAñadir.setAttribute('data-id', user.idUsuario)
        nImgAñadir.setAttribute('data-nombre',user.nombre)
        nImgAñadir.addEventListener('click', añadirAmigo)

        if(user.idUsuario == usuario){
            nImgAñadir.remove()          

        }
        listaAmigos.forEach(amigo => {

            if(user.idUsuario == amigo.idAmigo){

                const nDiv = document.createElement('div')
                nDivCaja.appendChild(nDiv)
                nDiv.innerHTML = 'Agregado'
                nDiv.setAttribute('class','fs-5 fw-light border border-3 rounded-pill px-3')
                nImgAñadir.remove()          
            }
            
        });

    });

}

function añadirAmigo(e){
    

    const data = new FormData()

    const datos = e.target.dataset


    data.append('idAmigo',datos.id)
    data.append('nombre',datos.nombre)
    data.append('usuario',usuario)

    fetch('../backend/agregarAmigo.php',{
        method:'POST',
        body:data
    })
    .then(function(response){
        if(response.ok){

            cambiarIcono(e)

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

function cambiarIcono(e){
    const parentImg = document.getElementById(`${e.target.dataset.id}`)
    e.target.classList.add('d-none')

    const nDiv = document.createElement('div')
    parentImg.appendChild(nDiv)
    nDiv.innerHTML = 'Agregado'
    nDiv.setAttribute('class','fs-5 fw-light border border-3 rounded-pill px-3')

}