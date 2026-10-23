import { Stack } from 'expo-router';

// initialRouteName: garantiza que /menu (index) quede SIEMPRE debajo del
// detalle. Sin esto, al abrir un plato desde /buscar, /categorias o un deep
// link (/menu/2), el Stack de Menú se armaba solo con [id]: la tab Menú
// mostraba ese plato y no había índice al que volver.
export const unstable_settings = {
  initialRouteName: 'index',
};

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
