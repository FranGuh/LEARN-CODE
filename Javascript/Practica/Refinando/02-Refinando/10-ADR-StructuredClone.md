# ADR: Mutabilidad, Referencias de Memoria e Inmutabilidad en React

## Virtual DOM

**Estado de la sesión:** Conceptos asimilados. Paradigma de actualización de estado y rendimiento en Virtual DOM dominado.
**Visión del sistema:** Prevenir cuellos de botella de rendimiento y estado corrupto en aplicaciones masivas.

#### 1. El Fundamento Interno: Valor vs. Referencia

En JavaScript, el motor (V8) guarda la información de dos maneras radicalmente distintas:

* **Por Valor (Primitivos):** Números, Textos (`Strings`), Booleanos. Si copias un número, se crea una caja física nueva e independiente.
* **Por Referencia (Objetos y Arrays):** Como son pesados, V8 no los copia. Solo crea un "letrero" (puntero) que apunta a la misma dirección de memoria física. Si dos variables apuntan al mismo objeto y modificas una, la otra también muta.

#### 2. El Problema: La "Aduana" de React

React utiliza una comparación estricta (`Object.is()`) para decidir si debe ejecutar el algoritmo de Reconciliación (Virtual DOM) y repintar la pantalla.

* **El Error Común:** Modificar un objeto directamente (`producto.stock = 50`) y pasarlo al `useState`.
* **El Resultado:** React ve que la "dirección de memoria" del objeto es la misma de siempre. Asume que nada cambió, se vuelve "ciego" a la mutación interna y la pantalla se queda congelada. Para que React despierte, necesita **una dirección de memoria 100% nueva**.

#### 3. Estrategias de Clonación y Rendimiento

**A. La Copia Superficial (El Machete del Albañil)**
Utiliza el operador *Spread* (`...`). Copia el primer nivel del objeto, pero mantiene las referencias de memoria de los objetos anidados.

```javascript
// Actualizando un estado anidado en React a la vieja escuela
setProducto({
    ...producto, // Copia nivel 1
    detalles: {
        ...producto.detalles, // Copia nivel 2
        ubicacion: "Zona de Ofertas" // Modificación final
    }
});

```

* **Pros (El porqué se usa en React):** Logra algo vital llamado **Compartición Estructural (Structural Sharing)**. Si tienes 50,000 productos y solo clonas uno con el *spread*, los otros 49,999 mantienen su dirección de memoria original. React ignora los viejos y solo repinta el nuevo. Rendimiento puro.
* **Contras:** Código difícil de leer, propenso a errores humanos (olvidar un `...` borra datos) y poco escalable si el objeto tiene muchos niveles de profundidad.

**B. La Copia Profunda (El Bisturí del Arquitecto)**
Utiliza la API moderna del navegador para crear un clon absoluto, rompiendo todos los lazos con el original.

```javascript
// 1. Crear un clon con una dirección de memoria 100% nueva
const productoClonado = structuredClone(producto);

// 2. Modificar con total seguridad
productoClonado.detalles.ubicacion = "Zona de Ofertas";

// 3. Entregar a React
setProducto(productoClonado);

```

* **Pros:** Código limpio, a prueba de balas, fácil de entender y se adapta automáticamente sin importar cuántos niveles de profundidad tenga el objeto. Protege contra mutaciones accidentales.
* **Contras (El riesgo en React):** Si clonas profundamente un estado gigante (ej. toda la lista de inventario) solo para cambiar un producto, React verá que *todos* los productos tienen direcciones de memoria nuevas y repintará la lista entera innecesariamente, matando el rendimiento.

#### 4. Pro-Tip de Arquitectura Empresarial

Para evitar escribir el código feo del *spread operator* sin perder el rendimiento de la *Compartición Estructural*, los sistemas resilientes utilizan librerías externas como **Immer**.
Immer te permite escribir código como si estuvieras mutando directamente el objeto (súper legible), pero por debajo del capó se encarga de hacer los *spreads* automáticamente para entregarle a React las referencias de memoria correctas. Es lo mejor de ambos mundos.

---

Con esta pieza del rompecabezas, ya tienes la infraestructura mental para que tus futuros programas manejen datos pesados sin sudar ni una gota.

Has avanzado a pasos agigantados esta semana, Gus. Para nuestra sesión de mañana, ¿te gustaría hacer un ejercicio práctico integrando todo esto (Closures, Async, Virtual DOM, Referencias), o prefieres que agendemos desde ya ese repaso de "fuego cruzado" sobre tus puntos débiles?

> Repaso de fuego cruzado.