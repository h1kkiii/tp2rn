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

<!-- Pista: desarrollá las siglas en inglés y traducilas. -->

> **Respuesta:** _completar_

**b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?**

> **Respuesta:** _completar_

**c) Ejemplo de la vida real y de una app móvil para cada una.**

| Estructura | Vida real | App móvil |
|---|---|---|
| Pila | | |
| Cola | | |

> **Respuesta:** _completar (resumen en una línea)_

### A2. Seguimiento de una pila

<!-- Pista: dibujá la pila después de cada línea antes de mirar los console.log. Ojo con (4): vacia es un getter, no un método. -->

| Paso | Instrucción | Pila (base → tope) |
|---|---|---|
| 1 | `push('Inicio')` | |
| 2 | `push('Productos')` | |
| 3 | `push('Detalle 3')` | |
| 4 | `pop()` | |
| 5 | `push('Perfil')` | |
| 6 | `tope()` → (1) | |
| 7 | `pop()` → (2) | |
| 8 | `tope()` → (3) | |
| 9 | `vacia` → (4) | |

> **Respuesta:**
> - (1): _completar_
> - (2): _completar_
> - (3): _completar_
> - (4): _completar_
> - Estado final (base → tope): _completar_

### A3. Seguimiento de una cola

| Paso | Instrucción | Cola (frente → final) |
|---|---|---|
| 1 | `encolar('Ana')` | |
| 2 | `encolar('Beto')` | |
| 3 | `desencolar()` | |
| 4 | `encolar('Caro')` | |
| 5 | `encolar('Dani')` | |
| 6 | `frente()` → (1) | |
| 7 | `desencolar()` → (2) | |
| 8 | `vacia` → (3) | |

> **Respuesta:**
> - (1): _completar_
> - (2): _completar_
> - (3): _completar_
> - Estado final (frente → final): _completar_

### A4. Análisis de la implementación

**a) ¿Qué significa el `#` en `#items` y qué problema evita?**

<!-- Pista: campos privados de clase en JavaScript. ¿Qué pasaría si alguien hiciera p.items.splice(...) desde afuera? -->

> **Respuesta:** _completar_

**b) Problema de rendimiento de `shift()` con colas grandes y cómo lo resuelven las colas "serias".**

<!-- Pista: pensá qué tiene que hacer shift() con los índices de TODOS los elementos que quedan. -->

> **Respuesta:** _completar_

**c) ¿Qué método de array usa la pila para sacar y cuál la cola? ¿Por qué no pueden usar el mismo?**

> **Respuesta:** _completar_

### A5. Programación: una cola eficiente

<!-- Pista: un campo privado con el índice del frente; desencolar avanza el índice en vez de mover elementos. Este código se reutiliza en src/estructuras/Cola.ts (Parte G). -->

```js
// ColaEficiente.js
class ColaEficiente {
  #items = [];
  #frente = 0;

  encolar(x) {
    // completar
  }

  desencolar() {
    // completar
  }

  frente() {
    // completar
  }

  get vacia() {
    // completar
  }

  get tamanio() {
    // completar
  }
}
```

**Prueba rápida:**

```js
// completar con un ejemplo de uso y la salida esperada
```

> **Respuesta:** _breve explicación de cómo funciona y por qué no necesita shift()_

### A6. Pila y cola dentro de Expo Router

**a) ¿Qué estructura describe el historial de un Stack? ¿Qué pantalla es la visible y qué operación hace "atrás"?**

> **Respuesta:** _completar_

**b) ¿Qué estructura usa Expo Router para las acciones de navegación? ¿Qué pasa si el usuario toca dos links muy rápido?**

> **Respuesta:** _completar_

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

<!-- Pista: grupos (carpeta) no suman a la URL; index = la carpeta; _layout y +not-found no son pantallas normales; ¿qué pasa con un componente suelto dentro de src/app? -->

| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | |
| `src/app/acerca.tsx` | |
| `src/app/(tabs)/perfil.tsx` | |
| `src/app/(tabs)/productos/index.tsx` | |
| `src/app/(tabs)/productos/[id].tsx` | |
| `src/app/docs/[...slug].tsx` | |
| `src/app/_layout.tsx` | |
| `src/app/+not-found.tsx` | |
| `src/app/Boton.tsx` | |

> **Respuesta:** _completar (señalar cuál genera un problema y por qué)_

### B2. De la URL al archivo

| URL | Archivo |
|---|---|
| `/categorias/bebidas` (y cualquier otra) | |
| `/buscar?q=mate&categoria=kiosco` | |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | |
| `/ayuda` (pantalla propia) | |

> **Respuesta:** _completar_

### B3. Verdadero o falso

