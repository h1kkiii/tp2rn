import { Link, usePathname } from 'expo-router';
import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

// Se muestra para cualquier URL que no coincida con ninguna ruta.
export default function NoEncontrado() {
  const pathname = usePathname();

  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Página no encontrada</Text>
      <Text style={estilosComunes.texto}>La dirección {pathname} no existe en el Comedor IPF.</Text>
      {/* Link porque es una acción directa del usuario. */}
      <Link href="/" style={estilosComunes.enlace}>
        Volver al inicio
      </Link>
    </Pantalla>
  );
}
