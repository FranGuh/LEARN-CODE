De acuerdo. Te dejo **otro README**, pensado como **material de estudio integral para entrevistas Trainee / Auxiliar de Programación**, con **teoría + preguntas típicas + ejercicios + errores comunes**.
Está escrito para **memorizar, practicar y explicar**, no para lucirte.

Puedes guardarlo como `README_ESTUDIO_BACKEND.md`.

---

# README — Guía Integral de Estudio

**Auxiliar de Programación / Trainee (Web, BD, APIs, Seguridad)**

---

## 1. Bases de Datos (BD)

### 1.1 ¿Qué es una base de datos?

Una base de datos es un **sistema organizado para almacenar, consultar y modificar información** de forma eficiente y segura.

Ejemplo:

* Usuarios
* Productos
* Órdenes
* Pagos

📌 **Frase entrevista**:

> Una base de datos permite persistir información de forma estructurada para su consulta y actualización.

---

## 1.2 Base de datos relacional

Una BD relacional organiza los datos en **tablas** relacionadas entre sí.

* Filas → registros
* Columnas → atributos
* Relación → claves (PK, FK)

Ejemplo:

* `usuarios`
* `ordenes`
* `productos`

---

## 1.3 Claves (Keys)

### Primary Key (PK)

* Identifica de forma única un registro
* No se repite
* No es nula

```sql
id INT PRIMARY KEY
```

### Foreign Key (FK)

* Relaciona tablas
* Apunta a una PK de otra tabla

```sql
usuario_id INT REFERENCES usuarios(id)
```

📌 Error común: no usar claves y duplicar información.

---

## 1.4 Normalización de bases de datos

### ¿Qué es normalizar?

Es el proceso de **organizar los datos para evitar duplicación e inconsistencias**.

---

### Primera Forma Normal (1FN)

* No campos repetidos
* Valores atómicos (no listas)

❌ Mal:

```
telefonos = "123,456"
```

✅ Bien:

```
telefono
123
456
```

---

### Segunda Forma Normal (2FN)

* Cumple 1FN
* Los campos dependen **de toda la clave**

---

### Tercera Forma Normal (3FN)

* No dependencias indirectas
* Cada campo depende solo de la PK

📌 **Frase entrevista**:

> Normalizar reduce redundancia y mejora la integridad de los datos.

---

## 2. SQL — Lenguaje de consultas

### 2.1 ¿Qué es SQL?

SQL es el lenguaje para **consultar, insertar, actualizar y eliminar datos** en bases de datos relacionales.

---

### 2.2 Consultas básicas

#### SELECT

```sql
SELECT * FROM usuarios;
```

#### WHERE

```sql
SELECT * FROM usuarios WHERE edad > 18;
```

#### INSERT

```sql
INSERT INTO usuarios (nombre, email)
VALUES ('Ana', 'ana@mail.com');
```

#### UPDATE

```sql
UPDATE usuarios SET nombre = 'Luis'
WHERE id = 1;
```

#### DELETE

```sql
DELETE FROM usuarios WHERE id = 1;
```

📌 Error común: `DELETE` sin `WHERE`.

---

### 2.3 JOIN (MUY preguntado)

```sql
SELECT usuarios.nombre, ordenes.total
FROM usuarios
JOIN ordenes ON usuarios.id = ordenes.usuario_id;
```

Tipos:

* INNER JOIN
* LEFT JOIN
* RIGHT JOIN

📌 **Frase entrevista**:

> Un JOIN permite consultar datos relacionados de varias tablas.

---

### 2.4 Índices

* Mejoran búsquedas
* Aumentan velocidad
* Consumen espacio

```sql
CREATE INDEX idx_email ON usuarios(email);
```

---

## 3. APIs

### 3.1 ¿Qué es una API?

Una API es una **interfaz que permite que sistemas se comuniquen**.

Ejemplo:

* Frontend ↔ Backend
* App ↔ Servidor
* Servicio ↔ Servicio

---

### 3.2 API REST (fundamentos)

Principios:

* Usa HTTP
* Usa métodos (GET, POST, PUT, DELETE)
* Usa recursos (`/usuarios`, `/productos`)
* Usa JSON

