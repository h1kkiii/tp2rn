import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function Ayuda() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Ayuda</Text>
    </Pantalla>
  );
}
