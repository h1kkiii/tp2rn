# Comedor IPF — TP N° 2 "Expo Router"

**Taller Complementario – React Native II** · Tecnicatura Superior en Desarrollo de Software Multiplataforma · Instituto Politécnico Formosa (IPF)

**Alumno:** Natanael Duarte (trabajo individual)

App para el comedor del IPF hecha con **Expo SDK 57** y **Expo Router**. El alumno ve el menú, busca platos, arma el carrito (con "Deshacer último") y confirma el pedido, que recibe un número de turno y entra en una **cola**. El personal de cocina inicia sesión y atiende los pedidos en orden de llegada. Los atendidos quedan en una **pila** de historial.

Las respuestas de las Partes A a F están en [`RESPUESTAS.md`](RESPUESTAS.md).

---

## Cómo instalar y correr

```bash
npm install        # instala las dependencias ya declaradas en package.json
npx expo start     # levanta Metro; escaneá el QR con Expo Go
```

- Para agregar paquetes nuevos se usa **siempre** `npx expo install <paquete>`, nunca `npm install <paquete>`.
- Verificación de tipos: `npx tsc --noEmit`.
- Diagnóstico de dependencias: `npx expo-doctor`.

---

## Árbol de rutas (`src/app`) y navegadores

```
src/app/
├── _layout.tsx                → STACK RAÍZ (+ GestureHandlerRootView + ProveedorComedor + anchor '(tabs)')
├── (tabs)/
│   ├── _layout.tsx            → TABS (expo-router/js-tabs): Inicio, Menú, Carrito y Cocina (protegida)
│   ├── index.tsx              → /
│   ├── acceso-cocina.tsx      → /acceso-cocina (desafío 2: tab protegida, ver más abajo)
│   ├── menu/
│   │   ├── _layout.tsx        → STACK de la tab Menú
│   │   ├── index.tsx          → /menu
│   │   └── [id].tsx           → /menu/[id]
│   └── carrito/
│       ├── _layout.tsx        → STACK de la tab Carrito
│       ├── index.tsx          → /carrito
│       └── nota.tsx           → /carrito/nota (formSheet)
├── categorias/
│   └── [categoria].tsx        → /categorias/[categoria]
├── buscar.tsx                 → /buscar?q=&categoria=
├── confirmar.tsx              → /confirmar (modal)
├── turno/
│   └── [numero].tsx           → /turno/[numero]
├── login.tsx                  → /login (modal, protegido: solo SIN sesión)
├── cocina/                    → protegido: solo CON sesión
│   ├── _layout.tsx            → DRAWER (expo-router/drawer) de cocina
│   ├── index.tsx              → /cocina
│   └── atendidos.tsx          → /cocina/atendidos
├── ayuda/
│   ├── index.tsx              → /ayuda
│   └── [...articulo].tsx      → /ayuda/... (catch-all)
├── pedido.tsx                 → /pedido → <Redirect href="/carrito" />
└── +not-found.tsx             → 404
```

El resto del código está fuera de `src/app`, porque cada archivo dentro de `src/app` es una ruta:

```
src/
├── components/   → DondeEstoy, Pantalla, Boton, TarjetaPlato, TarjetaAcceso, TarjetaPedido, estilos
├── context/      → ComedorContext.tsx (sesión, carrito, nota, cola y pilas)
├── data/         → tipos.ts, platos.ts (15 platos), articulosAyuda.ts
└── estructuras/  → Pila.ts, Cola.ts
```

### Tabla URL → archivo → navegador

| URL | Archivo | Navegador |
|---|---|---|
| `/` | `(tabs)/index.tsx` | Tabs (pestaña Inicio) |
| `/menu` | `(tabs)/menu/index.tsx` | Stack de la tab Menú |
| `/menu/[id]` | `(tabs)/menu/[id].tsx` | Stack de la tab Menú (la barra de pestañas sigue visible) |
| `/categorias/[categoria]` | `categorias/[categoria].tsx` | Stack raíz |
| `/buscar?q=&categoria=` | `buscar.tsx` | Stack raíz |
| `/carrito` | `(tabs)/carrito/index.tsx` | Stack de la tab Carrito |
| `/carrito/nota` | `(tabs)/carrito/nota.tsx` | Stack de la tab Carrito (`formSheet`) |
| `/confirmar` | `confirmar.tsx` | Stack raíz, `presentation: 'modal'` |
| `/turno/[numero]` | `turno/[numero].tsx` | Stack raíz |
| `/login` | `login.tsx` | Stack raíz, modal, `Stack.Protected guard={!conSesion}` |
| `/cocina` | `cocina/index.tsx` | Drawer, `Stack.Protected guard={conSesion}` |
| `/cocina/atendidos` | `cocina/atendidos.tsx` | Drawer (misma sección) |
| `/ayuda` | `ayuda/index.tsx` | Stack raíz |
| `/ayuda/...` | `ayuda/[...articulo].tsx` | Stack raíz (catch-all) |
| `/pedido` | `pedido.tsx` | `<Redirect>` a `/carrito` |
| `/acceso-cocina` | `(tabs)/acceso-cocina.tsx` | Tabs, `Tabs.Protected guard={conSesion}` (desafío 2) |
| cualquier otra | `+not-found.tsx` | Pantalla 404 que muestra la URL inexistente |

