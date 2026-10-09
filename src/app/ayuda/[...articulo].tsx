import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function ArticuloAyuda() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Artículo de ayuda</Text>
    </Pantalla>
  );
}
