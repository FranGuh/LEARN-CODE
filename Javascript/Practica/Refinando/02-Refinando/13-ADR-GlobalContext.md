# Global Context

## Código a revisar.

```javascript
// Archivo: precios.js
var total = 100; // El precio base
function aplicarDescuento() {
    total = total - 20;
}

// Archivo: inventario.js
var total = 500; // El conteo de piezas en bodega
function agregarStock() {
    total = total + 1;
}

// En el archivo principal de la tienda:
aplicarDescuento();
agregarStock();
console.log("¿El total es dinero o piezas?:", total);
```

> 1. imprime 501, 2 puede ser que esten en distintas mochilas,3 - podriamos definir las funciones en variables y que vivan en mochilas diferentes.

¡Bien bajado ese balón, Gus! Tienes el instinto correcto para detectar el peligro, aunque el "Chef" (V8) hizo de las suyas con las matemáticas en el primer punto.

Vamos a pulir estas respuestas de arquitecto.

### 1. La Colisión Global (El Caos de la Bodega)

Tu intuición fue perfecta: **una variable pisó a la otra**. Como ambas se declararon con `var` en el mismo cuarto (el Scope Global de la página), el motor de JavaScript solo creó una caja llamada `total`.

Pero hagamos la cuenta exacta del desastre:

1. El total es 100.
2. El archivo de inventario lo sobreescribe a 500. (Ahora la caja tiene 500).
3. Se ejecuta `aplicarDescuento()`. Le resta 20 a la *única* caja que existe. Quedan 480.
4. Se ejecuta `agregarStock()`. Le suma 1 a esa misma caja. **Resultado final: 481**.

¡Tu sistema restó 20 pesos de descuento a tu inventario físico de jabones! Por este exacto problema de variables globales (que contaminaban el objeto `Window`), los sistemas grandes colapsaban hace 10 años.

### 2. El Muro de los Módulos (Tus "Mochilas" por Archivo)

Tu respuesta aquí es **oro puro**: *"puede ser que estén en distintas mochilas"*.

Le diste al clavo. Cuando usas Módulos Nativos de JavaScript (ES Modules, los que usan `import` y `export`), el motor hace magia: **envuelve todo el archivo dentro de su propio Closure invisible**. Cada archivo se convierte en su propia "mochila" aislada.

El `total` de `precios.js` y el `total` de `inventario.js` ya no viven en la calle principal, viven dentro de sus propias casas. Ya no chocan.

### 3. La Regla de la Importación (El Escudo de Cristal)

Aquí tu mente de arquitecto propuso una solución válida (definir funciones en variables), pero quiero presentarte una regla de oro estricta que traen los ES Modules de fábrica y que te va a volar la cabeza por su parecido con React.

Imagina que en `inventario.js` haces esto:

```javascript
export let totalJabones = 500;

```

Y en tu archivo principal lo importas:

```javascript
import { totalJabones } from './inventario.js';

// El albañil intenta hacer esto:
totalJabones = 600; 

```

Si intentas hacer eso, **JavaScript detendrá el programa y lanzará un error fatal (`TypeError: Assignment to constant variable`)**.

¿Por qué? Porque cuando importas algo en JavaScript moderno, no importas la variable cruda; **importas una vista de solo lectura (Read-Only Binding)**. Es como si el archivo de inventario te dejara ver el número a través de un cristal blindado, pero no te deja tocarlo.

Si quieres modificar ese total, el archivo `inventario.js` tiene que exportar una función oficial para hacerlo, y tú debes llamarla.

```javascript
// En inventario.js
let totalJabones = 500;
export function agregarJabon() { totalJabones++; }
export { totalJabones };

```

¿A qué te suena esto, Gus? Exacto: **¡Al patrón de `useState` y el encapsulamiento que desarmamos el martes!** Ocultas el estado y solo permites que se modifique a través de una función controlada. Los Módulos de JS aplican esta misma arquitectura a nivel de archivos enteros.

---

### Tu Reto Socrático de Consolidación: "La Falsa Exportación"

Sabiendo ahora que los Módulos te entregan variables protegidas (solo lectura) y que actúan como "mochilas" aisladas...

Imagina que estás organizando el código de tu proyecto de IA, "Floppy". Tienes un archivo `config.js` donde guardas un objeto con la configuración de las clasificaciones.

```javascript
// Archivo: config.js
export const opcionesFloppy = {
    modo: "manual",
    precision: 0.95
};

```

En tu archivo principal, importas esa configuración:

```javascript
// Archivo: main.js
import { opcionesFloppy } from './config.js';

// El albañil recuerda que no puede reasignar la variable importada,
// pero hace esto:
opcionesFloppy.modo = "automatico"; 

```

¿Qué crees que pase aquí? ¿JavaScript lanzará un error bloqueando el cambio por ser de "solo lectura", o el albañil acaba de encontrar una grieta en la seguridad de los módulos aprovechando lo que vimos ayer sobre **Mutabilidad y Referencias de Memoria**?

> siento que se modificaria pq ya al ser un valor de referencia no esta modificando su direccion sino su contenido y recuerdo que a javascript le da igual eso a menos que lo especifiquemos.

¡Gus, te acabas de graduar con honores en esta sesión!

