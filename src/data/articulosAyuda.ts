// Artículos de ayuda indexados por su ruta dentro de /ayuda.
// La pantalla catch-all /ayuda/[...articulo] recibe los segmentos como array
// (ej.: ['pagos', 'efectivo']) y los une con '/' para buscar acá.
export interface ArticuloAyuda {
  titulo: string;
  contenido: string;
}

export const articulosAyuda: Record<string, ArticuloAyuda> = {
  horarios: {
    titulo: 'Horarios del comedor',
    contenido: 'Desayuno de 7:00 a 9:30, almuerzo de 12:00 a 14:30. El kiosco atiende de 7:00 a 21:00.',
  },
  pagos: {
    titulo: 'Formas de pago',
    contenido: 'Podés pagar en efectivo o con tarjeta de débito en la caja del comedor.',
  },
  'pagos/efectivo': {
    titulo: 'Pago en efectivo',
    contenido: 'Pagás en la caja al retirar el pedido. Tratá de tener cambio para agilizar la fila.',
  },
  'pagos/tarjeta': {
    titulo: 'Pago con tarjeta',
    contenido: 'Se acepta tarjeta de débito. No se aceptan tarjetas de crédito.',
  },
  'pedidos/turno/demora': {
    titulo: '¿Por qué tarda mi turno?',
    contenido: 'Los pedidos se atienden por orden de llegada (es una cola). En la pantalla del turno ves cuántos pedidos tenés adelante.',
  },
};

// Rutas de los artículos, para listarlas en el índice /ayuda.
export const rutasArticulos = Object.keys(articulosAyuda);
