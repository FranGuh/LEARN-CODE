# ADR: Renderizado de Listas, Keys e Inmutabilidad de Arreglos

## Comportamiento de JS en React 

**Estado de la sesión:** Patrones de actualización de listas, clonación y renderizado optimizado asimilados.
**Visión del sistema:** Gestionar colecciones de datos (como historiales, carritos de compra o clasificaciones) sin mutar la memoria original y dándole a React las herramientas para repintar la interfaz con el máximo rendimiento.

#### 1. Inmutabilidad Estricta de Arreglos (La Placa del Camión)

El motor de React evalúa los cambios en el estado comparando referencias de memoria, no el contenido interno.

* **Prohibición de Mutaciones:** Métodos destructivos como `.push()`, `.pop()` o `.splice()` están estrictamente prohibidos sobre variables de estado. Modifican el contenido pero mantienen la misma referencia de memoria, lo que causa el "efecto fantasma" (React ignora el cambio y la pantalla no se actualiza).
* **La Regla:** Toda actualización de una lista exige la creación de un arreglo 100% nuevo (`[]`).

#### 2. Operaciones Seguras en Listas

Para modificar listas sin tocar la memoria original, utilizamos métodos funcionales de JavaScript que siempre devuelven un nuevo arreglo:

* **Agregar (Clonación):** Se utiliza el operador spread (`...`).
`setItems([...itemsViejos, itemNuevo]);`
* **Eliminar (Filtrado):** Se utiliza el método `.filter()`.
`setItems(items.filter(item => item.id !== idABorrar));`

#### 3. El Motor de Renderizado y la Prop `key`

Cuando se utiliza `.map()` para transformar un arreglo de datos en una lista de elementos HTML (JSX), React exige una identidad única para cada nodo.

* **La prop `key`:** Permite a React saber exactamente qué elemento se agregó, se eliminó o cambió de posición, evitando repintar toda la lista entera.
* **El Peligro del Índice:** Usar el índice numérico del ciclo (0, 1, 2) como `key` es un antipatrón grave si la lista puede cambiar (elementos eliminados o reordenados). Causa bugs visuales cruzados y destruye el rendimiento. Siempre se debe usar un identificador único (ID) proveniente del dato real (ej. `gasto.id`).

---

Gus, esta semana diste un salto gigantesco. Ya entiendes la física detrás de los componentes, la reactividad, los formularios controlados y las listas. Ya no eres un albañil pegando bloques de código al azar; estás pensando en direcciones de memoria, flujos de datos y rendimiento.

Guarda este documento en tu bitácora, cierra el taller y ve a descansar. El cerebro asimila todo este conocimiento cuando te alejas de la pantalla.

Para nuestra próxima sesión, tú mandas: ¿quieres que abramos la terminal y empecemos a programar juntos un componente real para tu portafolio en tu dominio, o prefieres que exploremos el último gran misterio de React, el temido `useEffect`?