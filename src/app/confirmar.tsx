import { Link, router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { colores, estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

// /confirmar: modal del Stack raíz con el resumen del pedido.
export default function Confirmar() {
  const { carrito, total, nota, confirmarPedido } = useComedor();

  if (carrito.length === 0) {
    return (
      <Pantalla>
        <Text style={estilosComunes.error}>Tu carrito está vacío: no hay nada para confirmar.</Text>
        {/* dismissTo cierra el modal y vuelve hasta /carrito. */}
        <Link href="/carrito" dismissTo style={estilosComunes.enlace}>
          Volver al carrito
        </Link>
      </Pantalla>
    );
  }

  const confirmar = () => {
    const numero = confirmarPedido(); // encola el pedido y vacía el carrito
    if (numero === null) return;
    // router (y no Link) porque navegamos DESPUÉS de una lógica.
    // replace (y no push): el modal /confirmar se REEMPLAZA por /turno.
    // Con push, /confirmar quedaría debajo en la pila y al tocar "atrás"
    // desde el turno el usuario volvería a la confirmación y podría
    // reenviar el pedido. Con replace, "atrás" vuelve a donde estaba antes
    // de abrir el modal.
    router.replace({ pathname: '/turno/[numero]', params: { numero: String(numero) } });
  };

  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Resumen del pedido</Text>
      {carrito.map((item) => (
        <View key={item.idItem} style={estilos.fila}>
          <Text style={estilosComunes.texto}>{item.plato.nombre}</Text>
          <Text style={estilosComunes.texto}>{formatearPrecio(item.plato.precio)}</Text>
        </View>
      ))}
      <View style={[estilos.fila, estilos.total]}>
        <Text style={estilosComunes.subtitulo}>Total</Text>
        <Text style={estilosComunes.subtitulo}>{formatearPrecio(total)}</Text>
      </View>
      <Text style={estilosComunes.textoSuave}>Nota: {nota === '' ? 'sin aclaraciones' : nota}</Text>

      <Boton titulo="Confirmar" onPress={confirmar} />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
  },
});
