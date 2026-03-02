function crearContadorCarrito() {
  let items = 0; // Se crea una vez por cada invocación a crearContadorCarrito

  return function() { // Esta es la función hija
    items++;
    return items;
  };
}

// 1. Aquí ejecutamos la función PADRE.
// items nace valiendo 0. 
// La función NO devuelve un número, devuelve la FUNCIÓN HIJA.
const agregarAlCarrito = crearContadorCarrito();
const otroCarrito = crearContadorCarrito();

console.log(agregarAlCarrito()); 
console.log(agregarAlCarrito()); 
console.log(otroCarrito());

// primera pasada
    // se guarda en el heap crearContadorCarrito()
    // se guarda en el TDZ agregarAlCarrito
    // se guarda en el TDZ otroCarrito

// segunda pasada
    // se saca del TDZ agregarAlCarrito y se le asigna la funcion crearContadorCarrito()
    // se saca del TDZ otroCarrito y se le asigna la funcion crearContadorCarrito()
    // se ejecuta crearContadorCarrito():
        // se define let items = 0 dentro de el clousure de la funcion
        // se retorna la funcion y se suma item + 1 se retorna items con el valor de = 1
    // imprimio items = 1
    // se ejecuta crearContadorCarrito():
        // se define let items = 0 dentro de el clousure de la funcion
        // se retorna la funcion y se suma item + 1 se retorna items con el valor de = 1
    // imprimio items = 1
    // se ejecuta crearContadorCarrito():
        // se define let items = 0 dentro de el clousure de la funcion
        // se retorna la funcion y se suma item + 1 se retorna items con el valor de = 1
    // imprimio items = 1


//4️⃣ Ejercicio Corto (Active Recall) - Para cuando despiertes
//Demuéstrame que entendiste el concepto de la "mochila" (Closure) y el Recolector de Basura. Analiza este código:

//JavaScript
function banco() {
  let saldo = 100;

  return {
    depositar: function(cantidad) {
      saldo += cantidad;
      return saldo;
    },
    retirar: function(cantidad) {
      saldo -= cantidad;
      return saldo;
    }
  };
}

const miCuenta = banco();

console.log(miCuenta.saldo); // 1. ¿Qué imprime esto y por qué?
console.log(miCuenta.depositar(50)); // 2. ¿Qué imprime esto?
console.log(miCuenta.retirar(20)); // 3. ¿Qué imprime esto?
// Tu tarea al volver: Contesta qué imprimen exactamente esas 3 líneas.
//  Usa la palabra "Closure" en tu justificación para el primer console.log. ¡Te leo cuando regreses!