`unstable_settings = { anchor: '(tabs)' }` en el layout raíz hace que un deep link a una pantalla del Stack raíz (por ejemplo `/categorias/bebidas`) deje las pestañas debajo en la pila. Así "atrás" vuelve a las tabs.

---

## `replace` vs `push` en `/confirmar` → `/turno/[numero]`

Al tocar "Confirmar" en el modal `/confirmar`, el pedido se encola y se navega con:

```ts
router.replace({ pathname: '/turno/[numero]', params: { numero: String(numero) } });
```

- **Uso `router` y no `Link`** porque la navegación pasa **después de una lógica**: primero se confirma y encola el pedido, y recién ahí se conoce el número de turno.
- **Uso `replace` y no `push`** porque `replace` saca el modal `/confirmar` de la pila y pone `/turno/[n]` en su lugar. "Atrás" desde el turno vuelve a donde estaba el usuario antes de abrir el modal (el carrito).
- **Con `push`**, `/confirmar` quedaría debajo del turno. Al tocar "atrás", el usuario volvería a la pantalla de confirmación y podría tocar "Confirmar" otra vez y **reenviar el pedido**. En ese momento el carrito ya está vacío y la pantalla avisa que no hay nada para confirmar, pero igual es una pantalla que ya no tiene sentido en el historial.

El código y su comentario están en `src/app/confirmar.tsx`.

---

## Pila, Cola y el patrón `useRef` + versión

Las estructuras son clases propias con campos privados (`#items`), en `src/estructuras/`:

| Estructura | Dónde se usa | Por qué |
|---|---|---|
| **Cola** (`Cola<Pedido>`) | Cola de pedidos de la cocina. Al confirmar se **encola** el pedido con un número correlativo. "Atender siguiente" en `/cocina` **desencola**. `/turno/[n]` muestra cuántos pedidos hay adelante. | FIFO: se atiende por orden de llegada y nadie se cuela. Desencolar es la única forma de sacar pedidos. No usa `shift()`: guarda el índice del frente (`#inicio`) y lo avanza (O(1)). |
| **Pila** de deshacer (`Pila<string>`) | Cada plato agregado al carrito hace `push` de su `idItem`. "Deshacer último" hace `pop` y quita **ese** ítem. Al confirmar el pedido se vacía. | LIFO: se deshace lo último que se hizo. |
| **Pila** de atendidos (`Pila<Pedido>`) | Cada pedido atendido se apila. `/cocina/atendidos` la muestra del tope a la base (`aArray()` invertido). | LIFO: el último atendido aparece primero. |

**Patrón `useRef` + versión** (en `src/context/ComedorContext.tsx`). `Pila` y `Cola` **mutan** su estado interno, así que React no detecta el cambio: la instancia sigue siendo la misma. La solución:

1. Las instancias viven en `useRef`: se crean una vez y sobreviven entre renders.
2. Un `useState` de **versión** se incrementa con `refrescar()` después de cada mutación. Ese cambio es el que fuerza el re-render.
3. Hacia el resto de la app solo se exponen **datos derivados** (`aArray()`, `tamanio`, `vacia`, `frente()`) y acciones (`agregarAlCarrito`, `deshacerUltimo`, `confirmarPedido`, `atenderSiguiente`). Ninguna pantalla toca las estructuras directamente.

El React Compiler está desactivado en `app.json` para que no memorice valores derivados de los refs y este patrón se comporte como se explica.

---

## Credenciales de la cocina

| Usuario | Clave |
|---|---|
| `cocina` | `ipf2026` |

