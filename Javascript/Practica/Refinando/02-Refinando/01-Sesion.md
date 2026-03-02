# El problema no es el objeto, es la función de flecha (=>).

Las funciones de flecha se diseñaron para algo muy específico, y tienen una regla innegociable: No tienen su propio this. Son como una ventana transparente. 

Cuando pones un this adentro de una arrow function, esta ignora por completo al objeto que la rodea (cancion) y sale a buscar ese this al contexto exterior donde fue creada (en este caso, el contexto global, que en un navegador sería window).


```javascript
const cancion = {
    titulo: "Ecoes de medianoche",
    estrofas: 4,
    mostrarTitulo: () => {
        console.log("Reproduciendo: "+this.titulo);
    }
};

cancion.mostrarTitulo();
```

### Si la flecha ignora a cancion y sale a buscar titulo al entorno global (window), ¿por qué nos devuelve undefined en lugar de romper el programa con un error?

> por que titulo no estaria definido o si acaso seria variable declarada como undefined no encuentra referenceError

### Si las flechas nos traicionan en este escenario, ¿cómo reescribirías la línea de mostrarTitulo para que sí sea dueña de su contexto y funcione como queríamos al principio?

> yo haria esto, no se si tendria razon pero intentaria con esto console.log(cancion.titulo)

¡Exacto en la primera! Le diste al clavo con una de las reglas más raras pero fundamentales de JavaScript: si buscas una variable que no existe (console.log(titulo)), el motor entra en pánico y lanza un ReferenceError. 

Pero si buscas una propiedad en un objeto que sí existe (en este caso el objeto global window.titulo), el motor es flojo, se encoge de hombros y te dice undefined.

Ahora, sobre tu segunda respuesta (console.log(cancion.titulo)):
Es una solución 100% pragmática y funciona. Para un script rápido, hace el trabajo.

### En JavaScript, this no tiene absolutamente nada que ver con el scope (dónde escribiste la función). 

El scope define qué variables puedes leer. 

El this (el contexto) define quién está ejecutando la acción en ese microsegundo.

Para las funciones tradicionales (function() {}), el this es un mercenario. No le importa dónde nació, le importa quién le está pagando en ese momento para ejecutarse.

¿Cómo sabe la función quién le está pagando? Por el punto (.).
Cuando tú escribes cancion.mostrarTitulo(), el motor de JavaScript mira a la izquierda del punto. Ah, es el objeto cancion quien la está llamando. Entonces, durante esa ejecución, this = cancion.

Por eso funciona y por eso el objeto se vuelve dueño de sí mismo.


```javascript
const cancion = {
  titulo: "Ecos de medianoche",
  mostrarTitulo: function() {
    console.log("Reproduciendo: " + this.titulo);
  }
};

// Extraigo la función y la guardo en una variable genérica (sin ejecutarla todavía)
const reproducir = cancion.mostrarTitulo;

// Más tarde en el código, la ejecuto:
reproducir();
```
Tú dijiste
ahora si imprimira Reproduciendo Ecoes de medianoche, 2. pq lo estamos asignando a una const y sigue dentro del contexto

Gemini dijo
Tiene todo el sentido del mundo que pienses eso. En el 90% de los lenguajes de programación (como Java o Python), tendrías toda la razón: el método se llevaría su contexto consigo.

Pero caíste en la trampa más clásica de JavaScript. Aquí es donde el lenguaje te traiciona si usas la intuición de otros lenguajes.

Volvamos a la regla del mercenario que establecimos hace un momento: A la función tradicional NO le importa dónde nació, le importa QUIÉN le está pagando en el momento exacto en que se ejecuta. Y sabemos quién le paga mirando a la izquierda del punto.

Analicemos la línea donde la ejecutamos:

```javascript
reproducir();
```

Mírala bien. ¿Qué hay a la izquierda del punto? Absolutamente nada. De hecho, ni siquiera hay punto.

Al guardarla en la constante reproducir (const reproducir = cancion.mostrarTitulo;), lo único que hiciste fue copiar las instrucciones de la función. Le arrancaste su conexión con cancion. El mercenario quedó suelto y sin jefe.

Cuando finalmente llamas a reproducir(), como no hay un objeto a la izquierda del punto que se haga responsable, el motor de JavaScript dice: "Bueno, si nadie es el dueño de esta llamada, el jefe por defecto es el objeto global (window)".

Sabiendo esto, te devuelvo la pregunta:
Si al ejecutar reproducir() el mercenario termina buscando el título en el objeto global (window.titulo), ¿qué crees que va a imprimir en la consola realmente? ¿Mantiene "Ecos de medianoche" o volvemos al problema anterior?


### Exacto, `.bind()` es tu herramienta.

