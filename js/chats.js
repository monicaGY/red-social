document.addEventListener('DOMContentLoaded',setup)

async function setup(){
    
    try{
        await recuperarChats(usuario)  

        // inicio - media queries MOVIL
        const codAmigo= new URLSearchParams(window.location.search).get('amigo');
        var codChat= new URLSearchParams(window.location.search).get('chat');


        if(!codAmigo){
            document.querySelector("#tDivInfAlert").classList.add('d-md-flex')
        }
    
        
        // SI LE HA DADO CLICK EN UN CHAT QUE MUESTRE EL CHAT
        if(codChat || codAmigo){
            document.querySelector('#tDivChats').classList.add('d-none')
            document.querySelector('#tDivChats').classList.add('d-sm-block')
        }
        // fin - media queries MOVIL
    }catch(error){
        console.log(error)
    }
    

    
    document.querySelector('#contenedor-chats').addEventListener('click', e => {
        const codAmigo = e.target.closest('#contenedor-chats>div').id
        const codChat = e.target.closest('#contenedor-chats>div').dataset.chat
        window.location=`../views/p-mensajeria.php?amigo=${codAmigo}&chat=${codChat}`
    })
}

async function recuperarChats(usuario){
    
    const responseChats = await fetch(`http://localhost/00_git/chat/rest.php?user=${usuario}&chats`)
    const data = await responseChats.json();

    data.forEach(async chat => {
        var codAmigo = null

        if(chat.usuario_1 != usuario){
            codAmigo = chat.usuario_1
        }
        if (codAmigo === null){
            codAmigo = chat.usuario_2
        }

        var responseUser = await fetch(`http://localhost/00_git/chat/rest.php?userId=${codAmigo}`)
        var dataUser = await responseUser.json()


        dataUser.forEach(user => {
            mostrarChats(user,chat)
        });

        
    });

    
}

function mostrarChats(user,chat){
    const contenedor = document.querySelector('#contenedor-chats')

    const nDivCaja = document.createElement('div')
    nDivCaja.setAttribute('id',user.idUsuario)
    nDivCaja.setAttribute('class','d-flex border-bottom border-opacity-10 border-dark p-2')
    contenedor.appendChild(nDivCaja);
    const nImg = document.createElement('img')
    nImg.setAttribute('src','../src/foto-perfil.png')
    nImg.setAttribute('height','50')
    nImg.setAttribute('class','p-2')
    nDivCaja.appendChild(nImg)
    const nDivNombre = document.createElement('div')
    
    nDivNombre.setAttribute('class','p-2 w-100')
    nDivNombre.innerHTML = user.nombre
    nDivCaja.appendChild(nDivNombre)
    nDivCaja.setAttribute('data-chat',chat.idChat)
    nDivCaja.setAttribute('data-nombre',user.nombre)
    
}