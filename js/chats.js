document.addEventListener('DOMContentLoaded',setup)

async function setup(){
    
    for (let index = 0; index < 8; index++) {
        await mostrarChats(usuario);
        
    }
    
}

async function mostrarChats(usuario){
    const contenedor = document.querySelector('.contenedor-chats')
    const response = await fetch(`http://localhost/00_git/chat/rest.php?user=${usuario}&amigos`)
    const data = await response.json();


    data.forEach(d => {
        const nDivCaja = document.createElement('div')
        nDivCaja.setAttribute('id',d.idUsuario)
        nDivCaja.setAttribute('class','d-flex border-bottom p-2')
        contenedor.appendChild(nDivCaja);

        const nImg = document.createElement('img')
        nImg.setAttribute('src','../src/foto-perfil.png')
        nImg.setAttribute('width','50')
        nImg.setAttribute('class','p-2')
        nDivCaja.appendChild(nImg)


        const nDivNombre = document.createElement('div')
        
        nDivNombre.setAttribute('class','p-2 w-100')
        nDivNombre.innerHTML = d.nombre
        nDivCaja.appendChild(nDivNombre)
        nDivCaja.setAttribute('data-chat',d.idChat)
        nDivCaja.setAttribute('data-nombre',d.nombre)

        nDivCaja.addEventListener('click',e=>{

            //parent node obtener el padre del elemento seleccionado
            //pero hay un limite
            let codAmigo = e.target.parentNode.id;
            let codChat = e.target.parentNode.dataset.chat
            let nomAmigo = e.target.parentNode.dataset.nombre
            if(!codAmigo){
                codAmigo = e.target.id
            }

            if(!codChat){
                codChat = e.target.dataset.chat
            }

            if(!nomAmigo){
                nomAmigo = e.target.dataset.nombre
            }

            window.location=`../views/p-mensajeria.php?amigo=${codAmigo}&chat=${codChat}`

        })
    });
}

