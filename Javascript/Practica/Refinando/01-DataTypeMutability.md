# Tipos de datos y mutabilidad.

JavaScript organiza su memoria. Se divide en dos lugares: **el Stack (Pila) y el Heap (Montículo)**.

1. Tipos Primitivos (Pasados por Valor) Son: 
    ```javascript
    String, Number, Boolean, null, undefined, Symbol, BigInt.
    ```

**Dónde viven: En el Stack (memoria rápida, estática y ordenada).** 
Cómo funcionan:
```javascript
Cuando haces
let a = "Hanna" // El valor real ("Hanna") se guarda directamente en la variable.
Si haces 
let b = a // JavaScript hace una copia exacta y física del valor.
//Si cambias b, a ni se entera.
```

Inmutabilidad: **Los primitivos son inmutables.** No puedes cambiar la 'H' por una 'P' internamente. 
```javascript
Cuando haces 
a = "Panna" // estás destruyendo el valor anterior y creando uno nuevo.
```

2. Tipos de Referencia (Pasados por Referencia) Son: 
    ```javascript
    Objects, Arrays, Functions.
    ```

**Dónde viven: El contenido real del objeto vive en el Heap (memoria dinámica, para cosas grandes).**

Cómo funcionan: **La variable en el Stack NO guarda el objeto.** Guarda una dirección de memoria (un puntero o referencia) que apunta hacia el Heap.

```javascript
Cuando hiciste 
const usuarioActualizado = usuarioBD // solo copiaste el puntero.
// Ambas variables tienen la llave de la misma casa. 
// Si uno entra y pinta una pared (mutación), el otro la verá pintada.
```

3. La verdadera función de const
   **const solo bloquea la variable en el Stack.** Es decir, no te deja cambiar el puntero hacia otra casa en el Heap.
   **Pero a const no le importa lo que hagas dentro de la casa.** Por eso pudiste cambiar el rol.

4. La Solución Real en JS (Clonación)
    Para hacer lo equivalente a tu [:] de Python en JavaScript, usamos el Spread Operator (...) o Object.assign(). Esto crea un Shallow Copy (Copia superficial), **creando una nueva casa en el Heap con los mismos muebles.**

```javascript
// Solución Moderna (Spread Operator)
const usuarioActualizado = { ...usuarioBD }; 

// Solución Antigua
const usuarioActualizado = Object.assign({}, usuarioBD);

usuarioActualizado.rol = "admin";
console.log(usuarioBD.rol); // Imprimirá "user". ¡Logrado!
```