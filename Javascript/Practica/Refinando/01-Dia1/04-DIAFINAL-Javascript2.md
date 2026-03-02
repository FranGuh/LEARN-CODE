Perfecto. Aquí tienes **otro README**, enfocado **100% a entrevistas de JavaScript**, desde **fundamentos reales de industria** hasta **ejercicios típicos explicados con el porqué**.
Está pensado para **leer, repetir, practicar y explicar en voz alta**.

Guárdalo como:
`README_ENTREVISTA_JAVASCRIPT.md`

---

# README — JavaScript para Entrevistas

**Trainee / Junior sólido**

---

## 1. ¿Qué esperan realmente de JavaScript en entrevistas JR?

No esperan:

* Frameworks avanzados
* Metaprogramación
* Optimizaciones extremas

Sí esperan:

* Fundamentos claros
* Saber **por qué** haces algo
* Evitar bugs comunes
* Pensamiento lógico
* Complejidad básica (Big O)

---

## 2. Tipos de datos en JavaScript

### Primitivos

* `number`
* `string`
* `boolean`
* `null`
* `undefined`
* `symbol`
* `bigint`

👉 **Se pasan por valor**

### Objetos

* `object`
* `array`
* `function`

👉 **Se pasa la referencia al objeto**

📌 **Pregunta típica**

> ¿Por qué modificar un objeto dentro de una función puede ser peligroso?

Porque todas las referencias apuntan al mismo objeto en memoria.

---

## 3. Funciones en JavaScript

### 3.1 Función normal

```js
function suma(a, b) {
  return a + b
}
```

Características:

* Tiene `this`
* Tiene `arguments`
* Puede usarse con `new`
* Hoisting completo

---

### 3.2 Función flecha (arrow function)

```js
const suma = (a, b) => a + b
```

Características:

* **No tiene `this` propio**
* No tiene `arguments`
* Más predecible
* Ideal para callbacks

📌 **Pregunta típica**

> ¿Cuándo NO usarías una arrow function?

Respuesta:

* Métodos de objetos
* Cuando necesitas `this`
* Constructores

---

## 4. Métodos clave de arrays (MUY preguntados)

### 4.1 `map`

Transforma elementos → **nuevo array**

```js
const nums = [1, 2, 3]
const dobles = nums.map(n => n * 2)
```

* No muta
* Misma longitud
* Funcional

📌 Uso típico: transformar datos de API

---

### 4.2 `filter`

Filtra elementos → **nuevo array**

```js
const pares = nums.filter(n => n % 2 === 0)
```

* Reduce elementos
* No muta

---

### 4.3 `reduce`

Reduce a un solo valor

```js
const suma = nums.reduce((acc, n) => acc + n, 0)
```

Usos:

* Sumas
* Contadores
* Agrupaciones
* Mapas

📌 Pregunta frecuente:

> ¿Por qué `reduce` es más complejo?

Porque requiere entender acumulador + estado.

---

### 4.4 `find`

Devuelve **el primer elemento** que cumple condición

```js
users.find(u => u.id === 3)
```

---

### 4.5 `some` / `every`

```js
nums.some(n => n > 10)
nums.every(n => n > 0)
```

* `some` → al menos uno
* `every` → todos

---

### 4.6 `split` / `join`

```js
"hola mundo".split(" ")
["hola", "mundo"].join("-")
```

MUY común en entrevistas básicas.

---

## 5. Mutabilidad e Inmutabilidad

### Mutar (❌ cuidado)

```js
arr.push(5)
obj.x = 10
```

### No mutar (✅ preferido)

```js
[...arr, 5]
{ ...obj, x: 10 }
```

📌 **Pregunta típica**

> ¿Por qué evitar mutar datos?

* Bugs silenciosos
* Difícil de debuggear
* Rompe funciones puras
* Problemas en React

---

## 6. Funciones puras

Una función pura:

1. Mismo input → mismo output
2. Sin efectos secundarios

```js
function suma(a, b) {
  return a + b
}
```

❌ Impura:

```js
let total = 0
function sumar(a) {
  total += a
}
```

📌 Clave de industria:

* Testeable
* Predecible
* Escalable

---

## 7. Big O (Complejidad temporal)

### O(1) — constante

```js
arr[0]
```

### O(n) — lineal

```js
for (let i of arr) {}
```

### O(n²) — cuadrática

```js
for (...) {
  for (...) {}
}
```

📌 **Pregunta típica**

> ¿Por qué usar `set` en vez de `array` para búsquedas?

Porque:

* `set` → O(1)
* `array` → O(n)

---

## 8. Estructuras de datos básicas

### Array

* Ordenado
* Permite duplicados
* Búsqueda lineal

### Set

* Valores únicos
* No orden garantizado
* Búsqueda rápida

### Object / Map

* Clave → valor
* Ideal para contadores y lookup

---

## 9. Árboles (nivel básico esperado)

No esperan implementación completa.

Solo que sepas:

* Qué es un árbol
* Que existe:

  * Árbol binario
  * Árbol de búsqueda

📌 Idea clave:

> Cada nodo puede tener hijos.

Uso real:

* DOM
* Estructuras jerárquicas
* Índices

---

## 10. Ejercicios típicos de entrevista

### Ejercicio 1 — No repetir valores

```js
function tieneDuplicados(arr) {
  const set = new Set(arr)
  return set.size !== arr.length
}
```

**Por qué**:

* `Set` elimina duplicados
* Comparar tamaños

---

### Ejercicio 2 — Primer no repetido

```js
function noRepetido(arr) {
  const count = {}

  for (let n of arr) {
    count[n] = (count[n] || 0) + 1
  }

  for (let n of arr) {
    if (count[n] === 1) return n
  }

  return null
}
```

**Por qué**:

* Dos pasadas
* Preserva orden
* O(n)

---

### Ejercicio 3 — Two Sum

```js
function twoSum(nums, target) {
  const map = {}

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i]
    if (map[diff] !== undefined) {
      return [map[diff], i]
    }
    map[nums[i]] = i
  }
}
```

**Por qué**:

* Hash map
* O(n)
* Lookup rápido

---

## 11. Errores comunes en entrevistas JS

❌ No explicar el porqué
❌ Mutar sin darse cuenta
❌ Confundir `==` con `===`
❌ No saber Big O
❌ Respuestas vagas

✅ Pensar en voz alta
✅ Usar ejemplos simples
✅ Decir “no estoy seguro, pero razonaría así”

---

## 12. Frases que suman puntos

* “Esto evita efectos secundarios”
* “Esto es O(n)”
* “Aquí prefiero inmutabilidad”
* “Uso un hash para búsquedas rápidas”
* “Esto mejora la legibilidad”

---

## Conclusión realista

Con este README:

* Estás **listo para Trainee**
* Estás cerca de **JR sólido**
* No estás lejos de Mid, pero aún no

Tu problema **no era JavaScript**
Era **estructura, vocabulario y práctica dirigida**

---

Si quieres el siguiente nivel, puedo:

* Convertir esto en **examen cronometrado**
* Hacer **entrevista dura solo JS**
* Crear **rutina diaria tipo SimuLearn**

Dime cuál y seguimos.
