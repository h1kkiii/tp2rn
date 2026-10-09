# Trabajo Práctico N° 2 — Expo Router: rutas, navegación, pilas y colas

**Taller Complementario – React Native II** · Tecnicatura Superior en Desarrollo de Software Multiplataforma · Instituto Politécnico Formosa

| | |
|---|---|
| **Alumno** | Natanael Duarte |
| **Fecha de entrega** | 02-10-26 |
| **Repositorio** |  |

> Este archivo contiene las respuestas de las Partes A a F. La Parte G (sistema "Comedor IPF") está documentada en `README.md`.

## Índice

- [Parte A · Estructuras de datos: la pila y la cola](#parte-a--estructuras-de-datos-la-pila-y-la-cola)
- [Parte B · Rutas basadas en archivos](#parte-b--rutas-basadas-en-archivos)
- [Parte C · Navegar: Link, router y la pila](#parte-c--navegar-link-router-y-la-pila)
- [Parte D · Navegadores: Stack, Tabs y Drawer](#parte-d--navegadores-stack-tabs-y-drawer)
- [Parte E · Rutas dinámicas, parámetros y hooks](#parte-e--rutas-dinámicas-parámetros-y-hooks)
- [Parte F · Redirecciones, rutas protegidas y deep links](#parte-f--redirecciones-rutas-protegidas-y-deep-links)

---

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

**a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?**

> **Respuesta:** LIFO es *Last In, First Out* ("el último en entrar es el primero en salir") y es la **pila**. FIFO es *First In, First Out* ("el primero en entrar es el primero en salir") y es la **cola**.

**b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?**

> **Respuesta:** En la pila se entra y se sale por el mismo extremo, el **tope**. En la cola se entra por el **final** y se sale por el **frente**, que son extremos opuestos.

**c) Ejemplo de la vida real y de una app móvil para cada una.**

| Estructura | Vida real | App móvil |
|---|---|---|
| Pila | Una pila de platos para lavar: saco siempre el de arriba, que fue el último que apoyé. | El historial de un Stack: "atrás" saca la última pantalla abierta. En mi app, "Deshacer último" del carrito. |
| Cola | La fila del comedor: atienden primero al que llegó primero. | Una cola de descargas o de mensajes por enviar. En mi app, la cola de pedidos de la cocina. |

> **Respuesta:** La pila sirve para "volver atrás" o deshacer (sale lo último que entró) y la cola para atender por orden de llegada (sale lo primero que entró).

### A2. Seguimiento de una pila

| Paso | Instrucción | Pila (base → tope) |
|---|---|---|
| 1 | `push('Inicio')` | [Inicio] |
| 2 | `push('Productos')` | [Inicio, Productos] |
| 3 | `push('Detalle 3')` | [Inicio, Productos, Detalle 3] |
| 4 | `pop()` | [Inicio, Productos] |
| 5 | `push('Perfil')` | [Inicio, Productos, Perfil] |
| 6 | `tope()` → (1) | [Inicio, Productos, Perfil] (no cambia) |
| 7 | `pop()` → (2) | [Inicio, Productos] |
| 8 | `tope()` → (3) | [Inicio, Productos] (no cambia) |
| 9 | `vacia` → (4) | [Inicio, Productos] (no cambia) |

> **Respuesta:**
> - (1): `'Perfil'`
> - (2): `'Perfil'` (lo saca de la pila)
> - (3): `'Productos'`
> - (4): `false`. `vacia` es un getter: se lee como propiedad, sin paréntesis, y todavía quedan dos elementos.
> - Estado final (base → tope): `[Inicio, Productos]`

### A3. Seguimiento de una cola

| Paso | Instrucción | Cola (frente → final) |
|---|---|---|
| 1 | `encolar('Ana')` | [Ana] |
| 2 | `encolar('Beto')` | [Ana, Beto] |
| 3 | `desencolar()` | [Beto] (sale Ana) |
| 4 | `encolar('Caro')` | [Beto, Caro] |
| 5 | `encolar('Dani')` | [Beto, Caro, Dani] |
| 6 | `frente()` → (1) | [Beto, Caro, Dani] (no cambia) |
| 7 | `desencolar()` → (2) | [Caro, Dani] |
| 8 | `vacia` → (3) | [Caro, Dani] (no cambia) |

> **Respuesta:**
> - (1): `'Beto'`
> - (2): `'Beto'` (lo saca de la cola)
> - (3): `false`
> - Estado final (frente → final): `[Caro, Dani]`

### A4. Análisis de la implementación

**a) ¿Qué significa el `#` en `#items` y qué problema evita?**

> **Respuesta:** El `#` hace que `#items` sea un **campo privado** de la clase. Solo se puede usar desde adentro de la clase, y si alguien escribe `p.#items` desde afuera, JavaScript da error de sintaxis. Así nadie puede hacer `p.items.splice(...)` o `p.items.unshift(...)` y meter o sacar elementos por el medio: la única forma de tocar la pila es con `push`, `pop` y `tope`, y se respeta el LIFO. En mi app eso garantiza que la cola de pedidos solo se modifique con `encolar` y `desencolar`, y nadie se cuela.

**b) Problema de rendimiento de `shift()` con colas grandes y cómo lo resuelven las colas "serias".**

> **Respuesta:** `shift()` saca el primer elemento del array, pero después tiene que correr un lugar hacia adelante a **todos** los demás (el que estaba en el índice 1 pasa al 0, y así). Eso es O(n): con una cola de 100.000 elementos, cada desencolar mueve 99.999. Las colas "serias" no mueven nada. Guardan el índice del frente y lo avanzan al desencolar, que es O(1), o usan un buffer circular o una lista enlazada. Yo usé el índice del frente (ver A5).

**c) ¿Qué método de array usa la pila para sacar y cuál la cola? ¿Por qué no pueden usar el mismo?**

> **Respuesta:** La pila saca con `pop()`, que quita el **último** elemento (el tope). La cola básica saca con `shift()`, que quita el **primero** (el frente). No pueden usar el mismo porque sacan por extremos distintos: si la cola usara `pop()`, atendería al último que llegó y dejaría de ser FIFO. En mi `Cola` no uso `shift()`: avanzo el índice `#inicio`.

### A5. Programación: una cola eficiente

```js
// ColaEficiente.js
class ColaEficiente {
  #items = [];
  #inicio = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#inicio];
    this.#items[this.#inicio] = undefined; // libero la referencia
    this.#inicio++;                        // avanzo el frente: no muevo nada
    return elemento;
  }

  frente() {
    return this.vacia ? undefined : this.#items[this.#inicio];
  }

  get vacia() {
    return this.tamanio === 0;
  }

  get tamanio() {
    return this.#items.length - this.#inicio;
  }
}
```

**Prueba rápida:**

```js
const cola = new ColaEficiente();
cola.encolar('Pedido 1');
cola.encolar('Pedido 2');
cola.encolar('Pedido 3');
console.log(cola.desencolar()); // 'Pedido 1'
console.log(cola.frente());     // 'Pedido 2'
console.log(cola.tamanio);      // 2
console.log(cola.desencolar()); // 'Pedido 2'
console.log(cola.desencolar()); // 'Pedido 3'
console.log(cola.vacia);        // true
console.log(cola.desencolar()); // undefined
```

> **Respuesta:** `#inicio` guarda el índice del elemento que está al frente. `encolar` hace `push` al final del array. `desencolar` lee `#items[#inicio]`, pone `undefined` en esa posición para no retener memoria y suma 1 a `#inicio`. Los demás elementos no se mueven, así que desencolar es O(1) y no hace falta `shift()`. El tamaño real es `#items.length - #inicio`. Lo probé con Node y la salida es la de los comentarios. Es el mismo código que `src/estructuras/Cola.ts`; allá además tiene tipos genéricos (`Cola<T>`) y el método `aArray()`, que devuelve `#items.slice(#inicio)`.

### A6. Pila y cola dentro de Expo Router

**a) ¿Qué estructura describe el historial de un Stack? ¿Qué pantalla es la visible y qué operación hace "atrás"?**

> **Respuesta:** Una **pila**. La pantalla visible es la del **tope**, la última que se abrió. "Atrás" hace un **pop**: saca la pantalla del tope y queda visible la de abajo. Abrir una pantalla nueva (`push`) la apila arriba. En mi app, en la tab Menú la pila queda `[/menu, /menu/1]` y "atrás" saca `/menu/1`.

**b) ¿Qué estructura usa Expo Router para las acciones de navegación? ¿Qué pasa si el usuario toca dos links muy rápido?**

