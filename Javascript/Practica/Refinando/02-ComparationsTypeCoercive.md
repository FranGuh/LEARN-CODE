# Comparación de tipos coersiva.

En JavaScript existen tres formas de comparar igualdad:

1. Igualdad Débil (==) y Coerción Implícita

```javascript
Cuando haces "5" == 5 
```
El motor de JS (V8 en Node/Chrome) se da cuenta de que los tipos no coinciden. Antes de comparar, hace una Coerción Implícita (convierte silenciosamente el string "5" a un número 5). 
```javascript
Al final compara 5 == 5 y da true.
```

**Regla de oro: Evítalo el 99% de las veces.**

2. Igualdad Estricta (===)

Compara el tipo de dato y el valor. No hace coerción. Es más rápido y seguro.
```javascript
 "5" === 5 falla de inmediato porque String no es Number.
```

3. La utilidad de Object.is()

```javascript
Dijiste que es "similar a ===". 
// Es cierto, pero se inventó en ES6 para solucionar dos bugs matemáticos e históricos de ===:
```

```javascript
En JS, NaN === NaN da false // (lo cual es un dolor de cabeza). 
Pero Object.is(NaN, NaN) da true.
En JS, +0 === -0 da true. 
Pero Object.is(+0, -0) da false.
```


4. El único caso de uso profesional para ==
Hay un patrón de diseño en JavaScript llamado "Nullish check".

Si quieres saber si una variable no tiene valor (ya sea null o undefined), usar == te ahorra código:

JavaScript
```javascript
// Con === (Largo)
if (usuario.rol === null || usuario.rol === undefined) { ... }

// Con == (Pro, Junior Sólido / Mid)
if (usuario.rol == null) { ... } 
// Esto funciona mágicamente porque en JS, null == undefined es TRUE.
```