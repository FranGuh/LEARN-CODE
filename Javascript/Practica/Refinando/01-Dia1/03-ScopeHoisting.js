// hoisting (elevacion) dicta orden de ejecución.
// Scope const and let = TDZ - Temporal Dead Zone
console.log(nombre); // sincrono , undefined por el scope de var
var nombre = "Hanna"; 

console.log(edad); // sincrono, por el scope de let da error e interrumpe la ejecución.
let edad = 24;

saludar(); // funciona imprime hola
function saludar() {
  console.log("Hola"); // sincrono, funcion normal
}

despedirse(); // error ReferenceError
const despedirse = () => { // primera pasada se define como const la TDZ se guarda la asignación 'la funcion' para la segunda pasada
  console.log("Adiós"); // sincrono, funcion flecha por ES6, heredan el contexto anterior (Lexical Scope)
}

// ejercicio corto

iniciarNave(); // segunda pasada, ejecuta la función guardada en la primera pasada.

var piloto = "Hanna"; // primera pasada, guarda var con el valor de default
const nave = { nombre: "Apolo" }; // primera pasada, guarda nave en la TDZ

function iniciarNave() { // primera pasada guarda la función
  console.log(piloto); // segunda pasada, ejecuta.
  nave.nombre = "Apolo 11"; // se llamo la ejecucion en la segunda pasada el objeto
}

console.log(nave.nombre); 

// primera pasada
    //var piloto = undefined
    // guardo const nave en la TDZ
    // guardo iniciarNave()

// segunda pasada ejecucion.
    // ejecuto inciarNave()
        // imprimo piloto = undefined
        // asigno al objeto nave (esta en la TDZ) 
        // lanza ReferenceError se detiene el programa


// ¿Qué imprime exactamente el console.log(piloto) dentro de la función y por qué?
// R= imprime undefined

// ¿Qué imprime el console.log(nave.nombre) al final del archivo y por qué funcionó si nave es un const?
// R= Reference Error por tocar tratar de asignar algo a un objeto en esta en la TDZ