class NodoCliente{
    nombre:any;
    siguiente:any;
    constructor(nombre:any){
        this.nombre = nombre;
        this.siguiente = null;
    }
}

let frente:any=null;
let final:any=null;

function encolar(nombre:any){
    // ¿A quién movemos cuando llega alguien nuevo?
    // ¿Cómo conectamos al nuevo con el que antes era el último?// ¿Quién sale de la fila?
    let nuevoCliente = new NodoCliente(nombre);
    if(frente === null){
        frente = nuevoCliente;
        final = nuevoCliente;
    } else {
        final.siguiente = nuevoCliente;
        final = nuevoCliente;
    }
    return nuevoCliente;
}

function desacoplar(){
    // ¿A dónde se mueve el puntero 'frente'?
    if (frente === null) return null;
    let nombreSale = frente.nombre;
    frente = frente.siguiente;
    if (frente === null){ final = null}
    console.log(`Atendiendo a: ${nombreSale}`);
    return nombreSale;
}

encolar("Alberto");
encolar("Bianca");
encolar("Carlos");

desacoplar();
desacoplar();

// Si hubieras usado un Array normal y la función .shift() (quitar el primero),
//  la computadora tendría que mover a Bianca y a Carlos un paso hacia adelante para llenar el hueco vacío. 
// Eso cuesta energía ($O(n)$).
// Con tu código de Nodos, solo moviste un puntero.
//  El resto de la fila ni se enteró. El costo fue instantáneo ($O(1)$). 
// Eso es eficiencia de F1.

