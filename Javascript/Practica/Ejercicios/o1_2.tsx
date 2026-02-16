// Implementación de un buffer circular para registrar tiempos de vuelta
const CAPACIDAD = 3;
// Memoria para almacenar los tiempos de vuelta
let memoria = [null,null,null];
// Cursor para la posición actual
let cursor = 0;
// 1:30
//1,31
//1,32
//1,29
//1,28
//["1:30","1:31","1:32"]
//vuelta 2 = [1:29,1:28,1:32]
// Función para registrar un tiempo de vuelta
function registrarVuelta(tiempo: any) {
    // Si está lleno, no me importa, sobrescribo lo que haya ahí.
    memoria[cursor] = tiempo;
    // 2. Mover el cursor usando el portal de teletransporte (%)
    // Si el cursor llega al final, vuelve al inicio
    cursor = (cursor+1) % CAPACIDAD;
}

// Ejemplo de uso
registrarVuelta("1:30");
registrarVuelta("1:31");
registrarVuelta("1:32");
registrarVuelta("1:29");
registrarVuelta("1:28");
// Al final memoria = ["1:29","1:28","1:32"]