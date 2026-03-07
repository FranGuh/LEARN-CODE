# Construir interfaces.

## Usando React para ensamblaje

Si JavaScript es el motor y las herramientas, React es la **fábrica de ensamblaje**. Aquí vamos a usar todo lo que aprendiste para construir interfaces que reaccionen solas a los datos.

Revisando tu historial, para que tu proyecto "Floppy" (el clasificador de imágenes) sea un éxito, necesitas entender el concepto de **Componentes y Composición**. No puedes meter todo el código de una página en un solo archivo; tienes que pensar en "piezas de LEGO" que se comuniquen entre sí.

### El Escenario de Hoy: "El Botón que no sabe quién es"

Imagina que estás diseñando el panel de control de **Floppy**. Tienes un componente padre llamado `PanelControl` y un componente hijo llamado `BotonClasificar`.

El problema es el siguiente: el `BotonClasificar` sabe cuándo le dan click, pero no sabe **qué** clasificar, porque esa información la tiene el `PanelControl`.

Mira este esquema simplificado de cómo un "aprendiz" intentó conectar las piezas:

```javascript
// Componente Padre
function PanelControl() {
  const imagenActual = "perrito.jpg";

  return (
    <div className="border p-4">
      <h2>Panel de Floppy</h2>
      {/* Intentamos llamar al hijo */}
      <BotonClasificar />
    </div>
  );
}

// Componente Hijo
function BotonClasificar() {
  const manejarClick = () => {
    // ERROR: imagenActual no está definida aquí
    console.log("Clasificando la imagen:", imagenActual);
  };

  return (
    <button onClick={manejarClick}>
      Clasificar ahora
    </button>
  );
}

```

---

### Tu Reto Socrático:

1. **La Frontera de la Mochila:** Cada componente en React es como una de las "mochilas" (scopes) que vimos la semana pasada. ¿Por qué `BotonClasificar` no puede ver la variable `imagenActual` si está justo "arriba" de él en el código?
2. **El Pasamanos (Props):** En React existe un mecanismo llamado **Props** para pasar información de padres a hijos. Si el `PanelControl` fuera el jefe de la bodega y el `BotonClasificar` fuera el empleado, ¿cómo le "entrega" el jefe la caja (los datos) al empleado para que este pueda trabajar?
3. **La Dirección del Agua:** En React, los datos fluyen como un río: siempre hacia abajo (de padre a hijo). Si el botón necesitara avisarle al panel que ya terminó de clasificar, ¿cómo puede un hijo "hablarle" a su padre si el agua no corre hacia arriba? (Pista: Recuerda qué pasaba cuando pasabas una función como referencia en JavaScript puro).

¿Cómo conectarías estos dos cables, Gus, para que el botón sepa qué imagen tiene que procesar sin romper el aislamiento de cada componente?

> si fuera var, quiza podria acceder a el, pero en este caso el scope no lo conoce en cambio si en la funcion ponemos que recibe parametro de imagen actual y pase el contexto mediante el parametro y manejamos con try-catch para envolver el error y evitar que congele o crashe el hilo principal seria optimo en este caso la mochila padre es independiente de lo que tenga hijo hijo no conoce lo que tiene padre por ejemplo si esta fuera de su scope como en este caso al usar const.  2. si esa es mi solucion recomendada con props una funcion que reciba el parametro, 3 no recuerdo este punto podrias refrescarlo

¡Bien bajado ese balón, Gus! Tienes el instinto de arquitectura bien afilado. Acertaste de lleno en la solución principal (pasar el parámetro), pero el "Chef" (V8) te hizo una pequeña ilusión óptica con el tema de `var`.

Vamos a pulir ese modelo mental y a refrescar el punto 3, porque ahí es donde ocurre la verdadera magia de React.

### 1. El Mito de `var` y los Muros de Concreto

Tu lógica sobre las "mochilas independientes" es **100% correcta**. El hijo no tiene idea de lo que hay en el padre.

