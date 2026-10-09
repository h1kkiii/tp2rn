import { Stack } from 'expo-router';

// Stack propio de la tab Carrito: /carrito/nota se apila acá adentro.
export default function LayoutCarrito() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
      {/* Desafío 3: la nota se muestra como hoja inferior (formSheet).
          sheetAllowedDetents: alturas en las que se puede "enganchar" la
          hoja (0.5 = mitad de la pantalla, 1 = pantalla completa).
          Sigue siendo una pantalla del Stack de la tab Carrito. */}
      <Stack.Screen
        name="nota"
        options={{
          title: 'Nota para la cocina',
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 1],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
