Resoluciones = [{
    nombre: '8k',
    ancho: 7680,
    alto: 4320
},
{
    nombre: '4k',
    ancho: 3840,
    alto: 2160 
},
{
    nombre: 'WQHD',
    ancho: 2560,
    alto: 1440 
},
{
    nombre: 'FHD',
    ancho: 1920,
    alto: 1080 
},
{
    nombre: 'HD',
    ancho: 1280,
    alto: 720 
},]

function nombreResolucion(ancho, alto){
    if(ancho >= Resoluciones[0].ancho && alto >= Resoluciones[0].alto){
        return Resoluciones[0].nombre;
    } else if (ancho >= Resoluciones[1].ancho && alto >= Resoluciones[1].alto) {
        return Resoluciones[1].nombre;
    } else if (ancho >= Resoluciones[2].ancho && alto >= Resoluciones[2].alto) {
        return Resoluciones[2].nombre;
    } else if (ancho >= Resoluciones[3].ancho && alto >= Resoluciones[3].alto) {
        return Resoluciones[3].nombre;
    } else if (ancho >= Resoluciones[4].ancho && alto >= Resoluciones[4].alto) {
        return Resoluciones[4].nombre;
    } else {
        return false;
    }
}

let nombre = nombreResolucion(3840, 2768);
console.log(nombre);