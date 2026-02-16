/// Sistema de control

const COMANDOS_SEGUROS = ["ENCENDER", "APAGAR", "RADIO_ON", "RADIO_OFF"];

function ejecutarAccionReal(comando: string) {
    
    // MOTOR - NO TOCAR
    // SI llega basura el sistema explota
    if(comando === "AUTODESTRUCCION") {
        console.log("BoOM! El choche ha explotado.");
    } else {
        console.log(`Ejecutando: ${comando}`);
    }
}

function procesarComando(inputUsuario: string) {
    console.log(`Usuario dijo: "${inputUsuario}"`);
    
    let comandoLimpio = inputUsuario.toString().trim().toUpperCase();
    console.log(`${comandoLimpio}`)
    // validacion
    // no sirve para TS -> COMANDOS_SEGUROS.includes(comandoLimpio)
    // google el error e encontre esto.
    // pero sigue pasando el modelo de seguridad pq?
    if (COMANDOS_SEGUROS.indexOf(comandoLimpio) === -1){
        console.log("ALERTA INTENTO DE HACKEO!");
        return;
    }
    
    ejecutarAccionReal(comandoLimpio);
}

console.log("TEST 1: USUARIO NORMAL");
procesarComando("  encender  ");

console.log("\n--- TEST 2: Usuario Hacker ---");
procesarComando("AUTODESTRUCCION"); // Debería ser bloqueado

console.log("\n--- TEST 3: Usuario Confundido ---");
procesarComando("abrir_puerta");

