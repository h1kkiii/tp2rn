import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function Menu() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Menú</Text>
    </Pantalla>
  );
}