> **Respuesta:** Una **cola**. Cada `Link` o llamada a `router` no navega en el momento: agrega la acción a una cola (`routingQueue`) y Expo Router las procesa en orden de llegada, FIFO. Lo vi en el código de expo-router 57 (`build/global-state/routingQueue.js`): `add()` hace `push` al final y `run()` las va sacando del frente y despachando una por una. Si el usuario toca dos links muy rápido, se encolan las dos y se ejecutan en el orden en que las tocó: la segunda navegación se aplica sobre el resultado de la primera, sin que se pisen ni se mezclen.

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | `/`. El grupo `(tabs)` no suma a la URL y `index` es la raíz de su carpeta. |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/:id` (ej.: `/productos/3`). Ruta dinámica. |
| `src/app/docs/[...slug].tsx` | `/docs/...` con uno o más segmentos (ej.: `/docs/react/hooks`). Catch-all. |
| `src/app/_layout.tsx` | No es una pantalla: define el navegador (por ejemplo, el Stack raíz) que envuelve a las rutas de esa carpeta. |
| `src/app/+not-found.tsx` | No es una ruta visitable por nombre: es la pantalla 404 para cualquier URL que no coincida. |
| `src/app/Boton.tsx` | `/Boton`. **Es el problema**: genera una ruta nueva. |

> **Respuesta:** Todos los archivos de `src/app` son rutas, menos `_layout` (navegador) y `+not-found` (404). `Boton.tsx` genera un problema: como está dentro de `src/app`, Expo Router lo toma como pantalla y crea la ruta `/Boton`, que aparece en `/_sitemap` y se puede visitar, aunque es solo un componente. Los componentes van fuera de `src/app`; en mi app están en `src/components`.

### B2. De la URL al archivo

| URL | Archivo |
|---|---|
| `/categorias/bebidas` (y cualquier otra) | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...articulo].tsx` |
| `/ayuda` (pantalla propia) | `src/app/ayuda/index.tsx` |

