import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function Confirmar() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Confirmar pedido</Text>
    </Pantalla>
  );
}
