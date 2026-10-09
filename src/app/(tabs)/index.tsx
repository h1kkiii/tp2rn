import { Text } from 'react-native';

import { estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaAcceso } from '@/components/TarjetaAcceso';
import { useComedor } from '@/context/ComedorContext';

export default function Inicio() {
  const { conSesion } = useComedor();

  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>¡Hola! Bienvenido al Comedor IPF</Text>
      <Text style={estilosComunes.textoSuave}>Elegí qué querés hacer.</Text>

      <TarjetaAcceso href="/menu" titulo="Menú" descripcion="Todos los platos por categoría" icono="restaurant" />
      <TarjetaAcceso href="/buscar" titulo="Buscar" descripcion="Encontrá un plato por nombre" icono="search" />
      <TarjetaAcceso href="/ayuda" titulo="Ayuda" descripcion="Horarios, pagos y turnos" icono="help-circle" />
      {/* Cocina: con sesión va a /cocina y sin sesión a /login.
          Si fuéramos a /cocina sin sesión, esa ruta NO existe (su guard es
          false) y aparecería el aviso "NAVIGATE was not handled". */}
      <TarjetaAcceso
        href={conSesion ? '/cocina' : '/login'}
        titulo="Cocina"
        descripcion={conSesion ? 'Ver la cola de pedidos' : 'Ingreso del personal'}
        icono="flame"
      />
    </Pantalla>
  );
}
