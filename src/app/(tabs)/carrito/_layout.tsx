import { Stack } from 'expo-router';

// Stack propio de la tab Carrito: /carrito/nota se apila acá adentro.
export default function LayoutCarrito() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
      <Stack.Screen name="nota" options={{ title: 'Nota para la cocina' }} />
    </Stack>
  );
}
