const cancion = {
    titulo: "Ecoes de medianoche",
    estrofas: 4,
    mostrarTitulo: () => {
        console.log("Reproduciendo: "+this.titulo);
    }
};

cancion.mostrarTitulo();

// primera pasada
//  mete cancion en la TDZ

// segunda pasada
//  saca cancion de la tdz y le asigna los valores.
//  accede a mostrarTitulo como funcion entonces imprime Reproduciendo: Ecoes de medianoche 

// Caso 2

const nuevaCancion = cancion; // no copiamos la variable copiamos su direccion.
cancion = null; // se borra cancion y nuevaCancion.

nuevaCancion.mostrarTitulo();// ¡Boom! Tu código explota. por que accede a un objeto cuya referencia no existe

// La regla de oro para los métodos en objetos es usar funciones tradicionales, no flechas.

const cancion2 = {
    titulo: "Ecoes de medianoche",
    mostrarTitulo: function() {
        // mostrarTitulo()
        console.log("Reproduciendo: " + this.titulo);
    }
}

// Sabiendo que la función de flecha (=>) 
// es "transparente" y deja escapar al this
// hacia afuera... 
// ¿Cómo describirías con tus propias 
// palabras lo que hace la función 
// tradicional (function() {}) 
// con el this en este caso? 
// ¿Por qué esta sí funciona 
// y no se rompe si renombramos 
// el objeto?

// Caso 3

const cancion3 = {
    titulo: "Ecoes de medianoche",
    mostrarTitulo: function() {
        console.log("Reproduciendo: " + this.titulo);
    }
};

const reproducir = cancion.mostrarTitulo;

reproducir();

