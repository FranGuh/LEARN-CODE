const peticionFIA = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        Piloto:"Max",
        Vuelta:58,
        Tiempo:"1.18.456"
    })
}

const urlFIA = "api.f1.com/vueltas";

async function enviarTelemetria() {
    console.log("Enviando datos a la FIA...");
    try {
        const respuesta = await fetch(urlFIA, peticionFIA);
        const datos = await respuesta.json();
        console.log("FIA respondio:", datos);
    } catch (error) {
        console.log("Error en la petición:", error);
    }
}