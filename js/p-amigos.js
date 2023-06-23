document.addEventListener('DOMContentLoaded', setup)

function setup(){
    listarAmigos()
}

async function listarAmigos(){
    const contenedor = document.querySelector('#tDivAmigos')

    const response = await fetch(`http://localhost/00_git/chat/rest.php?user=${usuario}&amigos`)
    const data = await response.json()


    data.forEach(user => {
        const nDivCaja = document.createElement('div')
        nDivCaja.setAttribute('id',user.idUsuario)
        nDivCaja.setAttribute('class','d-flex border-top p-2 align-items-center ')
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


        nDivCaja.addEventListener('click', e => {
            const idAmigo = e.target.closest('#tDivAmigos>div').id
            window.location = `p-mensajeria.php?amigo=${idAmigo}`


        })
    });
}