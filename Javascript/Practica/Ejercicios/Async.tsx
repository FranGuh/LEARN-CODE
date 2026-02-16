// sistema electrico

function pedirNeumaticos() {
    // solicitud a fabrica de neumaticos
    console.log("Camion de neumaticos en camino....");
    // Construccion de la promesa
    // res: resolve, req: reject
    // setTimeout simula el tiempo de espera
    // miPromesa es de tipo Promise<string>
    let miPromesa = new Promise((res,req) => {
        setTimeout(() =>{
            res("Tiempo completado!");
            console.log("Camion llego!")
        },2000);
    });
    return miPromesa;
}

// funcion revisar coche
function revisarCoche() {
    console.log("Mecanico 1: Revisando alerón... OK");
    console.log("Mecanico 2: Carga de combustible... OK");
}

// funcion principal  async
// async indica que la funcion es asincrona
// asincrona significa que puede contener operaciones que toman tiempo
// y no bloquean la ejecucion del programa
// antes de continuar con la siguiente linea de codigo
// y optimizar el tiempo en boxes puede significar la diferencia entre ganar o perder
async function ejecutarPitStop(){
    // secuencia de pit stop
    console.log("Entrando a boxes");
    console.log("Solicitando Neumaticos!");
    // llamar a la funcion de pedir neumaticos
    const promesaNeumaticos = pedirNeumaticos();
    console.log("📡 Solicitud enviada (No estoy esperando todavía)...");
    // paralismo
    // mientras llegan los neumaticos, se revisa el coche
    revisarCoche();
    console.log("⏳ Todo listo, solo esperando neumáticos...");
    
    // esperar la promesa
    // await bloquea la ejecucion hasta que la promesa se resuelva
    await promesaNeumaticos;
    console.log("Salida de boxes autorizada.");
}

ejecutarPitStop();