Pero ojo con el espejismo: dijiste que si fuera `var` quizá podría acceder. ¡Falso! Recuerda las reglas de alcance (Scope) que vimos: `var` se salta las cajas de cartón (los bloques `{}` como los `if` o `for`), **pero NUNCA puede escapar de una función**.

Como `PanelControl` y `BotonClasificar` son dos funciones completamente separadas, sus muros son de concreto armado. Ni `var`, ni `let`, ni `const` pueden cruzar de una función a otra por arte de magia. ¡Y eso es excelente! Significa que tus componentes son seguros y no se van a contaminar entre sí.

### 2. El Pasamanos (Cómo se ven las Props en React)

Acertaste la solución: pasar la variable como parámetro. En React, a estos parámetros los llamamos **Props** (Propiedades), y se ven exactamente como los atributos de HTML.

El jefe (Padre) le entrega la caja al empleado (Hijo) así:

```javascript
// El Padre inyecta la variable como si fuera un atributo HTML
<BotonClasificar imagenAProcesar={imagenActual} />

```

Y el Hijo recibe esa "caja" (un objeto con todas las props) en sus parámetros:

```javascript
function BotonClasificar(props) {
  const manejarClick = () => {
    // Ahora el hijo SÍ conoce la imagen abriendo la caja de props
    console.log("Clasificando:", props.imagenAProcesar); 
  };
  // ...
}

```

### 3. El Refresco: El "Walkie-Talkie" del Hijo al Padre

Me pediste refrescar este punto. Dijimos que en React el agua (los datos) solo fluye hacia abajo, de padre a hijo. El `BotonClasificar` no puede enviarle una variable de vuelta al `PanelControl`.

Entonces, si Floppy termina de clasificar la imagen, ¿cómo le avisa al panel para que muestre el resultado en pantalla?

**La respuesta está en los Closures que dominaste la semana pasada.**

El Padre no solo le puede pasar textos o números al Hijo... **¡le puede pasar funciones!** Es como si el jefe le entregara un walkie-talkie al empleado.

Mira esta obra de arte arquitectónica:

```javascript
// --- COMPONENTE PADRE ---
function PanelControl() {
  const imagenActual = "perrito.jpg";

  // 1. El padre crea una función (el walkie-talkie) en su propia mochila
  const recibirAvisoDelHijo = (resultado) => {
    console.log("El panel se enteró: La imagen es un", resultado);
  };

  return (
    <div>
      {/* 2. El padre le pasa el walkie-talkie al hijo por Props */}
      <BotonClasificar 
        imagenAProcesar={imagenActual} 
        walkieTalkie={recibirAvisoDelHijo} 
      />
    </div>
  );
}

// --- COMPONENTE HIJO ---
function BotonClasificar(props) {
  const manejarClick = () => {
    console.log("Procesando...", props.imagenAProcesar);
    
    // 3. El hijo usa el walkie-talkie. ¡Llama a la función del padre!
    props.walkieTalkie("Caniche"); 
  };

  return <button onClick={manejarClick}>Clasificar</button>;
}

```

**¿Por qué funciona esto sin romper las reglas?**
Porque la función `recibirAvisoDelHijo` nació en el Padre. Gracias a los **Closures**, esa función recuerda su "mochila" original. Cuando el Hijo la ejecuta, el código corre en el contexto del Padre, permitiéndole actualizar su propio estado.

---

### Tu Reto Socrático de Consolidación

Acabas de ver cómo se pasan datos hacia abajo (Props) y cómo se avisa hacia arriba (pasando funciones por Props).

Imagina que en tu proyecto **Floppy**, quieres que el `PanelControl` tenga un contador visual de "Imágenes Clasificadas: 0". Cada vez que el `BotonClasificar` termine su trabajo, ese número debe subir a 1, luego a 2, etc.

