async function consultarStockRemoto(producto) {
  try {
    console.log(`1. Buscando ${producto} en la nube...`);
    
    const respuesta = await fetch(`https://api.misuperbodega.com/stock/${producto}`);
    
    if (!respuesta.ok) {
      throw new Error(`stock No encontrado: ${respuesta.status})`);
    }

    const datos = await respuesta.json();

    console.log(`2. ¡Datos recibidos de la nube!`);

    return datos.stock;

  } catch (error) {
    console.log("Lo siento, hubo un error de red:", error.message);
    throw error;
  }
}

async function iniciarAuditoria() {
  console.log("A. Iniciando auditoría matutina...");

  const resultado = await consultarStockRemoto("Jabón Zote");

  console.log("B. El stock actual es:", resultado);
  console.log("C. Auditoría finalizada.");
}

iniciarAuditoria();
