# Scope y Hoisting

Para dejar de adivinar y entender Node.js/React a fondo, debes saber que el motor de JavaScript (V8) no lee el código de arriba a abajo una sola vez. **Lo lee DOS veces.**

#### Fase 1: Creación de Memoria (El famoso "Hoisting")
Antes de ejecutar una sola línea, JS escanea tu archivo buscando declaraciones de variables y funciones, y las **"eleva"** (las registra en memoria). Pero las trata diferente:

```javascript
function saludar() { ... } // (Declaración de función): JS eleva el nombre y todo su contenido.
Por eso puedes llamarla en la línea 1 aunque esté definida en la línea 100.

var nombre;: JS eleva la variable, pero la inicializa con un valor por defecto: undefined.
Por eso el primer console.log no da error, sino que imprime undefined.

let edad; y const despedirse;: JS las eleva y las registra en memoria, PERO no las inicializa.
Las mete en un lugar oscuro llamado Temporal Dead Zone (TDZ). 
Si intentas tocarlas antes de la línea donde realmente les asignas un valor, JS entra en pánico y lanza un ReferenceError.
```

#### Fase 2: Ejecución (Código paso a paso)
Aquí es donde JS realmente ejecuta los console.log y asigna los valores reales (= 24, = "Hanna").

##### ¿Por qué falló la Arrow Function?

JavaScript
```javascript
const despedirse = () => { console.log("Adiós"); }
// A nivel de memoria, esto NO es una función para JS en la Fase 1. 
// Es simplemente una constante llamada despedirse. 
Como es un const, JS la manda a la Temporal Dead Zone. 
Cuando intentas hacer despedirse() arriba, JS te dice: 
"Sé que esta constante existe, pero está en la TDZ, aún no tiene ningún valor asignado, y mucho menos es una función". Lanza error.
```

*Saber qué código falla te hace un Junior. Saber explicar por qué falla usando los términos Hoisting, Fases de Ejecución y Temporal Dead Zone te convierte en un Junior sólido / Mid. Las empresas buscan desarrolladores que entiendan cómo el motor procesa el código para evitar "bugs fantasma" que son un dolor de cabeza en producción.*