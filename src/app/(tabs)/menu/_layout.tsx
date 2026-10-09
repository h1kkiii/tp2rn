import { Stack } from 'expo-router';

// Stack propio de la tab Menú: el detalle /menu/[id] se apila acá adentro,
// así la barra de pestañas sigue visible.
export default function LayoutMenu() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Menú' }} />
      {/* El título real (nombre del plato) lo pone la propia pantalla. */}
      <Stack.Screen name="[id]" options={{ title: 'Plato' }} />
    </Stack>
  );
}
