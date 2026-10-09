import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function PlatosDeCategoria() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Categoría</Text>
    </Pantalla>
  );
}