| Afirmación | V/F | Justificación (si es F) |
|---|---|---|
| a) Cada pantalla nueva se registra en una tabla de configuración | | |
| b) Los `_layout.tsx` son pantallas visitables | | |
| c) Una carpeta `(tabs)` no aparece en la URL | | |
| d) Conviene `npm install` porque trae la última versión | | |
| e) `"main": "expo-router/entry"` reemplaza al viejo `App.tsx` | | |
| f) `/_sitemap` lista todas las rutas y sirve para depurar | | |
| g) Con `docs/index.tsx` y `docs/[...slug].tsx`, `/docs` muestra `index.tsx` | | |
| h) En SDK 57, expo-router usa versión mayor 57 | | |

> **Respuesta:** _completar_

---

## Parte C · Navegar: Link, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | |
| `router.navigate(href)` | |
| `router.replace(href)` | |
| `router.back()` | |
| `router.dismissTo(href)` | |
| `router.dismissAll()` | |
| `router.canGoBack()` | |
| `router.setParams({...})` | |

> **Respuesta:** _completar_

### C2. Simulación de la pila

<!-- Pista: la clave es la diferencia entre push y navigate cuando la ruta (/productos/[id]) ya está en la pila. Verificar el comportamiento de navigate en la presentación de clase / docs de SDK 57. -->

Pila inicial: `[ /productos ]`

| # | Instrucción | Pila resultante (base → tope) |
|---|---|---|
| 1 | `router.push("/productos/1")` | |
| 2 | `router.push("/productos/2")` | |
| 3 | `router.navigate("/productos/5")` | |
| 4 | `router.push("/perfil")` | |
| 5 | `router.replace("/buscar")` | |
| 6 | `router.back()` | |
| 7 | `router.dismissTo("/productos")` | |
| 8 | `router.canGoBack()` → | |

> **Respuesta:** _completar (pila final y valor devuelto en el paso 8)_

### C3. ¿Link o router?

<!-- Regla: <Link> cuando el usuario toca algo; router cuando navegás después de una lógica. -->

| Situación | Link / router | Método o prop | Justificación |
|---|---|---|---|
| a) Toca la tarjeta de un producto | | | |
| b) Formulario guardado, API OK → pantalla de éxito | | | |
| c) "Cancelar" en un modal | | | |
| d) Login exitoso → pantalla principal | | | |
| e) Del detalle de un pedido a la lista, 3 pantallas abajo | | | |

> **Respuesta:** _completar_

### C4. Escribí el código

**a) `<Link>` al producto 8 con `href` como objeto**

```tsx
// completar
```

**b) `<Link>` a `/perfil` que siempre apile**

```tsx
// completar
```

**c) `Pressable` propio como link a `/carrito` con `asChild`**

```tsx
// completar
```

> **Respuesta:** _breve explicación de cada caso_

### C5. Pensar

**¿Qué ventaja tiene que cada `<Link>` sea un `<a href>` real en la web? ¿Qué pasa en el celular?**

> **Respuesta:** _completar_

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | | | |
| ¿Cómo cambia de pantalla el usuario? | | | |
| ¿Desde dónde se importa en SDK 57? | | | |
| Un caso de uso típico | | | |

> **Respuesta:** _completar_

### D2. Cada tab tiene su pila

**Productos → detalle 4 → Inicio → Productos. ¿Qué pantalla ve? ¿Por qué? ¿Qué app de uso diario se comporta así?**

> **Respuesta:** _completar_

### D3. ¿Dónde va cada pantalla?

<!-- Regla práctica: si tiene que mantener visible la barra de pestañas → dentro de la tab; si la tapa → Stack raíz. -->

| Pantalla | Stack raíz / dentro de una tab | Motivo |
|---|---|---|
| a) Detalle de producto con barra visible | | |
| b) Modal de confirmar compra que tapa la barra | | |
| c) Login como modal | | |
| d) "Mis pedidos anteriores" dentro de Perfil | | |

> **Respuesta:** _completar_

### D4. Configurar el Stack

**a) Diferencia entre `screenOptions` y las `options` de un `Stack.Screen`.**

> **Respuesta:** _completar_

**b) ¿Por qué `(tabs)` tiene `headerShown: false`?**

> **Respuesta:** _completar_

**c) `perfil-publico.tsx` existe pero no está declarada en el Stack: ¿existe la pantalla? ¿Para qué sirve declararla?**

> **Respuesta:** _completar_

**d) Cuatro valores de `presentation`. ¿Cuál para una hoja inferior al 50%?**

> **Respuesta:** _completar_

**e) ¿Cómo cambiar el título del header desde la pantalla de detalle para que diga "Producto 7"?**

```tsx
// completar
```

> **Respuesta:** _completar_

### D5. Tabs y Drawer en SDK 57

<!-- Verificar en la presentación de clase y en docs.expo.dev: son detalles específicos de SDK 57. -->

**a) ¿Qué cambió en SDK 57 al importar Tabs? ¿Qué alternativa experimental existe?**

> **Respuesta:** _completar_

**b) ¿Qué dos paquetes necesita el Drawer y qué componente va en el layout raíz para los gestos?**

> **Respuesta:** _completar_

**c) ¿Hace falta instalar `@react-navigation/drawer` en SDK 57? ¿Por qué?**

