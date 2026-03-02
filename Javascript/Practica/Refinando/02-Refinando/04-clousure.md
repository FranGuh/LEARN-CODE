# Javascript

## Clousure

Tienes una función que retorna otra función (closure). La función interna usa una variable de la externa. ¿Qué pasa con esa variable cuando la función externa termina de ejecutarse?


```javascript
var name;
function(){
    name = Pedro
    return fuction(name)
}
```

Fortalezas
Asincronía y Event Loop: Comprendes muy bien el orden de ejecución entre el código síncrono, las microtareas (como las Promesas) y las macrotareas (como setTimeout).

Gestión de Memoria y Referencias: Tienes claro cómo funcionan el Stack y el Heap al asignar objetos, identificando correctamente que múltiples variables pueden apuntar a la misma dirección de memoria.

Hoisting y Temporal Dead Zone: Dominas el comportamiento del hoisting con funciones tradicionales y entiendes perfectamente qué provoca una TDZ al declarar variables con `let`.

Buenas Prácticas (Comparaciones y Funciones Puras): Aplicas el rigor necesario al elegir `===` para evitar la coerción de tipos y conoces la regla innegociable de aislar los efectos secundarios en la programación funcional.

Aspectos a mejorar
Closures (Clausuras): Es importante repasar cómo se preserva el entorno léxico. Las variables de una función externa no desaparecen ni lanzan un ReferenceError al terminar; el closure las mantiene 'vivas' y accesibles para la función interna en todo momento.

Scope de 'var' vs 'let'/'const': Recuerda que `var` no respeta el scope de bloque (como las llaves de un bloque `if` o `for`). Solo se limita al scope de función o global, por lo que la variable será accesible fuera de las llaves independientemente de si usas strict mode.

Métodos Declarativos de Arrays: Aunque `.forEach()` sirve para iterar y ejecutar acciones secundarias, si el objetivo es obtener un subconjunto específico de un arreglo (como filtrar usuarios activos), `.filter()` es la herramienta correcta y más declarativa porque retorna un nuevo arreglo directamente.

```javascript
function creadorLetras(letraInicial) { 
    let letra = letraInicial;
    return () => console.log(letra);
    }
const primera = creadorLetras('Estribillo');
```