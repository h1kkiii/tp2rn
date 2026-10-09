import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function NotaCocina() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Nota para la cocina</Text>
    </Pantalla>
  );
}