- Con credenciales incorrectas aparece un error y el modal sigue abierto.
- Con las correctas, el modal se cierra solo: su guard pasa a `false` y no hace falta `router.back()`.
- El botón **"Salir"** está en el header del Drawer de cocina. Al tocarlo, toda la sección cocina desaparece del historial, aunque estés en `/cocina/atendidos`.

---

## Deep links de prueba

| Dónde | Ejemplo |
|---|---|
| **Expo Go** | `exp://<IP-DE-LA-PC>:8081/--/menu/1` |
| Build propia | `comedoripf://menu/1` |
| Web | `http://localhost:8081/menu/1` |

La IP y el puerto salen de la salida de `npx expo start`. El `/--/` separa la dirección del proyecto de la ruta dentro de la app. El scheme `comedoripf://` solo funciona en una build propia, no en Expo Go.

Otros links útiles:

- `exp://<IP-DE-LA-PC>:8081/--/buscar?q=chipa&categoria=desayuno` (búsqueda compartida)
- `exp://<IP-DE-LA-PC>:8081/--/categorias/bebidas` (con "atrás" vuelve a las tabs por el anchor)
- `exp://<IP-DE-LA-PC>:8081/--/ayuda/pagos/efectivo` (catch-all)

---

## Capturas

Las capturas van en `docs/capturas/`.

| Pantalla | Captura |
|---|---|
| Carrito con "Deshacer último" | ![Carrito con deshacer](docs/capturas/carrito-deshacer.png) |
| Turno con pedidos adelante | ![Turno](docs/capturas/turno.png) |
| Cocina atendiendo pedidos | ![Cocina](docs/capturas/cocina.png) |
| Login | ![Login](docs/capturas/login.png) |
| Logout (vuelta a Inicio sin la sección cocina) | ![Logout](docs/capturas/logout.png) |
| Pantalla 404 | ![404](docs/capturas/404.png) |

El panel **"¿Dónde estoy?"** al final de cada pantalla muestra `usePathname()`, `useSegments()` y `useLocalSearchParams()`. Se oculta poniendo `DEBUG = false` en `src/components/DondeEstoy.tsx`.

---

## Desafíos opcionales implementados

1. **Contador de pila.** En el Stack de la tab Menú, el título del header muestra cuántas pantallas hay en la pila, con `useNavigation().getState().routes.length`: "Menú (1)" en el índice y "Chipá (2)" en el detalle.
2. **Tab protegida.** Con `Tabs.Protected guard={conSesion}` aparece una pestaña "Cocina" solo con sesión iniciada (ver la sección siguiente).
3. **Hoja inferior.** `/carrito/nota` se muestra con `presentation: 'formSheet'` y `sheetAllowedDetents: [0.5, 1]`: abre a media pantalla y se puede arrastrar hasta arriba.
4. **Tiempo estimado.** En `/turno/[numero]`, la espera es la cantidad de pedidos adelante × 3 minutos.

### Por qué existe `/acceso-cocina` (desafío 2)

La URL `/acceso-cocina` **existe solo por el desafío 2** y no está en la lista de rutas requeridas de la consigna.

- **Es necesaria porque** `Tabs.Protected` protege pestañas, y una pestaña necesita su propio archivo dentro de `(tabs)/`. Ese archivo es `src/app/(tabs)/acceso-cocina.tsx`.
- **No puede llamarse `cocina`:** `(tabs)/cocina.tsx` generaría la URL `/cocina` (los grupos no suman a la URL). Esa URL ya la usa la sección `src/app/cocina/`, que es el Drawer del Stack raíz que pide la consigna. Habría dos rutas en conflicto para la misma URL.
- **Por eso la pestaña es solo un acceso a la sección cocina:**
  - Al tocarla, un listener `tabPress` hace `e.preventDefault()`, así la pestaña no llega a enfocarse, y luego `router.push('/cocina')`.
  - Si alguien entra por URL a `/acceso-cocina`, un `<Redirect href="/cocina" />` lo manda a la sección.
  - Sin sesión, la pestaña y la ruta no existen: `/acceso-cocina` termina en `/`.

---

## Observación sobre la versión web

En la versión web de expo-router (no en Expo Go), cuando una pantalla pone su título con `<Stack.Screen options={{ title }} />` adentro de la propia pantalla, el botón "atrás" del header puede dejar de responder después de abrir un segundo detalle. El botón "atrás" del navegador sigue funcionando.

Lo mantengo porque lo pide la consigna (el título de `/menu/[id]` se setea desde la pantalla) y porque es la API estándar documentada para SDK 57. En Expo Go la pila es nativa y funciona bien.
