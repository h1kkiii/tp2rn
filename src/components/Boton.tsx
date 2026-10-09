import { Pressable, StyleSheet, Text } from 'react-native';

import { colores } from './estilos';

interface PropsBoton {
  titulo: string;
  onPress: () => void;
  deshabilitado?: boolean;
  variante?: 'primario' | 'secundario';
}

// Botón para ACCIONES (agregar, deshacer, confirmar, atender...).
// Para ir a otra pantalla cuando el usuario toca algo usamos <Link>.
export function Boton({ titulo, onPress, deshabilitado = false, variante = 'primario' }: PropsBoton) {
  const esPrimario = variante === 'primario';
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      accessibilityRole="button"
      accessibilityState={{ disabled: deshabilitado }}
      style={[
        estilos.boton,
        esPrimario ? estilos.primario : estilos.secundario,
        deshabilitado && estilos.deshabilitado,
      ]}
    >
      <Text style={[estilos.texto, !esPrimario && estilos.textoSecundario, deshabilitado && estilos.textoDeshabilitado]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  primario: {
    backgroundColor: colores.primario,
    borderColor: colores.primario,
  },
  secundario: {
    backgroundColor: colores.tarjeta,
    borderColor: colores.primario,
  },
  deshabilitado: {
    backgroundColor: colores.borde,
    borderColor: colores.borde,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textoSecundario: {
    color: colores.primario,
  },
  textoDeshabilitado: {
    color: colores.deshabilitado,
  },
});
