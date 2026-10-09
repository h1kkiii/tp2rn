import { Text, View } from 'react-native';

import { formatearPrecio } from '@/data/platos';
import type { Pedido } from '@/data/tipos';

import { estilosComunes } from './estilos';

// Muestra un pedido de la cola o del historial de atendidos.
export function TarjetaPedido({ pedido }: { pedido: Pedido }) {
  const hora = new Date(pedido.creadoEn).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  return (
    <View style={estilosComunes.tarjeta}>
      <Text style={estilosComunes.subtitulo}>
        Pedido #{pedido.numero} · {hora}
      </Text>
      {pedido.items.map((item) => (
        <Text key={item.idItem} style={estilosComunes.texto}>
          • {item.plato.nombre}
        </Text>
      ))}
      <Text style={estilosComunes.textoSuave}>Nota: {pedido.nota === '' ? 'sin aclaraciones' : pedido.nota}</Text>
      <Text style={estilosComunes.texto}>Total: {formatearPrecio(pedido.total)}</Text>
    </View>
  );
}
