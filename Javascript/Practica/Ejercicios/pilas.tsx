class NodoAccion {
    // se definen tipos
    accion: any;
    abajo: NodoAccion | null; // puede apuntar a otro nodo o ser nulo
    // se crea el constructor de la clase
    constructor(accion: any, abajo: NodoAccion | null = null){
        // se hacen las asignaciones
        this.accion = accion;
        this.abajo = abajo;
    }
}

let cima: NodoAccion | null = null; // referencia a la cima de la pila

function agregarAccion(nombreAccion: any) {
    // estba agregando datos pero sin conectarlos
    // NOTA: al crear un nodo se dbe esperar a recibir un constructor de quien esta abajo.
    // se crea la nueva clase NodoAccion con cima como referencia
    let nuevoNodo = new NodoAccion(nombreAccion, cima);
    // cima = cima // no hace nada
    // se actualiza la referencia de cima a el nuevo nodo
    cima = nuevoNodo;
    // se retorna el nuevo nodo
    return nuevoNodo;
}

function deshacerAccion() {
    // se verifica si la pila esta vacia
    if (cima === null) {return console.log("No hay acciones para deshacer"); }
    // se muestra la accion que se esta deshaciendo
    console.log("Deshaciendo accion: " + cima.accion);
    // se actualiza la referencia de cima a el nodo que esta abajo
    cima = cima.abajo;

}

// Ejemplo de uso
agregarAccion("Amasar");
agregarAccion("Fermentar");
deshacerAccion();
deshacerAccion();
deshacerAccion();