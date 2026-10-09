import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatearPrecio } from '@/data/platos';
import type { Plato } from '@/data/tipos';

import { colores, estilosComunes } from './estilos';

// Tarjeta tocable que lleva al detalle del plato.
// Usamos <Link> porque es una navegación que dispara el usuario al tocar.
// asChild: el Link le pasa su comportamiento al Pressable en vez de
// renderizar su propio texto. Ojo: el hijo tiene que recibir UN objeto de
// estilo (no un array), si no aparece el aviso de <Slot>.
export function TarjetaPlato({ plato }: { plato: Plato }) {
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: String(plato.id) } }} asChild>
      <Pressable style={estilos.tarjeta}>
        <View style={estilos.fila}>
          <Text style={estilosComunes.subtitulo}>{plato.nombre}</Text>
          <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
        </View>
        <Text style={estilosComunes.textoSuave} numberOfLines={2}>
          {plato.descripcion}
        </Text>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 14,
    gap: 4,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  precio: {
    fontSize: 16,
    fontWeight: '700',
    color: colores.primario,
  },
});
