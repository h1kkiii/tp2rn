import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function Carrito() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Carrito</Text>
    </Pantalla>
  );
}