> **Respuesta:** Las categorías usan una ruta dinámica `[categoria]` (un segmento). El buscador es un archivo común, porque `q` y `categoria` son parámetros de búsqueda (después del `?`) y no necesitan corchetes. Los artículos de ayuda de profundidad variable usan el catch-all `[...articulo]`. `/ayuda` necesita su propio `index.tsx` porque el catch-all recibe al menos un segmento. Lo comprobé con el componente `DondeEstoy`: en `/ayuda/pagos/efectivo`, `useLocalSearchParams()` devuelve `{ articulo: ['pagos', 'efectivo'] }`.

### B3. Verdadero o falso

| Afirmación | V/F | Justificación (si es F) |
|---|---|---|
| a) Cada pantalla nueva se registra en una tabla de configuración | F | Con Expo Router, crear el archivo en `src/app` ya crea la ruta. No hay que registrarla a mano. |
| b) Los `_layout.tsx` son pantallas visitables | F | Definen el navegador (Stack, Tabs, Drawer) de su carpeta. No tienen URL propia. |
| c) Una carpeta `(tabs)` no aparece en la URL | V | |
| d) Conviene `npm install` porque trae la última versión | F | La última versión puede no ser compatible con el SDK y romper Expo Go. Se usa `npx expo install`, que elige la versión compatible con SDK 57. |
| e) `"main": "expo-router/entry"` reemplaza al viejo `App.tsx` | V | |
| f) `/_sitemap` lista todas las rutas y sirve para depurar | V | |
| g) Con `docs/index.tsx` y `docs/[...slug].tsx`, `/docs` muestra `index.tsx` | V | |
| h) En SDK 57, expo-router usa versión mayor 57 | V | |

> **Respuesta:** Expo Router usa rutas basadas en archivos: el archivo define la ruta y los grupos no aparecen en la URL. La entrada de la app es `expo-router/entry` (está en mi `package.json`) y `/_sitemap` muestra todas las rutas generadas. Para g), en mi app `/ayuda` la atiende `ayuda/index.tsx` y no el catch-all. Para h), lo verifiqué en `node_modules/expo-router/package.json` (versión `57.0.25`) y en la doc versionada de SDK 57, que indica que la versión de Expo Router coincide con la del SDK. Los paquetes siempre los instalo con `npx expo install` (por ejemplo `@expo/vector-icons`).

---

## Parte C · Navegar: Link, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | Apila siempre una pantalla nueva arriba, aunque ya exista. |
| `router.navigate(href)` | En un Stack, apila la pantalla salvo que la de arriba ya sea esa misma ruta con los mismos parámetros (en ese caso no la duplica). Si el destino está en otro navegador (por ejemplo otra tab), cambia a ese navegador. |
| `router.replace(href)` | Reemplaza la pantalla del tope por la nueva. La pila queda del mismo tamaño. |
| `router.back()` | Hace pop: saca la pantalla del tope. |
| `router.dismissTo(href)` | Saca pantallas hasta llegar a `href`. Si `href` no está en la pila, reemplaza la actual por `href`. |
| `router.dismissAll()` | Saca todas las pantallas del Stack menos la primera. |
| `router.canGoBack()` | No modifica nada: devuelve `true` o `false` según haya adónde volver. |
| `router.setParams({...})` | No modifica la pila: cambia los parámetros (la URL) de la pantalla actual. |

> **Respuesta:** `push` y `navigate` agregan pantallas, `replace` cambia el tope, y `back`, `dismissTo` y `dismissAll` sacan. `canGoBack` y `setParams` no tocan la pila. Sobre `navigate`: la doc de Expo dice que "apila o vuelve a una ruta existente". Leyendo el código del Stack en expo-router 57 (`build/layouts/StackClient.js`), solo evita duplicar cuando la pantalla de arriba es la misma ruta con los mismos parámetros; si no, apila. Para volver a una pantalla que está más abajo hay que usar `dismissTo`.

### C2. Simulación de la pila

Pila inicial: `[ /productos ]`

| # | Instrucción | Pila resultante (base → tope) |
|---|---|---|
| 1 | `router.push("/productos/1")` | [/productos, /productos/1] |
| 2 | `router.push("/productos/2")` | [/productos, /productos/1, /productos/2] |
| 3 | `router.navigate("/productos/5")` | [/productos, /productos/1, /productos/2, /productos/5] |
| 4 | `router.push("/perfil")` | [/productos, /productos/1, /productos/2, /productos/5, /perfil] |
| 5 | `router.replace("/buscar")` | [/productos, /productos/1, /productos/2, /productos/5, /buscar] |
| 6 | `router.back()` | [/productos, /productos/1, /productos/2, /productos/5] |
| 7 | `router.dismissTo("/productos")` | [/productos] |
| 8 | `router.canGoBack()` → | [/productos] → `false` |

> **Respuesta:** La pila final es `[ /productos ]` y `canGoBack()` devuelve `false` porque queda una sola pantalla. El paso clave es el 3: `/productos/[id]` está arriba con `id = 2` y `navigate` va a `id = 5`. Es la misma ruta pero con otro parámetro, así que `navigate` **apila** `/productos/5`: no reemplaza a la 2 ni vuelve a la 1. Solo la reemplazaría si fuera exactamente `/productos/2`. Lo verifiqué en el código del Stack de expo-router 57 (`StackClient.js`): compara el id de la pantalla de arriba (nombre de ruta + parámetros dinámicos) con el del destino. Supuse, como plantea el ejercicio, que todas las pantallas están en un mismo Stack.

### C3. ¿Link o router?

