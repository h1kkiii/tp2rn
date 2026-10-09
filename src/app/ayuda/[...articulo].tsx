import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { articulosAyuda } from '@/data/articulosAyuda';

// /ayuda/... (catch-all): atrapa cualquier profundidad.
//   /ayuda/horarios       -> articulo = ['horarios']
//   /ayuda/pagos/efectivo -> articulo = ['pagos', 'efectivo']
export default function ArticuloAyuda() {
  const { articulo } = useLocalSearchParams<{ articulo: string[] }>();
  // Unimos los segmentos para buscar el artículo por su ruta.
  const ruta = Array.isArray(articulo) ? articulo.join('/') : (articulo ?? '');
  const encontrado = articulosAyuda[ruta];

  if (!encontrado) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Artículo no encontrado' }} />
        <Text style={estilosComunes.error}>No existe el artículo &quot;{ruta}&quot;.</Text>
        <Link href="/ayuda" style={estilosComunes.enlace}>
          Volver al índice de ayuda
        </Link>
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: encontrado.titulo }} />
      <Text style={estilosComunes.titulo}>{encontrado.titulo}</Text>
      <Text style={estilosComunes.texto}>{encontrado.contenido}</Text>
      <Link href="/ayuda" style={estilosComunes.enlace}>
        Volver al índice de ayuda
      </Link>
    </Pantalla>
  );
}
