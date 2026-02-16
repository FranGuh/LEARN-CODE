// Invertir un array usando dos punteros
const array = ["Checo", "Max", "Lando", "Sainz", "Alonso"];
// Punteros
let izquierda = 0;
// El indice del ultimo elemento es longitud - 1
let derecha = array.length - 1;
// Mostrar el array original
console.log(array);
// Invertir el array
// Mientras el puntero izquierdo sea menor que el derecho
// (es decir, no se hayan cruzado)
// Hacer el intercambio y mover los punteros
while(izquierda < derecha){
    // Intercambiar los elementos en las posiciones de los punteros
    // Guardar el valor temporalmente
    let temp = array[izquierda];
    // Usar una variable temporal para el intercambio
    array[izquierda] = array[derecha];
    // Hacer el intercambio
    array[derecha] = temp;
    // Mover los punteros hacia el centro
    izquierda++;
    // Mover el puntero derecho hacia la izquierda
    derecha--;
}
// Mostrar el array invertido
console.log(array);