| Situación | Link / router | Método o prop | Justificación |
|---|---|---|---|
| a) Toca la tarjeta de un producto | Link | `<Link href={{ pathname: '/productos/[id]', params: { id } }} asChild>` | Es una navegación que dispara el usuario al tocar. Además, en web es un `<a href>` real. |
| b) Formulario guardado, API OK → pantalla de éxito | router | `router.replace('/exito')` | Se navega después de una lógica (esperar la API). Con `replace`, "atrás" no vuelve al formulario ya enviado. |
| c) "Cancelar" en un modal | router | `router.back()` | Solo hay que cerrar el modal (sacarlo del tope), no ir a una ruta nueva. |
| d) Login exitoso → pantalla principal | router | `router.replace('/')` o, mejor, `Stack.Protected` | Va después de validar las credenciales. Con `push`, "atrás" volvería al login. En mi app no navego: el guard de `Stack.Protected` cierra el login solo. |
| e) Del detalle de un pedido a la lista, 3 pantallas abajo | Link | `<Link href="/pedidos" dismissTo>` | Lo toca el usuario. `dismissTo` saca las 3 pantallas hasta la lista en vez de apilar una cuarta. |

> **Respuesta:** Uso `<Link>` cuando el usuario toca algo para ir a otra pantalla y `router` cuando la navegación pasa después de una lógica: guardar, validar, esperar una API o confirmar un pedido. En mi app, las tarjetas de platos son `Link`, y `/confirmar` usa `router.replace` después de encolar el pedido.

### C4. Escribí el código

**a) `<Link>` al producto 8 con `href` como objeto**

```tsx
<Link href={{ pathname: '/productos/[id]', params: { id: '8' } }}>Ver producto 8</Link>
```

**b) `<Link>` a `/perfil` que siempre apile**

```tsx
<Link href="/perfil" push>
  Ir a mi perfil
</Link>
```

**c) `Pressable` propio como link a `/carrito` con `asChild`**

```tsx
<Link href="/carrito" asChild>
  <Pressable style={estilos.boton}>
    <Text style={estilos.textoBoton}>Ver carrito</Text>
  </Pressable>
</Link>
```

> **Respuesta:**
> - a) Con `href` como objeto, `pathname` es el patrón de la ruta con corchetes y `params` le pasa el valor, siempre como texto. Con rutas tipadas, TypeScript valida que el `pathname` exista. En mi app lo uso en `TarjetaPlato`: `{ pathname: '/menu/[id]', params: { id: String(plato.id) } }`.
> - b) La prop `push` fuerza a apilar siempre una pantalla nueva, aunque ya esté en la pila.
> - c) Con `asChild`, el `Link` no dibuja su propio texto: le pasa el `href` y el `onPress` al hijo, que es mi `Pressable`. El hijo tiene que recibir un solo objeto de estilo, no un array (ver F5-a).
>
> Los compilé con `npx tsc --noEmit` dentro de mi proyecto. c) compila tal cual. En a) y b), las rutas tipadas marcan error porque `/productos/[id]` y `/perfil` son de la app de ejemplo de la consigna y no existen en Comedor IPF; eso muestra que el chequeo funciona. En mi app, el equivalente de a) compila: `{ pathname: '/menu/[id]', params: { id: '8' } }`.

### C5. Pensar

**¿Qué ventaja tiene que cada `<Link>` sea un `<a href>` real en la web? ¿Qué pasa en el celular?**

> **Respuesta:** En la web, al ser un `<a href>` real, el navegador lo trata como un link de verdad. Se puede abrir en otra pestaña, copiar la dirección o tocar con el botón derecho, los buscadores lo indexan (SEO), funciona la accesibilidad y el historial del navegador acompaña a la navegación. En el celular no hay `<a>`: `Link` se dibuja como un `Text` (o como el hijo con `asChild`) y al tocarlo despacha la acción de navegación al navegador nativo. Uso el mismo código en las dos plataformas.

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | Sí, cada pantalla nueva va arriba (pila). | No. Cambia entre pestañas hermanas y cada una conserva su estado. | No. Cambia entre secciones del menú lateral. |
| ¿Cómo cambia de pantalla el usuario? | Tocando links o botones. Vuelve con "atrás" o con el gesto de deslizar. | Tocando las pestañas de la barra inferior. | Abriendo el menú lateral (botón ☰ o deslizando desde el borde) y eligiendo una opción. |
| ¿Desde dónde se importa en SDK 57? | `import { Stack } from 'expo-router'` | `import { Tabs } from 'expo-router/js-tabs'` | `import { Drawer } from 'expo-router/drawer'` |
| Un caso de uso típico | Lista → detalle (`/menu` → `/menu/[id]`). | Secciones principales de la app (Inicio, Menú, Carrito). | Una sección con varias pantallas al mismo nivel, como la cocina (Cocina y Atendidos). |

> **Respuesta:** El Stack es una pila de pantallas, mientras que Tabs y Drawer alternan entre pantallas hermanas. Verifiqué los imports en el expo-router 57 instalado. Importar `Tabs` desde `'expo-router'` todavía funciona, pero está marcado como `@deprecated` y la recomendación es `'expo-router/js-tabs'`. El Drawer está en `'expo-router/drawer'`. En mi app: Stack raíz, Tabs con Inicio, Menú y Carrito, y Drawer en la sección cocina.

### D2. Cada tab tiene su pila

**Productos → detalle 4 → Inicio → Productos. ¿Qué pantalla ve? ¿Por qué? ¿Qué app de uso diario se comporta así?**

