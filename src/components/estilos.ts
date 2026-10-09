import { StyleSheet } from 'react-native';

// Paleta y estilos compartidos para que todas las pantallas se vean iguales.
export const colores = {
  primario: '#1F7A4D',
  primarioClaro: '#E3F2EA',
  fondo: '#F6F7F9',
  tarjeta: '#FFFFFF',
  texto: '#1B1F24',
  textoSuave: '#5B6470',
  borde: '#DDE1E6',
  error: '#C62828',
  deshabilitado: '#A9B1BB',
};

export const estilosComunes = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: 16,
    gap: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: colores.texto,
  },
  subtitulo: {
    fontSize: 17,
    fontWeight: '600',
    color: colores.texto,
  },
  texto: {
    fontSize: 15,
    color: colores.texto,
  },
  textoSuave: {
    fontSize: 14,
    color: colores.textoSuave,
  },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 14,
    gap: 4,
  },
  enlace: {
    fontSize: 15,
    color: colores.primario,
    fontWeight: '600',
  },
  error: {
    fontSize: 15,
    color: colores.error,
  },
});
