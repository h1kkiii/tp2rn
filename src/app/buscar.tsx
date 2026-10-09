import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function Buscar() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Buscar</Text>
    </Pantalla>
  );
}
