import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function Login() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Ingreso cocina</Text>
    </Pantalla>
  );
}
