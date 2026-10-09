import Ionicons from '@expo/vector-icons/Ionicons';
// En SDK 57 las Tabs de JavaScript se importan desde 'expo-router/js-tabs'
// (importarlas desde 'expo-router' quedó deprecado).
import { Tabs } from 'expo-router/js-tabs';

import { colores } from '@/components/estilos';
import { useComedor } from '@/context/ComedorContext';

export default function LayoutTabs() {
  const { cantidadItems } = useComedor();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colores.primario }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          // La tab tiene su propio Stack con header: ocultamos el de la tab
          // para no ver dos headers.
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          // Sin badge cuando el carrito está vacío (undefined lo oculta).
          tabBarBadge: cantidadItems > 0 ? cantidadItems : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
