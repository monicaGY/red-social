document.querySelector('#tDivBtnsLogin').addEventListener('click', async e => {
    if (e.target.tagName === 'INPUT') {
        const accion = e.target.value;
        await comprobarLogin(accion)
    }
})

async function comprobarLogin(accion) {
    const formData = new FormData()
    const usuarioInp = document.querySelector('#tInpNombre').value.trim()
    const contraseñaInp = document.querySelector('#tInpContraseña').value.trim()
    formData.append('accion', accion)
    formData.append('usuario', usuarioInp)
    formData.append('password', contraseñaInp)

    const response = await fetch('http://localhost/00_git/chat/backend/authentication.php', {
        method: 'POST',
        body: formData
    })

        const data = await response.json()
        const respuesta = data.respuesta

        if (respuesta === 'aceptada') {
            const url = `http://localhost/00_git/chat/views/p-principal.php`;
            window.location = url;
        } else {

            const mensaje = respuesta
            mensajeAlert(mensaje)
        }

}


function mensajeAlert(mensaje) {
    document.querySelector('#tDivInfAvisar').classList.toggle('d-none')
    document.querySelector('#tDivInf').innerHTML = mensaje
    setTimeout(() => {
        document.querySelector('#tDivInfAvisar').classList.toggle('d-none')

    }, 3000);

}