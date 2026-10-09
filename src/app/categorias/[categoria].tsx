import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { platosDeCategoria } from '@/data/platos';
import { CATEGORIAS, esCategoria } from '@/data/tipos';

// /categorias/[categoria]: platos de una categoría (Stack raíz).
export default function PlatosDeCategoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  // Normalizamos a minúsculas: /categorias/Bebidas también funciona.
  const normalizada = (categoria ?? '').toLowerCase();

  if (!esCategoria(normalizada)) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Categoría inválida' }} />
        <Text style={estilosComunes.error}>La categoría &quot;{categoria}&quot; no existe.</Text>
        <Text style={estilosComunes.texto}>Las categorías válidas son: {CATEGORIAS.join(', ')}.</Text>
        <Link href="/menu" style={estilosComunes.enlace}>
          Ir al menú
        </Link>
      </Pantalla>
    );
  }

  const titulo = normalizada.charAt(0).toUpperCase() + normalizada.slice(1);

  return (
    <Pantalla>
      <Stack.Screen options={{ title: titulo }} />
      {platosDeCategoria(normalizada).map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}
    </Pantalla>
  );
}
