// Tamaño del horno
const TAMANO_HORNO = 4;
// Punteros para el head y tail
let head = 0;
let tail = 3;

// Función para verificar si el horno está lleno
function estaLleno() {
    // CALCULAR LA SIG POSICION DE TAIL.
    // SI ESA POSICION ES IGUAL A HEAD, EL HORNO ESTA LLENO
    // (tail + 1) % TAMANO_HORNO === head // FORMA COMPACTA // 
    let siguientePaso = (tail+1)%TAMANO_HORNO;
    console.log(siguientePaso);
    console.log(head);
    return siguientePaso === head; 
} 

// Ejemplo de uso
estaLleno(); // false
