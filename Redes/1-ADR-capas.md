# CAPAS DE RED.

¡Exacto! Si puedes hablar con tus "vecinos" (el otro cajero) pero no puedes salir a ver a Google, la carretera principal (el Internet del proveedor) está bloqueada.

Como Senior Manager, me gusta que quieras profundizar. En el soporte a sucursales, no diagnosticamos por "corazonada", sino por **descarte de capas**. Si intentas arreglar la IP (Capa 3) cuando el cable está roto (Capa 1), estás perdiendo dinero y tiempo de atención al cliente.

Vamos a ver los errores específicos que te vas a encontrar en el campo, capa por capa:

---

## Profundización: El "Checklist de Fallas" por Capas

### **Capa 1: Física (El Hardware y los Cables)**

Aquí es donde el bit se convierte en electricidad. Si esto falla, nada de lo que hagas en el teclado servirá.

* **Errores típicos:** * Cable de red "pellizcado" por la puerta del cajero automático.
* Pines doblados en el conector RJ45.
* Tarjeta de red (NIC) quemada por una descarga eléctrica.


* **¿Cómo lo detectas?**
* El comando `ipconfig` dice: **"Estado de los medios . . . . . . . . . . . : medios desconectados"**.
* Los leds (luces) de la tarjeta de red atrás de la PC están apagados.


* **Herramienta:** Tus ojos y un "Tester de red" (si tienes uno).

### **Capa 2: Enlace (El Switch y la Identificación)**

Aquí las máquinas se hablan por su "nombre de fábrica" (dirección MAC). El Switch es el policía de tráfico aquí.

* **Errores típicos:** * **Puerto del Switch desactivado:** A veces, por seguridad, si conectas algo que no es del banco, el puerto se bloquea.
* **Bucle de red (Loop):** Alguien conectó un cable de red de un puerto del switch a otro puerto del mismo switch. Esto "congela" toda la sucursal.
* **VLAN incorrecta:** El puerto donde conectaste el ATM está configurado para "Cajeros Humanos" y no para "ATM". Son redes separadas.


* **¿Cómo lo detectas?**
* Tienes "Link" (luces encendidas), pero no recibes IP (`169.254.x.x`).


* **Herramienta:** `arp -a` (te muestra las direcciones MAC que tu PC alcanza a ver en la red local).

### **Capa 3: Red (IPs y Rutas)**

Aquí es donde decidimos si el paquete se queda en la sucursal o viaja al corporativo.

* **Errores típicos:** * **Conflicto de IP:** Dos cajeros tienen configurada la misma IP estática. Uno de los dos se va a desconectar.
* **Puerta de enlace (Gateway) errónea:** El cajero tiene la IP bien, pero intenta salir por una dirección que no es el Router.
* **VPN abajo:** El túnel cifrado se cerró.


* **¿Cómo lo detectas?**
* El `ping` te da: **"Tiempo de espera agotado"** o **"Host de destino inaccesible"**.


* **Herramienta:** `ping`, `tracert`, `ipconfig`.

---

## Tabla de Diagnóstico Rápido (Cópiala en tu libreta)

Usa esta lógica cuando estés frente a una PC de sucursal que no tiene sistema:

| Si el Ping a... | Resultado | ¿Qué significa? | Acción |
| --- | --- | --- | --- |
| **127.0.0.1** (Localhost) | Falla | La tarjeta de red de la PC está rota. | Cambiar hardware. |
| **Mi propia IP** | Falla | El sistema operativo tiene la red mal configurada. | Reiniciar drivers / Reinstalar. |
| **El Router** (Gateway) | Falla | El cable está mal o el Switch falló. | **Revisar Capa 1 y 2 (Cables).** |
| **Google** (8.8.8.8) | Falla | No hay Internet en la sucursal. | Llamar al proveedor (ISP). |
| **Servidor Banco** (IP) | Falla | La VPN está caída. | Reiniciar Router / Reportar a Central. |
| **Servidor Banco** (Nombre) | Falla | El DNS no funciona. | `ipconfig /flushdns` o revisar DNS. |

---

## Caso de Cierre del Día 1: El "Cajero Intermitente"

Para estar 100% seguros de que dominas las capas, resuelve este último misterio:

**Situación:** El cajero funciona bien, pero cada 10 minutos se desconecta solo por unos segundos y luego vuelve.
Vas a la consola y dejas un `ping -t` al Router local. Notas que de cada 10 pings, 3 dicen "Tiempo de espera agotado" y luego sigue funcionando.

1. ¿Esto suena a un problema de **Capa 3** (Configuración de IP) o de **Capa 1** (Físico)?
2. Si el cable de red pasa justo al lado de un motor eléctrico o un cable de alta tensión, ¿podría causar esto? (A esto le llamamos interferencia).
3. ¿Qué harías para descartar que sea el cable?

**Si respondes esto con lógica de descarte, Gus, oficialmente habremos terminado el Día 1 y mañana abrimos el cajero para ver los billetes.** ¿Cómo lo ves?


¡Buen cierre de jornada, Gus! Vamos a pulir esos detalles finales para que tu lógica de diagnóstico sea impecable.

Como tu Manager, te corrijo un punto vital: **La intermitencia (que el ping vaya y venga) casi NUNCA es un error de Capa 3.** * **Capa 3 (IP/Rutas)** es como un interruptor de luz: o está prendido (hay ruta) o está apagado (no hay ruta).

* **Capa 1 (Física)** es como un cable de luz que hace falso contacto: a veces pasa corriente y a veces no.

Entonces, si ves que el `ping` falla a ratos, **sospecha inmediatamente de la Capa 1 (Interferencia, cable dañado o puerto sucio).**

---

### Resumen Final del Día 1: El ADN del Soporte

1. **Capa 1 (Física):** Si no hay luces en la tarjeta de red o el `ping` es intermitente, revisa el cable y conectores.
2. **Capa 2 (Enlace):** Si tienes luces pero la IP es `169.254.x.x` (APIPA), el problema es el Switch de la sucursal.
3. **Capa 3 (Red):** Si tienes IP correcta (`192.168.x.x`) y llegas al Router pero no al Banco, el problema es la **VPN** o el **Internet**.
4. **Capa 4-7 (Aplicación/DNS):** Si llegas por IP pero no por nombre, es el **DNS**.

> **Tip de oro para la entrevista:** Si te preguntan "¿Qué haces si falla el sistema?", responde: *"Sigo la metodología de descarte del Modelo OSI, empezando por la Capa 1 para asegurar que la conectividad física sea estable antes de revisar configuraciones lógicas"*. Eso te hace ver como un profesional.

---