> **Respuesta:** Ve el **detalle 4**. Cada tab tiene su propio Stack, y cambiar de tab no borra la pila de la anterior: queda guardada `[/productos, /productos/4]` y al volver se ve el tope. Así se comportan Instagram o YouTube: si estabas viendo un perfil en la pestaña de búsqueda, vas a Inicio y volvés, seguís en ese perfil. En mi app pasa lo mismo: si abro el detalle de un plato en la tab Menú, voy a Carrito y vuelvo a Menú, sigo viendo el detalle.

### D3. ¿Dónde va cada pantalla?

| Pantalla | Stack raíz / dentro de una tab | Motivo |
|---|---|---|
| a) Detalle de producto con barra visible | Dentro de la tab | Tiene que mantener visible la barra de pestañas. En mi app, `/menu/[id]` está en el Stack de la tab Menú. |
| b) Modal de confirmar compra que tapa la barra | Stack raíz | Tiene que tapar la barra. En mi app, `/confirmar` con `presentation: 'modal'`. |
| c) Login como modal | Stack raíz | Es un modal que tapa todo y además se protege desde el layout raíz (`/login`). |
| d) "Mis pedidos anteriores" dentro de Perfil | Dentro de la tab (Perfil) | Es parte del flujo de esa pestaña y la barra sigue visible, como mi `/carrito/nota` dentro de la tab Carrito. |

> **Respuesta:** Si la pantalla tiene que dejar visible la barra de pestañas, va dentro del Stack de esa tab. Si la tiene que tapar (modales, login, confirmaciones), va en el Stack raíz.

### D4. Configurar el Stack

**a) Diferencia entre `screenOptions` y las `options` de un `Stack.Screen`.**

> **Respuesta:** `screenOptions` va en el navegador (`<Stack screenOptions={...}>`) y se aplica a **todas** sus pantallas. `options` va en un `<Stack.Screen name="..." options={...}>` y se aplica a **esa** pantalla sola, pisando lo de `screenOptions`. En mi Drawer de cocina uso `screenOptions` para poner el botón "Salir" en las dos pantallas, y `options` para el título de cada una.

**b) ¿Por qué `(tabs)` tiene `headerShown: false`?**

> **Respuesta:** Porque las pantallas de las tabs ya tienen su propio header: el de las Tabs o el del Stack de cada tab. Si el Stack raíz también mostrara el suyo, habría dos headers uno arriba del otro.

**c) `perfil-publico.tsx` existe pero no está declarada en el Stack: ¿existe la pantalla? ¿Para qué sirve declararla?**

> **Respuesta:** Sí, existe: con Expo Router el archivo ya crea la ruta y el Stack la incluye con las opciones por defecto. Declararla con `<Stack.Screen name="perfil-publico" options={...} />` sirve para configurarla (título, `presentation`, `headerShown`, etc.), fijar el orden y poder meterla dentro de un `Stack.Protected`.

**d) Cuatro valores de `presentation`. ¿Cuál para una hoja inferior al 50%?**

> **Respuesta:** Cuatro valores: `'card'` (el default, entra desde el costado), `'modal'`, `'transparentModal'` y `'formSheet'`; también existen `'fullScreenModal'`, `'containedModal'` y `'pageSheet'`. Para una hoja inferior al 50% uso `presentation: 'formSheet'` con `sheetAllowedDetents: [0.5]`. Según los tipos de expo-router 57, `sheetAllowedDetents` solo funciona con `formSheet`.

**e) ¿Cómo cambiar el título del header desde la pantalla de detalle para que diga "Producto 7"?**

```tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <>
      <Stack.Screen options={{ title: `Producto ${id}` }} />
      <Text>Detalle del producto {id}</Text>
    </>
  );
}
```

> **Respuesta:** Pongo un `<Stack.Screen options={{ title: ... }} />` adentro de la propia pantalla: el Stack que la contiene toma esas opciones. Con `id = '7'` el header dice "Producto 7". En mi app lo hago en `/menu/[id]` con `title: plato.nombre`.

### D5. Tabs y Drawer en SDK 57

**a) ¿Qué cambió en SDK 57 al importar Tabs? ¿Qué alternativa experimental existe?**

> **Respuesta:** Desde SDK 56 las Tabs de JavaScript vienen incluidas en expo-router (no se instala `@react-navigation/bottom-tabs`). En SDK 57 se importan desde `'expo-router/js-tabs'`; importarlas desde `'expo-router'` sigue funcionando pero está marcado como deprecado en los tipos del paquete. La alternativa experimental son las **Native Tabs**, que usan la barra de pestañas nativa del sistema y se importan desde `'expo-router/unstable-native-tabs'`. Según la doc, se estabilizan como `'expo-router/native-tabs'` en SDK 58.

**b) ¿Qué dos paquetes necesita el Drawer y qué componente va en el layout raíz para los gestos?**

> **Respuesta:** Necesita `react-native-gesture-handler` y `react-native-reanimated`. En SDK 56+ la doc indica también `react-native-worklets`, que reanimated 4 usa por dentro. Se instalan con `npx expo install`. En el layout raíz va `GestureHandlerRootView` envolviendo toda la app, para que funcionen los gestos (como deslizar para abrir el Drawer). La página del Drawer de la doc no lo menciona explícitamente, pero es el requisito de gesture-handler, y en mi app lo puse en `src/app/_layout.tsx`.

