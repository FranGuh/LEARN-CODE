# README — Fundamentos Técnicos para Entrevistas

**Auxiliar de Programación / Trainee (Web & JavaScript)**

## 1. Perfil profesional (respuesta de apertura)

> Soy egresado de Ingeniería en Sistemas Computacionales. Busco mi primer empleo formal como Auxiliar de Programación para consolidar experiencia real en desarrollo, mantenimiento y soporte de aplicaciones. Tengo experiencia en programación web a través de proyectos escolares, residencia profesional y proyectos personales usando JavaScript, React y algunos scripts en Python. Mi objetivo es fortalecer fundamentos técnicos, aprender buenas prácticas de equipo y crecer dentro de la industria.

---

## 2. ¿Por qué me interesa el puesto de Auxiliar de Programación?

> Me interesa porque es un rol donde puedo aprender directamente del código real de la empresa: dar mantenimiento, documentar, apoyar en pruebas y entender cómo se construyen y sostienen sistemas en producción. Busco desarrollar criterio técnico, disciplina de trabajo y bases sólidas antes de especializarme más adelante.

📌 **Clave de entrevista**: no hables de salario, habla de **aprendizaje + operación real**.

---

## 3. Flujo general de una aplicación web

**Explicación a alto nivel**:

1. El usuario interactúa con el navegador (clic, formulario).
2. El navegador envía una **petición HTTP** al servidor.
3. El servidor procesa la petición (lógica, base de datos).
4. El servidor envía una **respuesta HTTP**.
5. El navegador interpreta la respuesta y la muestra al usuario.

> El usuario solo percibe que la página cargó o que la acción se completó.

---

## 4. ¿Qué es una petición HTTP?

Una petición HTTP es un mensaje que el cliente envía al servidor y contiene:

* **Método**: qué acción se quiere realizar
  (`GET`, `POST`, `PUT`, `DELETE`)
* **URL / Endpoint**: a qué recurso se accede
  (`/login`, `/productos/1`)
* **Headers**: metadatos
  (autenticación, tipo de contenido, tokens)
* **Body** (opcional): datos enviados
  (JSON, formulario, etc.)

🔐 **HTTPS** solo asegura que esta información viaje cifrada.

---

## 5. Diferencia entre GET y POST (con ejemplos)

### GET

* Obtiene información
* No debería modificar el estado del servidor
* Datos viajan en la URL
* Es cacheable

```http
GET /productos?categoria=ropa
```

### POST

* Envía o crea información
* Modifica el estado del servidor
* Datos viajan en el body
* No es cacheable por defecto

```http
POST /compras
{
  "producto_id": 3,
  "cantidad": 2
}
```

📌 **Frase entrevista**:

> GET se usa para consultar recursos, POST para enviar datos que cambian el estado del sistema.

---

## 6. ¿Qué es JSON?

**JSON (JavaScript Object Notation)** es:

* Un **formato de texto**
* Para **intercambio de datos**
* Independiente del lenguaje
* No ejecuta código, solo representa datos

Ejemplo:

```json
{
  "id": 1,
  "nombre": "Producto",
  "precio": 100
}
```

📌 **Frase entrevista**:

> JSON es el estándar de facto para la comunicación entre frontend y backend en APIs REST.

---

## 7. `var`, `let` y `const` (JavaScript)

### `var`

* Scope: función o global
* Hoisting: sí, inicializa como `undefined`
* Problema: genera bugs silenciosos
* Uso: código legacy

### `let`

* Scope: bloque `{ }`
* Hoisting: sí, pero con **Temporal Dead Zone**
* Más seguro que `var`

### `const`

* Igual que `let` en scope
* No permite reasignación
* **Sí permite mutar objetos**

```js
const user = { name: "Ana" }
user.name = "Luis" // válido
```

📌 **Frase entrevista**:

> let y const existen para evitar errores derivados del hoisting y del scope poco predecible de var.

---

## 8. Funciones puras

Una función pura cumple:

1. Mismo input → mismo output
2. No tiene efectos secundarios

### Función pura

```js
function suma(a, b) {
  return a + b
}
```

### Función impura

```js
let total = 0
function sumar(a) {
  total += a
  return total
}
```

**Efectos secundarios**:

* Modificar variables externas
* Mutar objetos
* Llamar APIs
* Cambiar DOM
* Escribir en consola

📌 **Importancia**:

* Más fáciles de testear
* Más predecibles
* Menos bugs
* Base de React y código escalable

---

## 9. Mutación de objetos

**Mutar** es modificar un objeto existente sin crear uno nuevo.

### Mutación (peligrosa)

```js
function agregarEdad(persona) {
  persona.edad = 30
}
```

### Sin mutación (recomendado)

```js
function agregarEdad(persona) {
  return { ...persona, edad: 30 }
}
```

📌 **Por qué es peligrosa**:

* Genera bugs silenciosos
* Afecta a todos los que comparten la referencia
* Rompe funciones puras

---

## 10. Paso por valor vs referencia en JavaScript

En JavaScript:

* **Primitivos** → se pasan por valor
* **Objetos** → se pasa la referencia

### Primitivos

```js
let a = 5
let b = a
b = 10
// a sigue siendo 5
```

### Objetos

```js
let obj1 = { x: 1 }
let obj2 = obj1
obj2.x = 99
// obj1.x === 99
```

📌 **Frase entrevista**:

> Cuando se modifica un objeto, todas las variables que apuntan a esa referencia ven el cambio.

---

## 11. Nivel real esperado para Auxiliar / Trainee

✔ Entender flujos web
✔ Conocer fundamentos JS
✔ Saber explicar conceptos básicos
✔ Reconocer riesgos comunes (mutación, scope, estado)

❌ No se espera que seas senior
❌ No se espera arquitectura compleja

---

## Conclusión final

Este README **es suficiente** para:

* Defenderte bien en entrevista
* Responder con claridad
* No improvisar conceptos
* Demostrar base sólida aunque seas Trainee

Si quieres, el siguiente paso lógico es:

* Simular **otra entrevista**, pero **sin correcciones**, como examen real
  o
* Convertir esto en **flashcards / preguntas rápidas** tipo filtro ATS

Tú decides.
