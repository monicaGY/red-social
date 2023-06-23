import { publicacionesDelUsuario } from "./p-publicaciones.js";
document.addEventListener('DOMContentLoaded',setup)

async function setup(){
    publicacionesDelUsuario()
    document.querySelector('#tDivBuscar').addEventListener('click',buscarUsuarios)
    document.querySelector("#tNavBuscar").addEventListener('click',buscarUsuarios)
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
    document.querySelector("#tInpBuscar").value= ''
    document.querySelector('#tDivPantallaBuscar').classList.add('d-none')
    document.querySelector('#tDivCabecera').classList.remove('d-none')
    document.querySelector('#tDivPublicaciones').classList.remove('d-none')
    const contenedorUsers = document.querySelector('#nDivUsuarios')

    while(contenedorUsers.hasChildNodes()){
        contenedorUsers.removeChild(contenedorUsers.firstChild)
    }

}
async function mostrarUsuarios(e){
    const contenedorUsers = document.querySelector('#nDivUsuarios')
    const nombre = e.target.value.trim()
    while(contenedorUsers.hasChildNodes()){
        contenedorUsers.removeChild(contenedorUsers.firstChild)
    }

    if(nombre === ''){
        return
    }

    const responseUsers = await fetch(`http://localhost/00_git/chat/rest.php?user=${nombre}`)    
    const listaUsuarios = await responseUsers.json()


    const respuestaAmigos = await fetch(`http://localhost/00_git/chat/rest.php?user=${usuario}&amigos`)
    const listaAmigos = await respuestaAmigos.json()
    
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
        nImg.setAttribute('id', `imgAñadirUser${user.idUsuario}`)
        


        nDivCaja.setAttribute('id',user.idUsuario)
        nDivCaja.setAttribute('data-nombre',user.nombre)
        
        nDivCaja.setAttribute('class','d-flex border p-2 gap-2 align-items-center')
        nDivNombre.innerHTML = user.nombre

        cambiarIconoAgregar(nDivCaja, user.idUsuario)

        const nImgAñadir = document.querySelector(`#iconAñadirUser${user.idUsuario}`)


        if(user.idUsuario == usuario){
            nImgAñadir.remove()          

        }
        listaAmigos.forEach(amigo => {

            if(user.idUsuario == amigo.idUsuario){
                nImgAñadir.remove()
                cambiarIconoEliminar(nDivCaja, user.idUsuario, usuario)
            }
            
        });

    });

}
function eliminarAmigo(e){
    const data = new FormData()
    const idAmigo = e.target.dataset.amigo
    const idUsuario = e.target.dataset.user


    data.append('idAmigo',idAmigo)
    data.append('idUserLogeado',idUsuario)

    fetch('../backend/eliminarAmigo.php',{
        method:'POST',
        body:data
    })
    .then(function(response){
        if(response.ok){
            
            return response.text()
        }
    })
    .then(function(){
        //  SI SE elimina AL USUARIO
        const nDivChatSelect = document.getElementById(idAmigo)
        const nImgEliminar = document.getElementById(`iconEliminarUser${idAmigo}`)
        nImgEliminar.remove()
        cambiarIconoAgregar(nDivChatSelect, idAmigo)
        publicacionesDelUsuario()
    })
}
function añadirAmigo(e){
    

    const data = new FormData()

    const datos = e.target.dataset

    const idAmigo = datos.id

    const nDiv = document.getElementById(idAmigo)

    const nombreAmigo = nDiv.dataset.nombre

    data.append('idAmigo',idAmigo)
    data.append('nombre', nombreAmigo)
    data.append('usuario',usuario)

    fetch('../backend/agregarAmigo.php',{
        method:'POST',
        body:data
    })
    .then(function(response){
        if(response.ok){
            
            return response.text()
        }
    })
    .then(function(){
        //  SI SE AGREGA AL USUARIO
        const nDivPadre = document.getElementById(idAmigo)
        const nImgAñadir = document.querySelector(`#iconAñadirUser${idAmigo}`)
        nImgAñadir.remove()
        cambiarIconoEliminar(nDivPadre, idAmigo, usuario)
        document.querySelector("#tDivInfAgregar").classList.toggle("d-none")
        
        setTimeout(() => {
            document.querySelector("#tDivInfAgregar").classList.toggle("d-none")

        }, 1500);
        publicacionesDelUsuario()

    })


}


function cambiarIconoAgregar(elemtPadre, id){
    const nImgAñadir = document.createElement('img')
    elemtPadre.appendChild(nImgAñadir)
    nImgAñadir.setAttribute('id',`iconAñadirUser${id}`)
    nImgAñadir.setAttribute('class',`imgAgregarUser`)
    nImgAñadir.setAttribute('height',30)
    nImgAñadir.setAttribute('src','../src/agregar-usuario.png')
    nImgAñadir.setAttribute('data-id', id)
    nImgAñadir.addEventListener('click', añadirAmigo)
    
}

function cambiarIconoEliminar(elemtPadre, id, user){
    const nImgEliminar = document.createElement('img')
    nImgEliminar.setAttribute('id',`iconEliminarUser${id}`)
    nImgEliminar.setAttribute('class','imgEliminar')
    nImgEliminar.setAttribute('data-amigo', id)
    if(user){
        nImgEliminar.setAttribute('data-user', user)
    }
    nImgEliminar.setAttribute('height',45)
    nImgEliminar.setAttribute('src','../src/borrar.png')
    elemtPadre.appendChild(nImgEliminar)
    nImgEliminar.addEventListener('click',eliminarAmigo)


}
