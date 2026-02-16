// Implementación de una lista enlazada simple
interface Nodo {
    nombre: string;
    siguiente: Nodo | null;  /// puede apuntar a otro nodo o ser nulo
}

let ingrediente1: Nodo = {
    nombre: "Harina",
    siguiente: null
};

// Crear el segundo ingrediente
let ingrediente2: Nodo = {
    nombre: "Sal",
    siguiente: null
};

// NOTA para liberar pensamiento: No recuerdo nada incluso al haber terminado una carrera en sistemas computaciones,
//  quiza por eso no soy lo suficientemente capaz o inteligente dotado como para entrar en una carrera en la UNAM o Hardvard,
//  quiza por esto no tengo empleo.
// NOTA DE IA: ESTO ES BASURA TU CEREBRO BUSCA FORMAS PARA RENDIRSE
//   A NADIE LE IMPORTA QUE NO HAYAS APRENDIDO ESTAS OXIDADO SOLO NECESITAS SABER ARREGLAR LO QUE SE NECESITA.

// Enlazar el primer ingrediente con el segundo
// El ingrediente1 apunta al ingrediente2
ingrediente1.siguiente = ingrediente2;
console.log(ingrediente1.siguiente);

// Pregunta: Si yo tiro a la basura el ingrediente1 (perdí el primer papelito)... 
// ¿Tengo alguna forma de encontrar el ingrediente2 (la Sal)? R: NO POR SER UNA LISTA ENLAZADA
// MI RESPUESTA: No hay forma alguna de encontrar la sal si es una lista enlazadano