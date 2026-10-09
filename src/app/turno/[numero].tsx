import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function Turno() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Tu turno</Text>
    </Pantalla>
  );
}