**c) ¿Hace falta instalar `@react-navigation/drawer` en SDK 57? ¿Por qué?**

> **Respuesta:** No. Desde SDK 56 el Drawer viene incluido en expo-router y se importa desde `'expo-router/drawer'`. La documentación de SDK 57 además aclara que expo-router ya no admite importar paquetes `@react-navigation/*` desde el código de la app. Solo se instala `@react-navigation/drawer` en SDK 54-55.

**d) Con navegadores anidados, ¿en qué navegador actúa `router.back()`?**

> **Respuesta:** En el navegador más profundo que tiene adónde volver, el que contiene la pantalla enfocada. Si ese navegador no puede volver (está en su primera pantalla), la acción sube al navegador padre. En mi app: en `/menu/1`, `back()` hace pop en el Stack de la tab Menú y vuelve a `/menu`. En `/categorias/bebidas` actúa sobre el Stack raíz y vuelve a las tabs.

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

**Código original:**

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const producto = productos.find((p) => p.id === id);
  if (id === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

**Explicación del error:** Los parámetros de la URL llegan **siempre como texto**: `id` es `'3'`, no `3`. En cambio `p.id` es un número. Por eso `p.id === id` compara número con texto y con `===` nunca es verdadero: el producto nunca se encuentra y siempre sale "No existe". Lo mismo pasa con `id === 3`, que TypeScript además marca como error porque `string` y `number` no se pueden comparar. Tampoco se valida que el id sea un número: `/productos/abc` debería mostrar un mensaje claro.

**Código corregido:**

```tsx
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { productos } from '@/data/productos';

export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumerico = Number(id); // '3' -> 3, 'abc' -> NaN

  // Validación: tiene que ser un número entero (descarta NaN, 1.5, etc.).
  if (!Number.isInteger(idNumerico)) {
    return <Text>El id &quot;{id}&quot; no es válido</Text>;
  }

  const producto = productos.find((p) => p.id === idNumerico);
  if (idNumerico === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

> **Respuesta:** El parámetro se convierte con `Number(id)`, se valida con `Number.isInteger` y recién después se compara contra `p.id`, número con número. Es lo que hago en mi `/menu/[id]`: `/menu/999` y `/menu/abc` muestran "No existe el plato …" con un link al menú, sin crash.

### E2. Catch-all

| URL | `slug` |
|---|---|
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | No llega al catch-all: con `docs/index.tsx`, `/docs` la atiende `index.tsx` y `slug` no existe. |

> **Respuesta:** El catch-all recibe los segmentos como **array** de strings, uno por cada parte de la ruta, y atrapa cualquier profundidad. En mi app, `/ayuda/pagos/efectivo` da `articulo = ['pagos', 'efectivo']` y lo uno con `join('/')` para buscar el artículo. Para `/docs` sola, como hay un `index.tsx`, gana el index (igual que mi `/ayuda`). La doc no aclara qué pasaría sin `index.tsx`; por eso en mi app la pantalla índice tiene su propio archivo.

### E3. Anatomía de una URL

URL: `rutasipf://buscar?q=mate&categoria=bebidas`

**a) Scheme, ruta y parámetros de búsqueda.**

| Parte | Valor |
|---|---|
| Scheme | `rutasipf` |
| Ruta | `/buscar` |
| Parámetros | `q=mate` y `categoria=bebidas` |

**b) ¿Qué devuelve `useLocalSearchParams()` en `buscar.tsx`?**

```ts
{ q: 'mate', categoria: 'bebidas' }
```

**c) ¿Hacen falta corchetes en el nombre del archivo para recibir `q`? ¿Por qué?**

No. Los corchetes son para los **segmentos dinámicos de la ruta** (`/productos/[id]`). `q` es un parámetro de búsqueda (después del `?`), y cualquier pantalla puede leerlo con `useLocalSearchParams` sin cambiar el nombre del archivo. Por eso mi buscador es `buscar.tsx`.

**d) Dos razones para usar `router.setParams({ q: texto })` en vez de `router.push`.**

1. `setParams` **no apila pantallas**: cambia los parámetros de la pantalla actual. Con `push`, cada letra escrita sería una pantalla nueva y "atrás" recorrería la búsqueda letra por letra.
2. La búsqueda **queda en la URL** sin desmontar ni volver a animar la pantalla. El `TextInput` no pierde el foco y la búsqueda se puede compartir con un link (`comedoripf://buscar?q=chipa&categoria=desayuno`).

> **Respuesta:** El scheme identifica la app, la ruta elige la pantalla y los parámetros de búsqueda se leen con `useLocalSearchParams`, sin corchetes. En mi buscador, el `TextInput` y los chips de categoría llaman a `router.setParams`: la búsqueda vive en la URL y "atrás" sale del buscador de una.

### E4. ¿Dónde estoy?

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | `'/productos/3'` | `'/buscar'` |
| `useSegments()` | `['(tabs)', 'productos', '[id]']` | `['buscar']` |
| `useLocalSearchParams()` | `{ id: '3' }` | `{ q: 'chipa' }` |

> **Respuesta:** `usePathname()` devuelve la URL real sin grupos y sin la parte del `?`. `useSegments()` devuelve los segmentos **del archivo**: incluye los grupos como `(tabs)` y los nombres con corchetes como `[id]`. `useLocalSearchParams()` junta los parámetros de la ruta y los de búsqueda, siempre como texto. Lo comprobé con mi componente `DondeEstoy`: en `/menu/1` muestra `/menu/1`, `["(tabs)","menu","[id]"]` y `{"id":"1"}`, y en `/buscar?q=chipa&categoria=desayuno` muestra `/buscar`, `["buscar"]` y `{"q":"chipa","categoria":"desayuno"}`.

