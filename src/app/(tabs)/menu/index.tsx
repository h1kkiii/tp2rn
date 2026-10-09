import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colores, estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { platosDeCategoria } from '@/data/platos';
import { CATEGORIAS } from '@/data/tipos';

// /menu: platos agrupados por categoría.
export default function Menu() {
  return (
    <Pantalla>
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