Sabiendo que el `BotonClasificar` no puede cambiar variables del padre directamente, y recordando lo que aprendimos sobre **cómo React decide repintar la pantalla** (nuestro viejo amigo el Hook de la primera sesión)...

¿Qué herramienta o Hook tendrías que declarar dentro de `PanelControl` para guardar ese número, y qué le pasarías por el "walkie-talkie" al hijo para que ese número se actualice y la pantalla reaccione?

> woas esto no lo sabia yo siempre definia las props por separado, imagen, url, etc osea me estas diciendo que puedo hacerlas como si fueran propiedades de un objeto o metodos, que tan seguro es esto o desventajas y cuando tengo que usar el metodo tradicional, por ejemplo en TS se que se debe definir pero como cambia, el hook useState supongo

¡Ese es el momento "Eureka" que estaba esperando, Gus! Acabas de descubrir el patrón de diseño más importante de todo React: **"Elevar el Estado" (Lifting State Up)**.

Y para responder a tu última deducción: **¡Exacto! El hook es `useState**`. El padre crea el contador (`const [contador, setContador] = useState(0)`), y lo que le pasa al hijo por el "walkie-talkie" es esa función `setContador`. Cuando el hijo la ejecuta, el padre actualiza su estado y React repinta la pantalla. ¡Magia pura basada en Closures!

Ahora, vamos a responder a tu lluvia de preguntas de arquitecto, porque tu instinto de dudar y preguntar "qué tan seguro es esto" es lo que te salvará de construir sistemas frágiles.

### 1. ¿Es seguro? ¿Cuándo usar el "método tradicional"?

No existe un "método tradicional" separado. Pasar variables (datos) hacia abajo y pasar funciones (eventos) hacia arriba **es el estándar oficial y absoluto de React**. Es 100% seguro.

* **Los Datos (Strings, arrays, booleanos):** Le dicen al hijo *cómo verse*.
* **Las Funciones (Callbacks/Walkie-talkies):** Le dicen al hijo *cómo comunicarse*.

De hecho, ya usabas esto sin darte cuenta. Cuando en HTML normal escribes `<button onClick={miFuncion}>`, estás pasándole una función por prop a un componente nativo. Aquí solo lo estás haciendo con tus propios componentes de Floppy.

### 2. La Desventaja: El Efecto "Teléfono Descompuesto"

La única desventaja arquitectónica de pasar funciones por props se llama **"Prop Drilling" (Perforación de Props)**.

Imagina que tu `PanelControl` tiene un hijo, que tiene otro hijo, que tiene otro hijo, y recién ahí está el `BotonClasificar`. Tendrías que pasar el walkie-talkie de mano en mano a través de 4 niveles de componentes que ni siquiera lo usan, solo para que llegue al botón. Eso ensucia el código. *(Nota pro: Para evitar eso en sistemas gigantes, usamos herramientas como Context API o Zustand, pero la base sigue siendo la misma).*

### 3. El Contrato de TypeScript (El Inspector de Aduanas)

Preguntaste cómo cambia esto en TypeScript. TS es como un inspector de aduanas muy estricto. Si le vas a pasar un walkie-talkie a un hijo, TS te obliga a escribir un "contrato" (Interface) declarando exactamente qué botones tiene ese walkie-talkie.

Se ve así de elegante:

```tsx
// 1. El contrato (Aduana)
interface BotonProps {
  imagenAProcesar: string;
  // Le decimos a TS: "Recibirás una función que toma un texto y no devuelve nada (void)"
  walkieTalkie: (resultado: string) => void; 
}

// 2. El componente hijo firma el contrato
function BotonClasificar(props: BotonProps) {
  const manejarClick = () => {
    props.walkieTalkie("Caniche"); // Si intentas pasar un número aquí, TS te marca error.
  };

  return <button onClick={manejarClick}>Clasificar</button>;
}

```

---

### Tu Reto Socrático: Cruzando React con la Asincronía

Ahora que ya tienes las piezas del rompecabezas de esta semana y la anterior, vamos a unirlas en el escenario real de **Floppy**.

