document.addEventListener('DOMContentLoaded',setup)

async function setup(){
    
    await mostrarChats(usuario)  

    
    document.querySelector('#contenedor-chats').addEventListener('click', e => {
        const codAmigo = e.target.closest('#contenedor-chats>div').id
        const codChat = e.target.closest('#contenedor-chats>div').dataset.chat
        window.location=`../views/p-mensajeria.php?amigo=${codAmigo}&chat=${codChat}`
    })
}

async function mostrarChats(usuario){
    const contenedor = document.querySelector('#contenedor-chats')
    const response = await fetch(`http://localhost/00_git/chat/rest.php?user=${usuario}&amigos`)
    const data = await response.json();


    data.forEach(d => {
        const nDivCaja = document.createElement('div')
        nDivCaja.setAttribute('id',d.idUsuario)
        nDivCaja.setAttribute('class','d-flex border-bottom border-opacity-10 border-dark p-2')
        contenedor.appendChild(nDivCaja);

        const nImg = document.createElement('img')
        nImg.setAttribute('src','../src/foto-perfil.png')
        nImg.setAttribute('height','50')
        nImg.setAttribute('class','p-2')
        nDivCaja.appendChild(nImg)


        const nDivNombre = document.createElement('div')
        
        nDivNombre.setAttribute('class','p-2 w-100')
        nDivNombre.innerHTML = d.nombre
        nDivCaja.appendChild(nDivNombre)
        nDivCaja.setAttribute('data-chat',d.idChat)
        nDivCaja.setAttribute('data-nombre',d.nombre)
        
    });

    
}