> **Respuesta:** _completar_

**d) Con navegadores anidados, ¿en qué navegador actúa `router.back()`?**

> **Respuesta:** _completar_

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

<!-- Pista: ¿de qué tipo llegan siempre los parámetros de la URL? ¿Y de qué tipo es p.id? -->

**Explicación del error:** _completar_

**Código corregido:**

```tsx
// completar (incluir validación de que el id sea un número válido)
```

> **Respuesta:** _completar_

### E2. Catch-all

| URL | `slug` |
|---|---|
| `/docs/react` | |
| `/docs/react/hooks/useState` | |
| `/docs` | |

> **Respuesta:** _completar_

### E3. Anatomía de una URL

URL: `rutasipf://buscar?q=mate&categoria=bebidas`

**a) Scheme, ruta y parámetros de búsqueda.**

| Parte | Valor |
|---|---|
| Scheme | |
| Ruta | |
| Parámetros | |

**b) ¿Qué devuelve `useLocalSearchParams()` en `buscar.tsx`?**

```ts
// completar
```

**c) ¿Hacen falta corchetes en el nombre del archivo para recibir `q`? ¿Por qué?**

**d) Dos razones para usar `router.setParams({ q: texto })` en vez de `router.push`.**

> **Respuesta:** _completar_

### E4. ¿Dónde estoy?

<!-- Ojo: useSegments incluye los grupos y los nombres de archivo con corchetes; usePathname no. -->

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | | |
| `useSegments()` | | |
| `useLocalSearchParams()` | | |

> **Respuesta:** _completar_

### E5. Local vs global

**a) Diferencia entre `useLocalSearchParams` y `useGlobalSearchParams`. ¿Cuál es la opción por defecto y por qué?**

> **Respuesta:** _completar_

**b) ¿Para qué sirve `useFocusEffect`? Ejemplo.**

```tsx
// completar
```

> **Respuesta:** _completar_

**c) `/productos/mate` abre el detalle aunque no exista. ¿Es error de Expo Router? ¿De quién es la responsabilidad?**

> **Respuesta:** _completar_

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a) ¿Qué hace `<Redirect href="/productos" />` y a qué método de router equivale?**

> **Respuesta:** _completar_

**b) ¿Por qué una redirección debe reemplazar y no apilar? Describí el problema.**

> **Respuesta:** _completar_

### F2. Stack.Protected

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={ /* completar */ }>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={ /* completar */ }>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```

**a) ¿Qué le pasa a una pantalla cuando su guard es `false`?**

> **Respuesta:** _completar_

**b) ¿Por qué el modal de login se cierra solo al iniciar sesión, sin `router.back()`?**

> **Respuesta:** _completar_

**c) Aviso "The action 'NAVIGATE' … was not handled by any navigator": causa y cómo evitarlo.**

> **Respuesta:** _completar_

**d) Ventaja de `Stack.Protected` frente a un `<Redirect>` condicional en cada pantalla.**

> **Respuesta:** _completar_

### F3. 404, anchor y rutas tipadas

| Elemento | Para qué sirve | Dónde se define |
|---|---|---|
| a) `+not-found.tsx` | | |
| b) `unstable_settings = { anchor: "(tabs)" }` | | |
| c) `typedRoutes` | | |

**c) ¿Qué pasa con `<Link href="/prodcutos" />`? ¿Dónde se generan los tipos?**

> **Respuesta:** _completar_

### F4. Deep links

Datos: `"scheme": "comedoripf"` · IP de la compu: `192.168.1.20` · destino: `/menu/7`

<!-- Pista: el puerto por defecto de Metro y el de la web; verificar con la salida de npx expo start. -->

| Dónde | URL |
|---|---|
| App instalada (build propia) | |
| Expo Go en desarrollo | |
| Web (`npx expo start --web`) | |

**¿Qué significa `/--/` en la URL de Expo Go? ¿Por qué el scheme propio no funciona dentro de Expo Go?**

> **Respuesta:** _completar_

### F5. Errores comunes

| Situación | Causa | Solución |
|---|---|---|
| a) "You are passing an array of styles to a child of `<Slot>`" con `asChild` | | |
| b) `src/app/TarjetaProducto.tsx` generó una ruta nueva | | |
| c) `router.push("/")` tras el login → atrás vuelve al login | | |
| d) Expo Go dice "incompatible" tras `npm install` | | |

> **Respuesta:** _completar_

---

## Checklist antes de entregar

- [ ] Todas las preguntas de A a F tienen su bloque **Respuesta** completo
- [ ] Las tablas de seguimiento (A2, A3, C2) muestran el estado paso a paso
- [ ] El código de A5 está probado y coincide con `src/estructuras/Cola.ts`
- [ ] Los detalles específicos de SDK 57 (B3-h, D1, D5) fueron verificados en la presentación o en docs.expo.dev
- [ ] Los fragmentos de código de C4, D4-e, E1 y F2 compilan sin errores de TypeScript
