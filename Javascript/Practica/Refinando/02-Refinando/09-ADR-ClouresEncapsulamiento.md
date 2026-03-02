¡Hecho, Gus! Aquí tienes el documento oficial para tu bitácora. Este es uno de los ADR más importantes que vas a guardar, porque es el plano arquitectónico de cómo los frameworks modernos manejan la memoria.

Guárdalo bien, repásalo cuando sientas que los conceptos se mezclan, y úsalo como base para diseñar esos sistemas resilientes.

---

### ADR: Closures como Motor de Estado (El Patrón `useState`)

**Estado de la sesión:** Concepto dominado. Puente entre JavaScript puro (Vanilla) y la arquitectura de React (Virtual DOM) establecido con éxito.
**Visión del sistema:** Arquitectura de inventario encapsulada y a prueba de manipulaciones externas.

#### 1. Fundamentos Teóricos (El "Por qué" funciona)

* **Alcance Léxico (Lexical Scope):** Es la regla física del motor de JavaScript que dicta quién puede ver a quién. Una variable declarada con `let` o `const` dentro de una función es invisible e inaccesible para el mundo exterior. Es tu muralla de seguridad nativa.
* **Closures (Clausuras):** Es la capacidad de una función "hija" de mantener vivo un puente hacia la memoria de su función "padre", **incluso después de que el padre ya terminó de ejecutarse y "murió"**. El hijo se lleva una "mochila" con las variables exactas que necesita para sobrevivir.
* **Encapsulamiento (Patrón de Diseño):** La práctica de ocultar el estado interno de un sistema (como `_cantidad`) y obligar a que cualquier modificación pase estrictamente por una interfaz o función controlada (como `setStock`). Esto previene estados corruptos y usos indebidos.

#### 2. Terreno Conquistado (La Mecánica en Acción)

* **La Bóveda Compartida:** Comprobaste que si una función padre crea y retorna dos funciones hijas al mismo tiempo (ej. `verStock` y `setStock`), ambas hijas comparten exactamente la **misma mochila** (el mismo entorno de memoria). Una lee la caja, la otra modifica la misma caja.
* **Aislamiento de Instancias (Pasillos Múltiples):** Descubriste que cada vez que invocas a la función padre desde cero, el motor de JavaScript construye un edificio de memoria completamente nuevo. Así es como puedes tener cientos de productos en pantalla y cada uno mantiene su propio contador sin interferir con el de al lado.
* **El Disparador del Virtual DOM:** Entendiste que la verdadera razón para prohibir el acceso directo a la variable (`_cantidad = 95`) no es solo seguridad, sino **reactividad**. Al obligar al sistema a usar `setStock()`, puedes inyectar código dentro de esa función para avisarle al Virtual DOM que debe ejecutar su algoritmo de Reconciliación y actualizar la interfaz gráfica.

---

Con esto, Gus, dejas de adivinar cómo funcionan las herramientas y empiezas a ver los engranajes. Ya no eres el albañil que solo usa la mezcladora; eres el ingeniero que entiende cómo se diseñó el motor.

Tomo nota de tu petición para finales de la próxima semana: haremos un simulacro de "fuego cruzado" para repasar esos fundamentos donde sientas que el terreno no está 100% firme.

Apaga el radar, cierra la terminal y descansa la mente. ¡Nos vemos en la próxima sesión!