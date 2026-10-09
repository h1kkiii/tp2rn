import { Link, Stack, useNavigation } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colores, estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { platosDeCategoria } from '@/data/platos';
import { CATEGORIAS } from '@/data/tipos';

// /menu: platos agrupados por categoría.
export default function Menu() {
  // Desafío 1: cantidad de pantallas en la pila del Stack de Menú.
  // useNavigation() da el navegador que contiene a esta pantalla (el Stack
  // de la tab Menú) y getState().routes es su pila, de la base al tope.
  const cantidadEnPila = useNavigation().getState()?.routes.length ?? 1;

  return (
    <Pantalla>
      <Stack.Screen options={{ title: `Menú (${cantidadEnPila})` }} />
      {CATEGORIAS.map((categoria) => (
        <View key={categoria} style={estilos.grupo}>
          <View style={estilos.encabezado}>
            <Text style={estilos.nombreCategoria}>{categoria}</Text>
            {/* Lleva a /categorias/[categoria], que vive en el Stack raíz. */}
            <Link href={{ pathname: '/categorias/[categoria]', params: { categoria } }} style={estilosComunes.enlace}>
              Ver categoría
            </Link>
          </View>
          {platosDeCategoria(categoria).map((plato) => (
            <TarjetaPlato key={plato.id} plato={plato} />
          ))}
        </View>
      ))}
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  grupo: {
    gap: 8,
    marginBottom: 8,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombreCategoria: {
    fontSize: 22,
    fontWeight: '700',
    color: colores.texto,
    textTransform: 'capitalize',
  },
});