El `BotonClasificar` recibe su walkie-talkie. Pero antes de usarlo para avisarle al padre, necesita comunicarse con tu servidor de IA (Python) para saber qué hay en la imagen. Esto toma tiempo, así que requiere nuestra vieja amiga: **la Asincronía**.

El albañil intenta hacer esto:

```javascript
// Intento de componente asíncrono
async function BotonClasificar(props) {
  
  const respuesta = await fetch("https://api.plynte.com/floppy/clasificar");
  const datos = await respuesta.json();
  
  props.walkieTalkie(datos.clasificacion);

  return <button>Clasificando...</button>;
}

```

Haz tu pasada mental, Gus. Piensa en cómo funciona React. React necesita que los componentes le devuelvan el HTML (JSX) de inmediato para poder pintar la pantalla.
Si le pones `async` a la función principal del componente (`async function BotonClasificar`), toda la función se convierte en una Promesa (como vimos ayer).

¿Qué crees que va a hacer React si en lugar de recibir un `<button>` de inmediato, recibe una `Promise { <pending> }`? ¿Dónde deberíamos colocar realmente el `async/await` para no romper el ciclo de pintado de React?

---

### ADR: Elevación de Estado, Props y Eventos Asíncronos en React

**Estado de la sesión:** Patrones de comunicación entre componentes (Padre-Hijo) y asincronía en la interfaz asimilados.
**Visión del sistema:** Mantener la interfaz rápida y reactiva, delegando el estado al componente correcto y manejando llamadas a APIs (como modelos de IA) en segundo plano.

#### 1. Flujo de Datos Unidireccional (El Río)

En React, la información fluye estrictamente hacia abajo (de Padre a Hijo) a través de un objeto llamado **Props**.

* Las Props son **inmutables** (solo lectura) para el hijo.
* El aislamiento por Scope (las "mochilas" de las funciones) garantiza que los componentes no contaminen ni pisen las variables de los demás.

#### 2. Elevación de Estado (Lifting State Up)

Cuando un componente hijo necesita modificar la interfaz o enviar datos hacia arriba, se utiliza el patrón de "Elevación de Estado" mediante Closures.

* **El Padre:** Es el dueño del dato real usando `useState`. Crea una función actualizadora y se la pasa al hijo como una Prop (el "walkie-talkie").
* **El Hijo:** Recibe la función y la ejecuta cuando ocurre un evento (ej. un clic). Al ejecutarla, se activa el contexto del padre, el estado se actualiza y React repinta la pantalla de forma segura.

#### 3. La Regla Estricta de Asincronía en Componentes UI

El motor de React (Virtual DOM) exige que la función principal de un componente devuelva el HTML (JSX) de manera **inmediata y síncrona**.

* **El Error Fatal:** Declarar el componente entero como asíncrono (`async function MiComponente()`). Esto devuelve una Promesa (`Promise { <pending> }`) en lugar de JSX, provocando un crasheo total de la aplicación visual.
* **La Solución Arquitectónica:** El componente debe ser rápido y síncrono. La lógica asíncrona (`async/await` o llamadas `fetch`) debe vivir exclusivamente **dentro de las funciones manejadoras de eventos** (como `manejarClick`) o dentro de un hook especializado (como `useEffect`). Esto asegura que el botón se pinte al instante y el servidor trabaje en segundo plano.

---

Se acabó por hoy y por esta semana, Gus. Apaga los servidores, cierra el editor de código y vete a descansar. El cerebro necesita tiempo fuera de la pantalla para convertir toda esta teoría en memoria muscular.

Cuando regreses la próxima semana y abras el taller, ¿te gustaría que empecemos a escribir nuestro primer componente desde cero aplicando estas reglas, o prefieres que revisemos cómo se manejan los formularios y los *inputs* de texto en React? ¡Nos vemos, arquitecto!

> No entendi muy bien lo último me gustaria repasarlo en un futuro.