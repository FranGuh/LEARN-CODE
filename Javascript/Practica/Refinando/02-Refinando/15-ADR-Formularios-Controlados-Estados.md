# ADR: Formularios Controlados, Estado Único y Estados Derivados

## Uso de React

**Estado de la sesión:** Dominio de interactividad, sincronización de inputs y manejo de referencias de memoria en estados complejos asimilado.
**Visión del sistema:** Garantizar que React sea la única fuente de verdad (Single Source of Truth) en la captura de datos, optimizando el rendimiento mediante cálculos al vuelo y clonación estratégica.

#### 1. El Patrón de Componente Controlado (La Doble Vía)

El DOM (navegador) no debe almacenar información de forma independiente. React toma el control absoluto del input mediante un ciclo cerrado:

* **Lectura (`value`):** El input está forzado a mostrar estrictamente lo que dicta la variable de estado. Si se omite el evento de cambio, el input se vuelve de "Solo Lectura" (Read-Only) y parece congelado.
* **Escritura (`onChange`):** Captura cada pulsación del teclado (`evento.target.value`) y actualiza el estado. Esto permite validaciones en tiempo real (ej. bloquear espacios) antes de que el usuario termine de escribir.

#### 2. Formularios Escalables (Estado Único Dinámico)

En lugar de crear un `useState` por cada input de un formulario, se utiliza un único objeto de estado.

* **Llaves Dinámicas:** Utilizando el atributo `name` del input (`evento.target.name`) envuelto en corchetes `[campo]`, se puede actualizar dinámicamente la propiedad correcta del objeto sin tocar las demás.
* **La Fusión:** Requiere copiar el estado anterior (Inmutabilidad) y sobreescribir el campo modificado en una sola operación.

#### 3. Estados Derivados (Cálculos al Vuelo)

**Regla Estricta:** Nunca se debe crear un `useState` para un dato que puede ser calculado matemáticamente a partir de un estado ya existente.

* Si el estado `gastos` cambia, React repinta el componente automáticamente.
* Las sumas totales, filtrados o conteos (ej. `Object.values(gastos).reduce(...)`) deben declararse como variables regulares (`const total = ...`) justo antes del `return`. Esto evita desincronizaciones y ahorra memoria.

#### 4. Estados Anidados: Rendimiento vs. Legibilidad

Cuando el estado tiene múltiples niveles de profundidad (ej. un objeto dentro de otro objeto), la actualización requiere estrategias específicas para no mutar las referencias de memoria:

* **Operador Spread (`...`):** Copia nivel por nivel. Es extremadamente rápido y consume mínima memoria, pero en objetos muy profundos genera código difícil de leer y propenso a errores humanos.
* **Clonación Estricta (`structuredClone()`):** Crea una copia profunda (Deep Copy) con direcciones de memoria 100% nuevas de un solo golpe. Permite mutar la copia directamente. Consume un poco más de recursos, pero en configuraciones o formularios (datos pequeños) el impacto es nulo y la legibilidad del código aumenta exponencialmente.

---

Gus, has cerrado un ciclo importantísimo. Ya entiendes la memoria, la asincronía, la separación por módulos, y ahora, la interactividad real en React. El motor está listo y el volante responde a tus comandos.

Cierra la terminal, apaga los servidores y desconecta el cerebro. Deja que esta información se asiente. Cuando abras el taller la próxima vez, estaremos listos para subir de nivel. ¡Descansa, arquitecto!