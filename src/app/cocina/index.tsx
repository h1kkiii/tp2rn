import { Text } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPedido } from '@/components/TarjetaPedido';
import { useComedor } from '@/context/ComedorContext';

// /cocina: atiende la COLA de pedidos (FIFO). Solo existe con sesión.
export default function Cocina() {
  const { pedidoAlFrente, cantidadEnEspera, colaVacia, atenderSiguiente } = useComedor();

  return (
    <Pantalla>
      <Text style={estilosComunes.subtitulo}>Pedidos en espera: {cantidadEnEspera}</Text>

      {pedidoAlFrente ? (
        <>
          <Text style={estilosComunes.textoSuave}>Al frente de la cola:</Text>
          <TarjetaPedido pedido={pedidoAlFrente} />
        </>
      ) : (
        <Text style={estilosComunes.textoSuave}>No hay pedidos en espera.</Text>
      )}

      {/* Única forma de sacar pedidos: desencolar el del frente.
          Así nadie se "cuela": siempre sale el de número más bajo pendiente. */}
      <Boton titulo="Atender siguiente" onPress={atenderSiguiente} deshabilitado={colaVacia} />
    </Pantalla>
  );
}