### E5. Local vs global

**a) Diferencia entre `useLocalSearchParams` y `useGlobalSearchParams`. ¿Cuál es la opción por defecto y por qué?**

> **Respuesta:** `useLocalSearchParams` devuelve los parámetros de la ruta **de esa pantalla** y solo se actualiza cuando cambian los suyos. `useGlobalSearchParams` devuelve los de la URL **actual de toda la app** y re-renderiza la pantalla cada vez que cambia la URL, aunque esa pantalla esté abajo en la pila y no se vea. La opción por defecto es `useLocalSearchParams`: evita re-renders innecesarios y datos equivocados. Por ejemplo, si `/productos/1` queda debajo de `/productos/2`, con el global la pantalla 1 vería `id = 2`.

**b) ¿Para qué sirve `useFocusEffect`? Ejemplo.**

```tsx
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Text } from 'react-native';

import { useComedor } from '@/context/ComedorContext';

export default function Cocina() {
  const { cantidadEnEspera } = useComedor();

  useFocusEffect(
    useCallback(() => {
      // Se ejecuta cada vez que la pantalla gana el foco (incluso al volver con "atrás").
      console.log(`Cocina enfocada: ${cantidadEnEspera} pedidos en espera`);
      return () => {
        // Limpieza: se ejecuta cuando la pantalla pierde el foco.
        console.log('Cocina sin foco');
      };
    }, [cantidadEnEspera]),
  );

  return <Text>Pedidos en espera: {cantidadEnEspera}</Text>;
}
```

> **Respuesta:** `useFocusEffect` ejecuta un efecto **cada vez que la pantalla gana el foco** y su limpieza cuando lo pierde. `useEffect` corre solo al montar, y en un Stack la pantalla de abajo sigue montada, así que al volver con "atrás" no se vuelve a ejecutar. `useFocusEffect` sí. Sirve para refrescar datos al volver a una pantalla o para pausar algo cuando se sale. El callback va dentro de `useCallback` para que no se ejecute en cada render.

**c) `/productos/mate` abre el detalle aunque no exista. ¿Es error de Expo Router? ¿De quién es la responsabilidad?**

> **Respuesta:** No es un error de Expo Router. La ruta `[id]` coincide con **cualquier** texto en ese segmento: el router solo mira la forma de la URL, no sabe qué productos existen. Validar el parámetro es responsabilidad del desarrollador, dentro de la pantalla: convertirlo, chequearlo y mostrar un mensaje si no existe. Es lo que hago en `/menu/[id]`, `/categorias/[categoria]` y `/turno/[numero]`.

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a) ¿Qué hace `<Redirect href="/productos" />` y a qué método de router equivale?**

> **Respuesta:** Apenas se renderiza, navega a `/productos` **reemplazando** la pantalla actual, que nunca llega a verse. Equivale a `router.replace('/productos')`. En mi app, `/pedido` (la URL vieja) hace `<Redirect href="/carrito" />`.

**b) ¿Por qué una redirección debe reemplazar y no apilar? Describí el problema.**

> **Respuesta:** Si apilara, la pantalla que redirige quedaría abajo en la pila. Al tocar "atrás" desde el destino, el usuario volvería a esa pantalla, que lo redirigiría otra vez hacia adelante: quedaría atrapado en un bucle y nunca podría salir con "atrás". Con `replace`, la pantalla que redirige desaparece de la pila.