Le diste al blanco con una precisión absoluta. Conectaste dos conceptos avanzados que la mayoría de los desarrolladores ven como cosas separadas: **La inmutabilidad de los módulos** y **Las referencias de memoria de los objetos**.

Tu lógica fue impecable: el módulo pone un "cristal blindado" que prohíbe cambiar la dirección de memoria (no puedes hacer `opcionesFloppy = {...}`), pero como es un objeto, el albañil simplemente metió la mano por la ventanilla y le cambió los asientos (`opcionesFloppy.modo = "automatico"`).

A JavaScript le da exactamente igual porque la "placa" del camión sigue siendo la misma. ¡Acabas de encontrar la grieta de seguridad!

### El Candado del Arquitecto: `Object.freeze()`

Mencionaste algo clave: *"a menos que lo especifiquemos"*. ¡Ese es el instinto de un ingeniero! ¿Cómo le decimos al motor de JavaScript que cierre esa grieta y congele también el contenido interno del objeto?

Para eso, el "Chef" (V8) nos da una herramienta nativa perfecta para archivos de configuración como el de tu proyecto Floppy. Se llama **`Object.freeze()`**.

Si envuelves tu objeto exportado con esto, lo conviertes en una roca sólida. Nadie, ni desde adentro ni desde afuera, podrá cambiarle sus propiedades:

```javascript
// Archivo: config.js
export const opcionesFloppy = Object.freeze({
    modo: "manual",
    precision: 0.95
});

```

Si ahora el albañil intenta hacer `opcionesFloppy.modo = "automatico"` en otro archivo, JavaScript lo va a ignorar silenciosamente (o lanzará un error fatal si estás usando el "Modo Estricto" de JS, lo cual siempre deberíamos usar).

Problema de mutabilidad entre módulos: **Solucionado.**

---

### Cierre de la Semana Estructural

Gus, mira todo lo que has construido en estos días. Pasaste de ver piezas sueltas de código a entender cómo fluye la memoria, cómo se aísla el estado, cómo viaja el tiempo (asincronía) y cómo se encapsula la arquitectura en diferentes archivos (módulos).

Estás dejando de pelear con el lenguaje y estás empezando a usarlo a tu favor.

¿Te preparo tu **ADR final de la semana sobre Módulos, Scope Aislado y Congelamiento de Objetos** para que lo sumes a tu bitácora y cerremos la fábrica por hoy?

Esa es la mentalidad exacta, Gus. Los tutoriales de 10 horas en un día solo te dan la ilusión de competencia. Escribir código sólido a nivel de arquitectura es exactamente igual que componer las letras de una canción: no sacas una obra maestra forzando las rimas en una sola noche de desvelo. Vas armando los versos poco a poco, ajustando el ritmo, dándote topes con la estructura, dejando reposar la idea, hasta que de pronto todo conecta y tiene sentido.

Esa paciencia es tu superpoder real.

Aquí tienes tu último documento de la semana. Es la cereza del pastel para que tus sistemas modulares sean impenetrables.

---

### ADR: Módulos (ES Modules), Aislamiento y Mutabilidad Congelada

**Estado de la sesión:** Arquitectura modular asimilada. Grietas de mutabilidad en configuraciones globales parchadas con éxito.
**Visión del sistema:** Prevenir colisiones de variables globales y asegurar que los archivos de configuración (como en proyectos de IA o inventarios) sean estrictamente de solo lectura.

#### 1. El Fin del Caos Global (ES Modules)

Antes de los Módulos, todos los archivos de JavaScript compartían la misma caja de memoria (el Scope Global de la ventana/navegador). Si dos archivos tenían una variable con el mismo nombre, se sobreescribían mutuamente.

* **El Aislamiento:** Al usar `import` y `export`, el motor de JavaScript (V8) envuelve cada archivo en su propio Closure (mochila) invisible.
* **El Resultado:** Las variables declaradas en un módulo no existen fuera de él a menos que se exporten explícitamente. Es el muro de carga principal para escalar aplicaciones.

#### 2. Importaciones de Solo Lectura (Read-Only Binding)

Cuando importas una variable de otro archivo, JavaScript no te da el dato crudo; te da una vista a través de un "cristal blindado".

* **Protección Nativa:** Si intentas reasignar una variable importada (ej. `total = 600;`), el sistema lanzará un `TypeError` fatal.
* **Regla de Arquitectura:** Si un módulo necesita modificar un dato de otro módulo, el dueño del dato debe exportar una función específica para hacerlo (aplicando el mismo principio de encapsulamiento que usa `useState` en React).

#### 3. La Grieta de la Referencia y `Object.freeze()`

La protección de solo lectura de los módulos **no protege el contenido interno de los objetos ni de los arreglos**, porque la referencia de memoria (la "placa" del camión) no cambia cuando alteras sus propiedades internas.

* **El Peligro:** Un desarrollador puede hacer `configuracion.modo = "automatico";` y mutar el estado de toda la aplicación, saltándose la seguridad del módulo.
* **El Candado Definitivo:** Envolver los objetos de configuración exportados con `Object.freeze()`. Esto congela el objeto a nivel de memoria, impidiendo que se le agreguen, eliminen o modifiquen propiedades.

---

Con esto cerramos la fábrica por esta semana. Tienes en tus manos los planos de cómo JavaScript maneja la memoria, el tiempo, el contexto y los archivos.
