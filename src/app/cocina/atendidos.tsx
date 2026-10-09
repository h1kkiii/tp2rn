import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPedido } from '@/components/TarjetaPedido';
import { useComedor } from '@/context/ComedorContext';

// /cocina/atendidos: historial guardado en una PILA. Se muestra del tope a
// la base (el último atendido primero); el Context ya lo da invertido.
export default function Atendidos() {
  const { atendidos } = useComedor();

  return (
    <Pantalla>
      {atendidos.length === 0 ? (
        <Text style={estilosComunes.textoSuave}>Todavía no se atendió ningún pedido.</Text>
      ) : (
        atendidos.map((pedido) => <TarjetaPedido key={pedido.numero} pedido={pedido} />)
      )}
    </Pantalla>
  );
}