### F2. Stack.Protected

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```

**a) ¿Qué le pasa a una pantalla cuando su guard es `false`?**

> **Respuesta:** Deja de existir para ese navegador: no se puede navegar a ella, y si se intenta (por un link o un deep link), el navegador redirige a su anchor o a la primera pantalla disponible. Si el guard pasa de `true` a `false` mientras estaba en el historial, sus entradas **se borran** del historial automáticamente. En mi app, sin sesión, abrir `/cocina` termina en `/`.

**b) ¿Por qué el modal de login se cierra solo al iniciar sesión, sin `router.back()`?**

> **Respuesta:** Porque el login está dentro de `<Stack.Protected guard={!conSesion}>`. Al iniciar sesión, `conSesion` pasa a `true`, el guard del login pasa a `false` y Expo Router saca esa pantalla del historial: el modal se cierra solo. Solo cambio el estado; la navegación la resuelve el guard. Lo mismo pasa al revés: si cierro sesión estando en `/cocina/atendidos`, toda la sección cocina desaparece y no se puede volver con "atrás".

**c) Aviso "The action 'NAVIGATE' … was not handled by any navigator": causa y cómo evitarlo.**

> **Respuesta:** Aparece cuando se navega a una ruta que ningún navegador tiene disponible en ese momento. El caso típico es ir a una pantalla protegida cuyo guard es `false`, como `/cocina` sin sesión: la pantalla "no existe" y nadie maneja la acción. Se evita eligiendo el destino según el estado. En mi app, la tarjeta "Cocina" de Inicio usa `href={conSesion ? '/cocina' : '/login'}`, así nunca se navega a una ruta protegida que no existe.

**d) Ventaja de `Stack.Protected` frente a un `<Redirect>` condicional en cada pantalla.**

> **Respuesta:** La protección queda **centralizada** en un solo lugar, el layout, en vez de repetida en cada pantalla, donde es fácil olvidarse de alguna. Además la pantalla protegida ni siquiera se monta ni parpadea antes de redirigir, y Expo Router limpia el historial solo cuando cambia la sesión. Con `<Redirect>` habría que manejar a mano que "atrás" no vuelva a la pantalla privada.

### F3. 404, anchor y rutas tipadas

| Elemento | Para qué sirve | Dónde se define |
|---|---|---|
| a) `+not-found.tsx` | Pantalla 404 para cualquier URL que no coincida con una ruta. En mi app muestra la URL con `usePathname()` y un link al inicio. | `src/app/+not-found.tsx` |
| b) `unstable_settings = { anchor: "(tabs)" }` | Define qué pantalla queda debajo en la pila cuando se entra por un deep link. Así "atrás" vuelve a las tabs en vez de cerrar la app. | Se exporta desde el layout, en mi app `src/app/_layout.tsx`. |
| c) `typedRoutes` | Activa las rutas tipadas: TypeScript conoce todas las rutas y marca error en cualquier `href` que no exista. | En `app.json`: `"experiments": { "typedRoutes": true }`. |

**c) ¿Qué pasa con `<Link href="/prodcutos" />`? ¿Dónde se generan los tipos?**

> **Respuesta:** Con rutas tipadas activas, `"/prodcutos"` (mal escrito) **no compila**: TypeScript marca error porque no es una ruta válida y el error aparece en el editor y en `npx tsc --noEmit`. Sin rutas tipadas, compilaría y en ejecución terminaría en la pantalla 404. Los tipos los genera Expo CLI al correr `npx expo start`, en `.expo/types/router.d.ts` (en mi proyecto se generó ahí). Se incluyen en TypeScript mediante `expo-env.d.ts` y el `include` de `tsconfig.json`. Esa carpeta está en `.gitignore` porque se regenera.

### F4. Deep links

Datos: `"scheme": "comedoripf"` · IP de la compu: `192.168.1.20` · destino: `/menu/7`

| Dónde | URL |
|---|---|
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7` |

**¿Qué significa `/--/` en la URL de Expo Go? ¿Por qué el scheme propio no funciona dentro de Expo Go?**

> **Respuesta:** En Expo Go, la primera parte de la URL (`exp://192.168.1.20:8081`) le dice a Expo Go **qué proyecto** abrir desde el servidor de Metro. El `/--/` es el separador: según la doc, le indica a Expo Go que lo que viene después es la ruta del deep link dentro de la app y no parte de la dirección del proyecto. El scheme propio (`comedoripf://`) no funciona en Expo Go porque el sistema operativo asocia un scheme a la app que lo registró al instalarse. Expo Go es una app genérica que solo registra su propio scheme `exp://`, y `comedoripf://` recién funciona con una build propia (development build o producción). El puerto 8081 es el de Metro y la web se sirve en el mismo puerto (lo confirmé con la salida de `npx expo start`: "Waiting on http://localhost:8081").

### F5. Errores comunes

| Situación | Causa | Solución |
|---|---|---|
| a) "You are passing an array of styles to a child of `<Slot>`" con `asChild` | Con `asChild`, el `Link` le pasa sus props al hijo con un `Slot` que tiene que fusionar estilos. Si el hijo recibe un array de estilos (`style={[a, b]}`), aparece el aviso. | Pasarle al hijo un solo objeto de estilo (uno de `StyleSheet.create`), o combinar los estilos en uno antes. En mi `TarjetaPlato` el `Pressable` recibe `estilos.tarjeta`. |
| b) `src/app/TarjetaProducto.tsx` generó una ruta nueva | Todo archivo dentro de `src/app` es una ruta, así que el componente se volvió la pantalla `/TarjetaProducto`. | Moverlo fuera de `src/app`, por ejemplo a `src/components/TarjetaProducto.tsx`. En `src/app` solo van rutas y layouts. |
| c) `router.push("/")` tras el login → atrás vuelve al login | `push` apila Inicio arriba del login, así que el login queda abajo en la pila. | Usar `router.replace("/")`, o mejor proteger el login con `Stack.Protected guard={!conSesion}` para que desaparezca solo al iniciar sesión. |
| d) Expo Go dice "incompatible" tras `npm install` | `npm install <paquete>` trae la última versión, que puede no coincidir con la que espera el SDK 57 de Expo Go. | Instalar con `npx expo install <paquete>` y corregir lo instalado con `npx expo install --fix`. `npx expo-doctor` muestra qué no coincide. |

> **Respuesta:** Son errores de configuración más que de lógica: estilos con `asChild`, componentes dentro de `src/app`, `push` donde va `replace` y versiones instaladas con npm. A mí me pasó algo parecido a d): `expo-doctor` marcó versiones desalineadas con SDK 57 y lo arreglé con `npx expo install --fix`.

---

## Checklist antes de entregar

- [x] Todas las preguntas de A a F tienen su bloque **Respuesta** completo
- [x] Las tablas de seguimiento (A2, A3, C2) muestran el estado paso a paso
- [x] El código de A5 está probado y coincide con `src/estructuras/Cola.ts`
- [x] Los detalles específicos de SDK 57 (B3-h, D1, D5) fueron verificados en la presentación o en docs.expo.dev
- [x] Los fragmentos de código de C4, D4-e, E1 y F2 compilan sin errores de TypeScript
