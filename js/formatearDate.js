
export const meses = new Array()
    meses["01"]="Enero"
    meses["02"]="Febrero"
    meses["03"]="Marzo"
    meses["04"]="Abril"
    meses["05"]="Mayo"
    meses["06"]="Junio"
    meses["07"]="Julio"
    meses["08"]="Agosto"
    meses["09"]="Septiembre"
    meses["10"]="Octubre"
    meses["11"]="Noviembre"
    meses["12"]="Diciembre"


export function cambiarFormatoFechaSinYear(fecha,meses){

    const fechaSeparada = fecha.split("-")
    
    for (const mes in meses) {
        if(fechaSeparada[1] === mes){
            fechaSeparada[1] = meses[mes]
        }
    }
    return `${fechaSeparada[2]} de ${fechaSeparada[1]}`
}

export function cambiarFormatoFechaConYear(fecha,meses){

    const fechaSeparada = fecha.split("-")
    
    for (const mes in meses) {
        if(fechaSeparada[1] === mes){
            fechaSeparada[1] = meses[mes]
        }
    }
    return `${fechaSeparada[2]} de ${fechaSeparada[1]} ${fechaSeparada[0]}`
}


export function cambiarFormatoHora(hora){
    const horaSeparada = hora.split(":")

    return `${horaSeparada[0]}:${horaSeparada[1]}`
}