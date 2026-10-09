import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { colores, estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

// /turno/[numero]: número de turno y cuántos pedidos hay adelante.
export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { pedidosEnEspera, atendidos, ultimoNumero } = useComedor();

  // El parámetro llega como texto: lo validamos antes de usarlo.
  const n = Number(numero);
  const numeroValido = Number.isInteger(n) && n > 0;

  // Posición en la cola (de frente a final): el índice es la cantidad de
  // pedidos que hay adelante. Índice 0 = está al frente.
  const posicion = numeroValido ? pedidosEnEspera.findIndex((p) => p.numero === n) : -1;
  const yaAtendido = numeroValido && atendidos.some((p) => p.numero === n);

  let contenido;
  if (!numeroValido || (posicion === -1 && !yaAtendido) || n > ultimoNumero) {
    contenido = <Text style={estilosComunes.error}>No existe el pedido &quot;{numero}&quot;.</Text>;
  } else if (yaAtendido) {
    contenido = (
      <>
        <Text style={estilos.numero}>#{n}</Text>
        <Text style={estilosComunes.texto}>Tu pedido ya fue atendido. ¡Retiralo en el mostrador!</Text>
      </>
    );
  } else {
    contenido = (
      <>
        <Text style={estilos.numero}>#{n}</Text>
        <Text style={estilosComunes.subtitulo}>
          {posicion === 0
            ? '¡Sos el próximo! No hay pedidos adelante.'
            : `Hay ${posicion} ${posicion === 1 ? 'pedido' : 'pedidos'} adelante en la cola.`}
        </Text>
      </>
    );
  }

  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Tu turno</Text>
      {contenido}
      {/* dismissTo: vuelve a las pestañas (que están debajo en la pila)
          en lugar de apilar otra pantalla de Inicio arriba del turno. */}
      <Link href="/" dismissTo style={estilosComunes.enlace}>
        Volver al inicio
      </Link>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  numero: {
    fontSize: 56,
    fontWeight: '800',
    color: colores.primario,
    textAlign: 'center',
  },
});