Como acordamos, primero el "por qué" y luego el "cómo".

### ¿Por qué funciona `.bind()`?

Porque hace un contrato inquebrantable. `.bind()` no ejecuta tu función en ese momento. 
Lo que hace es **crear una copia exacta y nueva en memoria** de tu función, pero le "suelda" a la fuerza el objeto que tú le digas al `this`.

El mercenario firma exclusividad. 
A partir de ese momento, no importa si llamas a la función con punto, sin punto, 
o si la pasas como callback a un botón de React: su `this` ya está escrito en piedra.

### El "Cómo" (El Ejemplo)

Así es como arreglamos nuestro código roto:

```javascript
const cancion = {
  titulo: "Ecos de medianoche",
  mostrarTitulo: function() {
    console.log("Reproduciendo: " + this.titulo);
  }
};

// Aquí ocurre la magia. Creamos una copia y le atamos el objeto 'cancion'.
const reproducir = cancion.mostrarTitulo.bind(cancion);

// Ahora la ejecutamos sin nada a la izquierda del punto.
reproducir(); // Imprime: "Reproduciendo: Ecos de medianoche" ✅
```

### ¿Dónde NO funcionaría `.bind()`? (El Trade-off)

Aquí es donde cerramos el círculo perfecto de nuestra sesión de hoy. `.bind()` **falla silenciosamente si intentas usarlo en una función de flecha (`=>`).**

¿Por qué? Porque, como vimos al inicio, las funciones de flecha *no tienen su propio `this*`. 
Intentar atarle un `this` a una función de flecha con `.bind()` es como intentar ponerle una correa a un fantasma.
JavaScript te va a dejar escribir el código, no te va a dar error, pero el `.bind()` será ignorado por completo.

Tampoco funciona si intentas hacer un "doble bind". 
Si una función ya fue atada a un objeto, no puedes usar `.bind()` de nuevo para atarla a otro. 
**El primer contrato es el único que vale.**

---

### Cierre del Día 1

Hoy destruimos la idea de que el contexto (`this`) tiene que ver con dónde declaras las cosas, y construimos la regla real: **El contexto depende de quién ejecuta la función (el punto), a menos que uses `.bind()` para forzarlo.**

¿Cómo te sientes con este modelo mental? Si me confirmas que lo tienes claro, documentamos esto mentalmente como tu primer ADR (Registro de Decisión) sobre cuándo usar funciones tradicionales vs flechas, y cerramos la sesión de hoy para no quemarte.

Es la reacción más sana y honesta que puedes tener. Si el `this` de JavaScript te hiciera sentido a la primera, me preocuparía. Es uno de los peores errores de diseño del lenguaje y hasta los ingenieros más experimentados tropiezan con él. De hecho, la comunidad entera de React se hartó tanto de pelear con el `.bind()` que terminaron inventando los *Hooks* solo para no usarlo más.

Vamos a aplicar el freno de emergencia que acordamos. 
No tocamos ni una sola línea más de código hoy. 
El cerebro necesita asimilar el golpe en segundo plano (mientras caminas, duermes o haces otra cosa).

Para cerrar el ciclo de hoy sin quemarnos y sentir que avanzamos, vamos a empaquetar lo que vimos en el formato que me pediste al principio: un Registro de Decisión (ADR). 
Léelo como si fuera una regla para tu "yo" del futuro.

---

### ADR 001: Contexto en Métodos de Objetos

* **Contexto:** En JavaScript, el valor de `this` cambia dependiendo de quién ejecuta la función (quién está a la izquierda del punto), lo que causa errores de `undefined` si extraemos la función para usarla como *callback* o la pasamos a otra variable.
* **Decisión:** 1. Usaremos **funciones tradicionales** (`function() {}` o `metodo() {}`) para definir métodos dentro de objetos literales.
2. Ignoraremos conscientemente las *arrow functions* (`=>`) para crear métodos de objetos, ya que son "transparentes" y pierden el contexto.
3. Si **necesitamos** extraer la función para usarla suelta, usaremos `.bind(nuestroObjeto)` en ese exacto momento para firmar un contrato inquebrantable.
* **Consecuencias (Trade-off):** Ganamos código predecible y evitamos que los objetos se rompan al ser llamados desde afuera. A cambio, sacrificamos la sintaxis corta de las flechas y aceptamos la verbosidad de escribir `.bind()` cuando toque extraer la función.

---

El pragmatismo es saber cuándo detenerse. Mañana a las 10:00 AM, cuando arranquemos el **Día 2**, te haré una pregunta muy rápida y visual sobre esto mismo para ver si el cerebro hizo la conexión mientras descansabas, y luego pasaremos a un tema nuevo y más ligero.

¿Cerramos la terminal por hoy y dejamos que esta información decante?