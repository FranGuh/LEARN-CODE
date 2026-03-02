const idURL = "5"; // Viene del frontend/URL
const idBD = 5;    // Viene de la base de datos

console.log(idURL == idBD); // true, == hace coerción de tipos antes de comparar, por lo tanto == al ser debil no estricto
// son iguales = true
console.log(idURL === idBD); // false, === no hace coerción de tipos como ==, por lo tanto tambien
// compara el tipo de dato por lo tanto es false
console.log(Object.is(idURL, idBD)); // uso profesional de === implementado en ES6 para comparar NaN y NaN , +0 y -0


// active recall

const edad = undefined;
const precio = NaN;

console.log(edad == null); // true
console.log(precio === NaN); // false
console.log(Object.is(precio, NaN)); // true

// Un Mid justifica sus decisiones. Si usas ===, es por predictibilidad y seguridad.
//  Si usas ==, es estrictamente para evaluar null y undefined simultáneamente.
//  Corrige tu forma de justificar y estarás del otro lado.

