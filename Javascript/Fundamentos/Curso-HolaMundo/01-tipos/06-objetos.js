// los objetos son tipos de referencia.
// son una agrupación de datos que hacen sentido tenerlos juntos.
let nombre = 'Spiderman';
let edad = 24;
let mundo = 'Marvel';

let personaje = {
    nombre: 'Spiderman',  // par llave - valor
    edad: 24, // propiedad
    mundo:'Marvel', // no asegura el orden de las propiedades
} //objeto literal


console.log(personaje)
console.log(personaje.edad);

let llave = 'edad';
console.log(personaje[llave]);

personaje[llave] = 16;

delete personaje.anime;

console.log(personaje);

