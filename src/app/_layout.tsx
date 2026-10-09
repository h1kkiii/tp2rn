import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ProveedorComedor, useComedor } from '@/context/ComedorContext';

// Anchor: si la app se abre con un deep link a una pantalla del Stack raíz
// (ej.: comedoripf://categorias/bebidas), Expo Router pone (tabs) debajo en
// la pila. Así "atrás" vuelve a las pestañas en vez de cerrar la app.
export const unstable_settings = {
  anchor: '(tabs)',
};

// El layout raíz se divide en dos porque NavegacionRaiz usa useComedor():
// el provider tiene que estar POR ENCIMA del componente que lee el contexto.
export default function LayoutRaiz() {
  return (
    // GestureHandlerRootView es necesario para los gestos del Drawer de cocina.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProveedorComedor>
        <NavegacionRaiz />
      </ProveedorComedor>
    </GestureHandlerRootView>
  );
}

function NavegacionRaiz() {
  const { conSesion } = useComedor();

  return (
    <Stack>
      {/* Las pestañas tienen su propia barra y headers: ocultamos el del Stack raíz. */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />

      {/* Modal: tapa la barra de pestañas porque vive en el Stack raíz. */}
      <Stack.Screen name="confirmar" options={{ title: 'Confirmar pedido', presentation: 'modal' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />

      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...articulo]" options={{ title: 'Artículo de ayuda' }} />
      <Stack.Screen name="pedido" options={{ title: 'Pedido' }} />
      <Stack.Screen name="+not-found" options={{ title: 'No encontrado' }} />

      {/* Rutas protegidas: cuando el guard es false la pantalla NO existe
          (no se puede navegar a ella y se borra del historial).
          - cocina: solo con sesión iniciada.
          - login: solo sin sesión. Al iniciar sesión su guard pasa a false
            y el modal se cierra solo, sin llamar a router.back(). */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ title: 'Ingreso cocina', presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
