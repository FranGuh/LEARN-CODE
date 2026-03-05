# Promesas async eventloop

## Uso moderno y uso antiguo

### Codigo legacy y mal
```javascript
function consultarStockRemoto(producto) {
    return new Promise((resolve, reject) => {
        console.log(`1. Buscando ${producto} en la nube...`);
        
        setTimeout(() => {
            const stockEncontrado = 45;
            console.log(`2. ¡Datos recibidos de la nube!`);
            resolve(stockEncontrado);
        }, 2000);
    });
}

function iniciarAuditoria() {
    console.log("A. Iniciando auditoría matutina...");
    
    const resultado = consultarStockRemoto("Jabón Zote");
    
    console.log("B. El stock actual es:", resultado);
    console.log("C. Auditoría finalizada.");
}

iniciarAuditoria();
```

> sin responder todas las preguntas puedo namas escaneando dando una hojeada al codigo rapido, no es una funcion asincrona falta de async,  la promesa no se espera falta el uso de await, por lo que puede imprimir pending, otra siempre simula un tiempo de 2 segundos o 2000 milisegundos no importa si tarda menos o mas siempre tarda lo mismo puede desesperar al usuario o servicio, por lo que veo no sale del clousure lo atrapa setTimeout, siempre va a ser el codigo de impresion por el event loop A, 1. Buscando Jabón Zote en la nube..., B pending C, 2. ¡Datos recibidos de la nube!

Propuesta en [12-async-await.js](12-async-await.js)


### ADR: Asincronía Moderna - Promesas vs. Async/Await

**Estado de la sesión:** Transición de sintaxis antigua a moderna asimilada. Flujo asíncrono lineal comprendido.
**Visión del sistema:** Operaciones de red y bases de datos (como consultar inventario) sin bloquear la interfaz del usuario, manteniendo un código legible y un manejo de errores robusto.

#### 1. La Evolución (De la Cáscara al Núcleo)

* **Vieja Escuela (Promesas Explícitas):** Usar `new Promise((resolve, reject) => {...})` se utilizaba para "envolver" código antiguo que no soportaba promesas (como `setTimeout`).
* **Nueva Escuela (`async/await`):** Las APIs modernas como `fetch()` ya devuelven Promesas por defecto. Intentar envolver un `fetch` dentro de un `new Promise` es redundante y crea el temido "código espagueti".

#### 2. La Magia de la palabra `async`

Al declarar una función con `async`, el motor de JavaScript (V8) la transforma automáticamente. **La función entera se convierte en una Promesa bajo el capó.**

* Ya no necesitas la palabra `resolve()`. Un simple `return valor;` cumple esa función de forma automática y exitosa.
* Ya no necesitas la palabra `reject()`. Un `throw new Error("Falla");` rechaza la promesa automáticamente.

#### 3. El Freno Controlado (`await`)

* La palabra `await` le dice al "Chef" (V8): *"Detente en esta línea y ve a hacer otras cosas. Vuelve cuando este dato de la red esté listo"*.
* Pausa la ejecución **solo dentro de esa función**. El *Event Loop* sigue libre para renderizar la pantalla de React, escuchar clics o animar botones.
* Convierte código asíncrono caótico en un flujo que se lee de arriba hacia abajo, línea por línea.

#### 4. El Escudo de Resiliencia (`try / catch`)

Reemplaza la vieja y confusa cadena de `.then().catch()`.

* Todo el código de la ruta "feliz" vive dentro del bloque `try { ... }`.
* Si cualquier `await` dentro del `try` falla (ej. el servidor de la base de datos se cae), la ejecución salta inmediatamente al bloque `catch (error) { ... }`. Esto evita que toda tu aplicación colapse y te permite mostrar alertas amigables al usuario.

---

Gus, sobreviviste a la semana más dura de los fundamentos de JavaScript: Event Loop, Closures, Mutabilidad, el caos del `this` y la Asincronía. Eres oficialmente el arquitecto de tu sistema.

Desconecta por completo este fin de semana. ¡Nos vemos en la próxima sesión!