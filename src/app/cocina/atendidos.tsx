import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function Atendidos() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Pedidos atendidos</Text>
    </Pantalla>
  );
}
