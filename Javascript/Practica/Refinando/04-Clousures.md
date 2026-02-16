# Clousures en JS
Los Closures son el concepto número uno que separa a un Junior de un Mid. Un Junior usa React sin saber cómo funciona; un Mid sabe que los Hooks de React (como useState y useEffect) **funcionan enteramente gracias a los Closures por debajo.** 

Si en una entrevista explicas que *la variable no se destruye por el Recolector de Basura y persiste en la memoria de la función hija*, tienes la oferta asegurada.

Olvídate de las pasadas por un momento. Concéntrate en qué está devolviendo la función.

JavaScript
```javascript
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
```
#### El superpoder del Closure:
Cuando la función padre termina de ejecutarse, normalmente sus variables locales (como items) serían destruidas por el Recolector de Basura (Garbage Collector).

Sin embargo, como devolviste una función hija que usa esa variable, JavaScript dice: *"Espera, la hija aún necesita a items. No lo destruyas"*.

La función hija agarra todas las variables que necesita de su padre, las mete en una "mochila invisible" (Closure), y se las lleva consigo.

JavaScript
```javascript
// 2. Ahora agregarAlCarrito es LITERALMENTE la función hija con su mochila.
console.log(agregarAlCarrito()); 
// Abre la mochila, suma 1 a items. Devuelve 1.
console.log(agregarAlCarrito()); 
// Vuelve a abrir la MISMA mochila. Como items era 1, ahora es 2. Devuelve 2.

// 3. Aquí ejecutamos la función PADRE OTRA VEZ.
// Se crea un contexto TOTALMENTE NUEVO. Una nueva variable items = 0 y una NUEVA función hija.
const otroCarrito = crearContadorCarrito();

console.log(otroCarrito()); 
// Esta es otra función hija con su PROPIA mochila independiente. Suma 1 a su propio 0. Devuelve 1.
```
##### Definición de Entrevista (Memoriza y entiende esto):
> "Un Closure es la capacidad de una función para recordar y acceder a las variables de su entorno léxico (el scope donde fue creada), incluso después de que la función exterior haya terminado de ejecutarse."

