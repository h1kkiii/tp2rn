import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function DetallePlato() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Detalle del plato</Text>
    </Pantalla>
  );
}
