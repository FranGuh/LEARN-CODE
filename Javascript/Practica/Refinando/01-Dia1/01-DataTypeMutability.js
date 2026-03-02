const usuarioBD = { id: 1, nombre:"Hanna", rol:"user"};
// no se la sintaxis exacta pero usaria lo que en python es una copia de valores usuarioDB[:]
const usuarioActualizado = {...usuarioBD} // Shallow Copy

usuarioActualizado.rol = "admin";

console.log(usuarioBD.rol);

// Ejercicio Corto (Feynman Technique)
// Imagina el Stack (Pila) como un archivero físico donde guardas hojas de papel individuales.
// Imagina el Heap (Montículo) como un terreno inmenso donde construyes casas (Objetos, Arrays).

let puntaje = 10; 
// JS abre un cajón llamado 'puntaje' en el Stack y mete un papel que dice "10".

let nuevoPuntaje = puntaje; 
// JS va al cajón 'puntaje', saca una FOTOCOPIA del papel "10" y la mete en un cajón NUEVO llamado 'nuevoPuntaje'. ¡Son papeles distintos!

nuevoPuntaje = 20; 
// JS saca el papel de 'nuevoPuntaje', lo tira a la basura (reasignación) y mete un papel nuevo que dice "20". 
// El cajón 'puntaje' JAMÁS se enteró de esto. Su papel sigue diciendo "10".


const config = { tema: "oscuro" }; 
// JS construye una casa en el Heap. En el cajón 'config' del Stack, solo guarda la DIRECCIÓN (ej. Calle 123) de esa casa.

const nuevaConfig = config; 
// JS va al cajón 'config', fotocopia la DIRECCIÓN (Calle 123) y la guarda en 'nuevaConfig'. 
// Ahora tienes DOS cajones con llaves que abren la MISMA casa. Si uno entra y pinta la pared, el otro lo verá.

// Ejercicio corto
let a = "hola"; // en el stack en el cajon a introducimos el dato primitivo hola
let b = a; // sacamos fotocopia del cajon a e introducimos la copia en el cajon b
a = "adiós"; // reasignamos el contenido del cajon a por lo tanto el b no se entero al ser independientes en memoria por ser datos primitivos
console.log(b); // imprime hola

// reinforcement

const arreglo1 = [1, 2, 3]; // se asigna un objeto al heap no importa const por lo que podremos mutar el contenido
const arreglo2 = arreglo1; // se saca una copia de la referencia del arreglo1, es el mismo objeto
arreglo2.push(4); // modificamos arreglo 1 y 2 agregando 4 < Hicimos mutación en el objeto del heap

let string1 = "Junior"; // se asigna el valor al stack
let string2 = string1; // se hace fotocopia del stack string1 y se introduce en string2
string2 += " a Mid"; // Esto es igual a: string2 = string2 + " a Mid"
// se sumo el contenido al cajon (stack) string2 por lo que ahora es "Junior a Mid"
// < Hubo una reasignación en el Stack

console.log(arreglo1); // [1,2,3,4]
console.log(string1);// "Junior"

/*
Mutación (Arrays/Objetos): Cuando usas .push(4), no estás creando un array nuevo, estás mutando 
 (alterando internamente) el que ya existe en el Heap.
 Como arreglo1 y arreglo2 apuntan a la misma dirección, ambos "ven" la mutación.

Reasignación (Primitivos): Los Strings son inmutables.
 La operación string2 += " a Mid" no modifica la palabra "Junior". 
 Por debajo, JavaScript evalúa "Junior" + " a Mid",
 crea un nuevo valor en memoria que es "Junior a Mid",
 y hace una reasignación de la variable string2 para que apunte a ese nuevo valor.
*/