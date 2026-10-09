import { Link, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { Boton } from '@/components/Boton';
import { colores, estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { buscarPlatoPorId, formatearPrecio } from '@/data/platos';

// /menu/[id]: detalle de un plato (dentro de la tab Menú).
export default function DetallePlato() {
  // Los parámetros de la URL llegan SIEMPRE como texto: "1", "999", "abc".
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito, cantidadItems } = useComedor();
  // Desafío 1: cantidad de pantallas en la pila del Stack de Menú
  // (ej.: [/menu, /menu/1] -> 2). Se muestra en el título del header.
  const cantidadEnPila = useNavigation().getState()?.routes.length ?? 1;

  // Convertimos a número y validamos que sea entero antes de buscar.
  // Number('abc') es NaN y Number.isInteger(NaN) es false: no hay crash.
  const idNumerico = Number(id);
  const plato = Number.isInteger(idNumerico) ? buscarPlatoPorId(idNumerico) : undefined;

  if (!plato) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: `Plato no encontrado (${cantidadEnPila})` }} />
        <Text style={estilosComunes.error}>No existe el plato &quot;{id}&quot;.</Text>
        <Link href="/menu" style={estilosComunes.enlace}>
          Volver al menú
        </Link>
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      {/* El título del header se setea desde la propia pantalla. */}
      <Stack.Screen options={{ title: `${plato.nombre} (${cantidadEnPila})` }} />

      <Text style={estilosComunes.titulo}>{plato.nombre}</Text>
      <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
      <Text style={estilosComunes.texto}>{plato.descripcion}</Text>

      {/* Agregar es una acción (no navega): botón que llama al Context. */}
      <Boton titulo="Agregar al carrito" onPress={() => agregarAlCarrito(plato)} />

      {/* Ir al carrito es una navegación que dispara el usuario: Link. */}
      <Link href="/carrito" style={estilosComunes.enlace}>
        Ver carrito ({cantidadItems} {cantidadItems === 1 ? 'ítem' : 'ítems'})
      </Link>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  precio: {
    fontSize: 20,
    fontWeight: '700',
    color: colores.primario,
  },
});
