/*
Clase 18 - Ejercicios: primeros pasos
Vídeo: https://youtu.be/1glVfFxj8a4?t=4733
*/

// 1. Escribe un comentario en una línea
// Hola

// 2. Escribe un comentario en varias líneas
/* JAJAJA
        AQUI SIGUE
    */

// 3. Declara variables con valores asociados a todos los datos de tipo primitivos
let miNombre = "Gustavo Fran";
let miEdad = 24;
let mySymbol = Symbol("gust");
let valorNulo = null;
let valorSinNada;
let numeroPiInventado =
  322221422222222222222223333333344444444444444444445455555555567222222n;
let soyCarpintero = false;

// 4. Imprime por consola el valor de todas las variables
console.log(" Imprime por consola el valor de todas las variables");
console.log(miNombre);
console.log(miEdad);
console.log(mySymbol);
console.log(valorNulo);
console.log(valorSinNada);
console.log(numeroPiInventado);
console.log(soyCarpintero);

// 5. Imprime por consola el tipo de todas las variables
console.log("Imprime por consola el tipo de todas las variables");
console.log(typeof miNombre);
console.log(typeof miEdad);
console.log(typeof mySymbol);
console.log(typeof valorNulo);
console.log(typeof valorSinNada);
console.log(typeof numeroPiInventado);
console.log(typeof soyCarpintero);

// 6. A continuación, modifica los valores de las variables por otros del mismo tipo
console.log(
  "A continuación, modifica los valores de las variables por otros del mismo tipo",
);
miNombre = "francisco";
miEdad = 0;
mySymbol = Symbol("p21");
valorNulo = null;
valorSinNada = undefined;
numeroPiInventado =
  30000000000000000000000000000000000000000000000000000000000000000000n;
soyCarpintero = true;

// 7. A continuación, modifica los valores de las variables por otros de distinto tipo
console.log(
  "A continuación, modifica los valores de las variables por otros tipo",
);
miNombre = 11;
miEdad = "24";
mySymbol = "p21";
valorNulo = 11;
valorSinNada = true;
numeroPiInventado = 3.14;
soyCarpintero = "false";

// 8. Declara constantes con valores asociados a todos los tipos de datos primitivos
const miNombre1 = "Gustavo Fran";
const miEdad1 = 24;
const mySymbol1 = Symbol("gust");
const valorNulo1 = null;
const valorSinNada1 = valorSinNada;
const numeroPiInventado1 =
  322221422222222222222223333333344444444444444444445455555555567222222n;
const soyCarpintero1 = false;

// 9. A continuación, modifica los valores de las constantes
try {
  miNombre1 = "Gustavo Fran";
  miEdad1 = 24;
  mySymbol1 = Symbol("gust");
  valorNulo1 = null;
  valorSinNada1 = valorSinNada;
  numeroPiInventado1 =
    322221422222222222222223333333344444444444444444445455555555567222222n;
  soyCarpintero1 = false;
} catch (error) {
  console.log(error);
}
// 10. Comenta las líneas que produzcan algún tipo de error al ejecutarse
// try {
//     miNombre1 = 'Gustavo Fran'
//     miEdad1 = 24
//     mySymbol1 = Symbol("gust")
//     valorNulo1 = null;
//     valorSinNada1 = valorSinNada;
//     numeroPiInventado1 = 322221422222222222222223333333344444444444444444445455555555567222222n;
//     soyCarpintero1 = false;
// } catch (error) {
//     console.log(error)
// }
