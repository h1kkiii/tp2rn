import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { colores, estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

// /carrito: ítems, total, deshacer (pila) y confirmar.
export default function Carrito() {
  const { carrito, total, puedeDeshacer, deshacerUltimo, nota } = useComedor();

  return (
    <Pantalla>
      {carrito.length === 0 ? (
        <Text style={estilosComunes.textoSuave}>Tu carrito está vacío. Agregá platos desde el menú.</Text>
      ) : (
        carrito.map((item) => (
          <View key={item.idItem} style={estilos.item}>
            <Text style={estilosComunes.texto}>{item.plato.nombre}</Text>
            <Text style={estilosComunes.texto}>{formatearPrecio(item.plato.precio)}</Text>
          </View>
        ))
      )}

      <View style={estilos.total}>
        <Text style={estilosComunes.subtitulo}>Total</Text>
        <Text style={estilosComunes.subtitulo}>{formatearPrecio(total)}</Text>
      </View>

      {/* Deshacer usa la PILA: saca el último plato agregado (LIFO).
          Se deshabilita cuando la pila de deshacer está vacía. */}
      <Boton titulo="Deshacer último" variante="secundario" onPress={deshacerUltimo} deshabilitado={!puedeDeshacer} />

      <View style={estilosComunes.tarjeta}>
        <Text style={estilosComunes.subtitulo}>Nota para la cocina</Text>
        <Text style={estilosComunes.textoSuave}>{nota === '' ? 'Sin aclaraciones.' : nota}</Text>
        {/* Link: el usuario toca para ir a la nota (se apila en la tab Carrito). */}
        <Link href="/carrito/nota" style={estilosComunes.enlace}>
          {nota === '' ? 'Agregar nota' : 'Editar nota'}
        </Link>
      </View>

      {/* Link al modal /confirmar: es una navegación que dispara el usuario. */}
      <Link href="/confirmar" style={estilos.confirmar}>
        Confirmar pedido
      </Link>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colores.tarjeta,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 12,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
  },
  confirmar: {
    backgroundColor: colores.primario,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
