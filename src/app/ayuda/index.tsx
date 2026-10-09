import { Link } from 'expo-router';
import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { articulosAyuda, rutasArticulos } from '@/data/articulosAyuda';

// /ayuda: índice. Tiene pantalla propia porque el catch-all [...articulo]
// necesita al menos un segmento y no atrapa /ayuda solo.
export default function Ayuda() {
  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Centro de ayuda</Text>
      {rutasArticulos.map((ruta) => (
        // El catch-all recibe los segmentos como array: 'pagos/efectivo'
        // se pasa como ['pagos', 'efectivo'].
        <Link
          key={ruta}
          href={{ pathname: '/ayuda/[...articulo]', params: { articulo: ruta.split('/') } }}
          style={estilosComunes.enlace}
        >
          {articulosAyuda[ruta].titulo} (/ayuda/{ruta})
        </Link>
      ))}
    </Pantalla>
  );
}
