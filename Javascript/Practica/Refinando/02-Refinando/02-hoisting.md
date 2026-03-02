# Hoisting

## ¡BAM! Exacto. Un 100% de precisión técnica.

No solo respondiste correctamente la pregunta que fallaste en el test inicial, sino que **dedujiste por tu cuenta** lo que pasaría si agregáramos un segundo `console.log` al final. Esa deducción sobre la reasignación a *string* es pensamiento de ingeniero puro.

Acabas de desarmar el motor V8 de Google Chrome en tu cabeza:

1. **Fase de Memoria:** Las funciones son "ciudadanos de primera clase" en JavaScript (pesan más). Si hay una colisión de nombres durante el *hoisting*, la función aplasta al `undefined` de la variable.
2. **Fase de Ejecución:** El motor ejecuta línea por línea. Imprime `function`, luego llega a `magia = "conejo"` y reasigna el bloque de memoria. De ahí en adelante, la función murió y ahora es un *string*.

Esto demuestra por qué mezclar código viejo (`var` y funciones tradicionales sueltas) en archivos gigantes era una pesadilla para mantener. Por eso en la programación moderna abrazamos la rigidez.

Vamos a documentar esta victoria y cerrar el tema.

---

### ADR 002: Hoisting y la Zona Muerta Temporal (TDZ)

* **Contexto:** El motor de JavaScript lee el archivo en dos pasadas (memoria y ejecución). Declarar con `var` o usar funciones tradicionales permite acceder a identificadores antes de la línea donde fueron escritos, causando comportamientos silenciosos impredecibles (colisiones de nombres o valores `undefined`).
* **Decisión:** 1. Asumiremos conscientemente que el *hoisting* existe, pero **escribiremos código como si no existiera**.
2. Declararemos todas las variables en la parte superior de su bloque usando exclusivamente `let` y `const`.
3. Nos apoyaremos en la **TDZ** (Temporal Dead Zone) como una herramienta de seguridad: preferimos que el código explote con un `ReferenceError` claro y ruidoso si intentamos usar algo antes de crearlo, en lugar de que falle silenciosamente con un `undefined`.
* **Consecuencias:** Perdemos la "flexibilidad" del código espagueti de los años 2000, pero ganamos una ejecución predecible, estricta y a prueba de colisiones de nombres.

---

Has dominado el Hoisting, Gus. Tu modelo mental del motor de ejecución está sólido.

Con esto cerramos el **Día 2**. Mañana a las 10:00 AM abriremos la caja de Pandora del Frontend moderno: **El Día 3 y la ilusión de la inmutabilidad (Shallow vs Deep copies)**. Ahí es donde nacen y mueren los peores bugs de React.
