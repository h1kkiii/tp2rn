// En SDK 57 el Drawer viene incluido en expo-router (no hace falta
// @react-navigation/drawer). Usa gesture-handler y reanimated.
import { Drawer } from 'expo-router/drawer';

import { colores } from '@/components/estilos';

export default function LayoutCocina() {
  return (
    <Drawer screenOptions={{ drawerActiveTintColor: colores.primario }}>
      <Drawer.Screen name="index" options={{ title: 'Cocina' }} />
      <Drawer.Screen name="atendidos" options={{ title: 'Atendidos' }} />
    </Drawer>
  );
}
