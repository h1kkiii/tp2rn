import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colores } from './estilos';

// Ponelo en false para ocultar el panel en todas las pantallas.
export const DEBUG = true;

// Panel de depuración que va al final de cada pantalla.
//   - usePathname(): la URL sin grupos ni parámetros de búsqueda (/menu/3).
//   - useSegments(): los segmentos del archivo, con grupos y corchetes
//     (['(tabs)', 'menu', '[id]']).
//   - useLocalSearchParams(): parámetros de la ruta y de la búsqueda de
//     ESTA pantalla ({ id: '3' }).
export function DondeEstoy() {
  // Los hooks se llaman siempre, antes del return condicional.
  const pathname = usePathname();
  const segmentos = useSegments();
  const parametros = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={estilos.caja}>
      <Text style={estilos.titulo}>¿Dónde estoy?</Text>
      <Text style={estilos.linea}>usePathname(): {pathname}</Text>
      <Text style={estilos.linea}>useSegments(): {JSON.stringify(segmentos)}</Text>
      <Text style={estilos.linea}>useLocalSearchParams(): {JSON.stringify(parametros)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: {
    marginTop: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colores.textoSuave,
    backgroundColor: '#FFFDF2',
    gap: 2,
  },
  titulo: {
    fontWeight: '700',
    fontSize: 13,
    color: colores.texto,
  },
  linea: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colores.textoSuave,
  },
});
