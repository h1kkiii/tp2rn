// En SDK 57 el Drawer viene incluido en expo-router (no hace falta
// @react-navigation/drawer). Usa gesture-handler y reanimated.
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colores } from '@/components/estilos';
import { useComedor } from '@/context/ComedorContext';

export default function LayoutCocina() {
  const { cerrarSesion } = useComedor();

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: colores.primario,
        // Botón "Salir" en el header de las dos pantallas de cocina.
        // Logout: solo cambiamos el estado (conSesion = false), no navegamos.
        // El guard de <Stack.Protected guard={conSesion}> pasa a false y
        // Expo Router saca toda la sección /cocina del historial (aunque
        // estemos en /cocina/atendidos): no se puede volver con "atrás" y
        // no hace falta router.back() ni router.replace().
        headerRight: () => (
          <Pressable onPress={cerrarSesion} style={estilos.salir} accessibilityRole="button">
            <Text style={estilos.textoSalir}>Salir</Text>
          </Pressable>
        ),
      }}
    >
      <Drawer.Screen name="index" options={{ title: 'Cocina' }} />
      <Drawer.Screen name="atendidos" options={{ title: 'Atendidos' }} />
    </Drawer>
  );
}

const estilos = StyleSheet.create({
  salir: {
    marginRight: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  textoSalir: {
    color: colores.error,
    fontSize: 16,
    fontWeight: '600',
  },
});