Ejemplo:

```http
GET /api/usuarios
```

---

### 3.3 Códigos HTTP importantes

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 500 Internal Server Error

📌 **Frase entrevista**:

> Los códigos HTTP indican el resultado de la operación realizada.

---

## 4. Seguridad y protocolos

### 4.1 HTTP vs HTTPS

* HTTP → texto plano
* HTTPS → cifrado con SSL/TLS

HTTPS protege:

* Credenciales
* Tokens
* Datos sensibles

---

### 4.2 Autenticación vs Autorización

* **Autenticación** → quién eres
* **Autorización** → qué puedes hacer

Ejemplo:

* Login → autenticación
* Permisos → autorización

---

### 4.3 Errores comunes de seguridad

* No validar inputs (SQL Injection)
* Guardar contraseñas sin hash
* Exponer tokens
* No usar HTTPS

---

## 5. PHP y Bases de Datos

### 5.1 PHP como backend

PHP se usa para:

* Conectar a BD
* Procesar formularios
* Crear APIs
* Renderizar vistas

---

### 5.2 Conexión a BD (ejemplo conceptual)

```php
$pdo = new PDO(
  "mysql:host=localhost;dbname=test",
  "user",
  "password"
);
```

---

### 5.3 Consultas seguras (Prepared Statements)

```php
$stmt = $pdo->prepare(
  "SELECT * FROM usuarios WHERE email = ?"
);
$stmt->execute([$email]);
```

📌 Evita SQL Injection.

---

## 6. JavaScript y APIs / BD

### 6.1 JS no accede directo a la BD

JavaScript (frontend):

* Consume APIs
* Envía peticiones HTTP
* Recibe JSON

📌 **Frase entrevista**:

> El frontend no accede a la base de datos directamente, lo hace a través del backend.

---

### 6.2 Fetch básico

```js
fetch('/api/usuarios')
  .then(res => res.json())
  .then(data => console.log(data))
```

---

### 6.3 Métodos comunes en JS

* `map`
* `filter`
* `reduce`
* `find`
* `split`
* `join`

Ejemplo:

```js
usuarios.map(u => u.nombre)
```

📌 MUY preguntados en entrevistas junior.

---

## 7. Ejercicios típicos de entrevista

### Ejercicio 1 — SQL

> Obtener todos los usuarios mayores de 18 años.

```sql
SELECT * FROM usuarios WHERE edad > 18;
```

---

### Ejercicio 2 — JS

> Obtener nombres de usuarios activos.

```js
usuarios
  .filter(u => u.activo)
  .map(u => u.nombre)
```

---

### Ejercicio 3 — Conceptual

> ¿Por qué no exponer la BD al frontend?

Respuesta:

* Riesgo de seguridad
* Pérdida de control
* Escalabilidad

---

## 8. Preguntas típicas que te pueden hacer

* ¿Qué es una base de datos?
* ¿Qué es normalización?
* ¿Qué diferencia hay entre GET y POST?
* ¿Qué es una API?
* ¿Qué es un JOIN?
* ¿Qué es JSON?
* ¿Cómo se conecta PHP a una BD?
* ¿Por qué usar consultas preparadas?
* ¿Cómo consume JS una API?
* ¿Qué es HTTPS?

---

## 9. Errores comunes de Trainee

❌ Memorizar sin entender
❌ Mezclar frontend con backend
❌ No saber explicar conceptos simples
❌ Decir “no sé” sin intentar razonar

✅ Pensar en flujo
✅ Hablar claro
✅ Reconocer límites
✅ Mostrar ganas de aprender

---

## Conclusión

Este README **cubre el 80–90%** de lo que te pueden preguntar para:

* Auxiliar de Programación
* Trainee
* Recién egresado

No te falta capacidad.
Te faltaba **estructura y lenguaje técnico**.

Si quieres, el siguiente paso puede ser:

* Convertir esto en **lista de preguntas tipo examen**
* O **simulación de entrevista SOLO SQL + BD**
* O **ejercicios prácticos progresivos**

Tú eliges.
