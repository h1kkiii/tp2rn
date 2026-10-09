import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function Inicio() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Inicio</Text>
    </Pantalla>
  );
}
