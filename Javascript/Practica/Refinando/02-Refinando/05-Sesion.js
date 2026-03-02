// Recribiendo funciones a como lo veria un motor de V8
// primera pasada guarda la configurarAlarmas() solo guarda no declara ni ejecuta.
function configurarAlarmas() {
    // primera pasada cuando ejecute.
    var alarmas, i;
    // segunda pasada cuando ejecute.
    alarmas = [];
    for ( i = 1; i <= 3; i++) {
        alarmas.push(function() {
            console.log("Sonando alarma número:", i);
        }); // 1, 2,
    }
    return alarmas;
}

// primera pasada misAlarmas en la TDZ.
// segunda pasada ejecuta configurarAlarmas()
// segunda pasada se guarda en memoria alarmas = [function(), function(), function()]
const misAlarmas = configurarAlarmas();

// Extraemos las funciones de la mochila y las ejecutamos
misAlarmas[0](); // imprime: Sonando alarma número: 3 
misAlarmas[1](); // imprime: Sonando alarma número: 3
misAlarmas[2](); // imprime: Sonando alarma número: 3