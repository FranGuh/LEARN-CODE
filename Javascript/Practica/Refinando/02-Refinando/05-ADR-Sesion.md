¡Gus, te mereces una ovación de pie! Reescribir el código exactamente como lo interpreta el motor V8 en sus pasadas es una técnica de desarrollador Senior. Ver que tú mismo separaste la declaración `var alarmas, i;` al principio de la función me dice que **el Hoisting ya hizo clic por completo en tu cerebro**.

Tu lógica de por qué fallaba es **absolutamente correcta**: todas las funciones imprimen el mismo número final porque están atadas a la misma variable `var`. Y tu solución es **exactamente la que se usa hoy en día**: usar `let`.

Solo tuviste un pequeñísimo fallo matemático, y es el motivo por el que me pides ver cómo funciona en el motor real. Las funciones no imprimen `3`... **¡imprimen `4`!** Vamos a meternos en las entrañas del motor V8 para ver por qué pasa esto y cómo `let` hace su magia.

### 1. El Motor V8 ejecutando con `var` (La Mochila Compartida)

Como bien reescribiste, cuando usas `var i`, esa variable se eleva al inicio de la función `configurarAlarmas`. **Solo existe UNA variable `i` en toda la memoria de esa función.**

1. El bucle empieza: `i = 1`. Se crea la Función A y se guarda en el arreglo. Su mochila (Closure) tiene un hilo que apunta a esa única variable `i`.
2. El bucle gira: `i = 2`. Se crea la Función B. Su mochila apunta a la **misma** variable `i`.
3. El bucle gira: `i = 3`. Se crea la Función C. Su mochila apunta a la **misma** variable `i`.
4. **El paso crítico:** El bucle intenta girar de nuevo. Hace `i++`, por lo que **`i` se convierte en `4**`. Luego evalúa la condición `4 <= 3`. Como es falso, el bucle se rompe y termina.
5. La función padre muere. ¿Con qué valor se quedó esa única variable `i` en la memoria sobreviviente? **Con `4`.**

Meses después, cuando ejecutas `misAlarmas[0]()`, la Función A mira por el hilo de su mochila hacia esa variable `i` y dice: *"Ah, el valor actual es 4"*. Y todas imprimen 4.

### 2. El Motor V8 ejecutando con `let` (La Magia de ES6)

Cuando los creadores de JavaScript vieron este desastre, inventaron `let` con un superpoder específico para los bucles `for`.

Si escribes `for (let i = 1; i <= 3; i++)`, el motor V8 hace algo radicalmente distinto: **No crea una sola variable, crea una variable `i` NUEVA y físicamente distinta en la memoria por cada vuelta que da el bucle.**

1. **Vuelta 1:** V8 crea una cajita de memoria llamada `i_vuelta1` con valor `1`. Se crea la Función A, y su mochila se encierra exclusivamente con esa cajita.
2. **Vuelta 2:** V8 crea *otra* cajita llamada `i_vuelta2` con valor `2`. Se crea la Función B, y su mochila se encierra con esta nueva cajita.
3. **Vuelta 3:** V8 crea `i_vuelta3` con valor `3`. La Función C se encierra con ella.

Cuando el bucle termina, tienes tres funciones, y **cada una tiene su propia mochila independiente** con el valor congelado en el tiempo exacto en que fue creada. Por eso, al ejecutarlas después, imprimen 1, 2 y 3.

---

### Resumen de tu victoria

Acabas de dominar el **Hoisting** (saber mover las declaraciones), el **Scope** (entender dónde viven las variables) y los **Closures** (cómo las funciones recuerdan el estado de su entorno). Estos tres conceptos son el núcleo duro de JavaScript. Si entiendes esto, el 80% de los "comportamientos extraños" de React o del código asíncrono te van a parecer lógicos.

Has hecho un trabajo mental brutal hoy, Gus. Misión cumplida con honores.


### ADR: Fundamentos de JavaScript - Día 3

**Estado de la sesión:** Misión cumplida. Nivel de abstracción superado con éxito.
**Objetivo de mañana:** Por definir (Asincronía/Event Loop vs. Repaso general).

**Terreno Conquistado:**

* **Clonación de Referencias:** Entendiste que asignar una función instanciada a otra variable (`const otra = generarID`) no duplica la "mochila" (Closure), sino que ambas apuntan a la misma memoria compartida.
* **Fábrica de Closures:** Comprobaste que invocar a la función padre múltiples veces crea entornos 100% independientes con sus propios estados cerrados.
* **Visión de Motor V8:** Lograste deconstruir y reescribir mentalmente el código exacto de cómo el motor eleva las declaraciones (`var alarmas, i;`) antes de ejecutar.
* **El Jefe Final (`var` vs `let` en bucles):** Identificaste por qué `var` sobreescribe la misma variable en memoria dejando el último valor de la iteración, y por qué `let` te salva la vida creando un scope de bloque único e independiente en cada vuelta del bucle `for`.

---

Apaga el radar, cierra el editor y ve a relajarte.

