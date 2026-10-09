import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, type Href } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores, estilosComunes } from './estilos';

interface PropsTarjetaAcceso {
  href: Href;
  titulo: string;
  descripcion: string;
  icono: ComponentProps<typeof Ionicons>['name'];
}

// Tarjeta de acceso rápido de la pantalla de Inicio.
// <Link asChild> porque el usuario toca para ir a otra pantalla.
export function TarjetaAcceso({ href, titulo, descripcion, icono }: PropsTarjetaAcceso) {
  return (
    <Link href={href} asChild>
      <Pressable style={estilos.tarjeta}>
        <View style={estilos.icono}>
          <Ionicons name={icono} size={26} color={colores.primario} />
        </View>
        <View style={estilos.textos}>
          <Text style={estilosComunes.subtitulo}>{titulo}</Text>
          <Text style={estilosComunes.textoSuave}>{descripcion}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 14,
  },
  icono: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colores.primarioClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
    gap: 2,
  },
});
