import type { Categoria, Plato } from './tipos';

// Platos de ejemplo del comedor del IPF (comidas típicas de Formosa).
export const platos: Plato[] = [
  // Desayuno
  { id: 1, nombre: 'Chipá', precio: 800, descripcion: 'Seis chipás calentitos de almidón de mandioca y queso.', categoria: 'desayuno' },
  { id: 2, nombre: 'Mate cocido con leche', precio: 600, descripcion: 'Taza grande de mate cocido con leche y azúcar.', categoria: 'desayuno' },
  { id: 3, nombre: 'Tortilla parrilla', precio: 700, descripcion: 'Tortilla hecha a la parrilla, ideal para acompañar el mate.', categoria: 'desayuno' },
  { id: 4, nombre: 'Pan casero con dulce de leche', precio: 650, descripcion: 'Dos rodajas de pan casero con dulce de leche.', categoria: 'desayuno' },

  // Almuerzo
  { id: 5, nombre: 'Sopa paraguaya', precio: 1800, descripcion: 'Porción de sopa paraguaya de harina de maíz, queso y cebolla.', categoria: 'almuerzo' },
  { id: 6, nombre: 'Milanesa con puré', precio: 3200, descripcion: 'Milanesa de carne con puré de papas.', categoria: 'almuerzo' },
  { id: 7, nombre: 'Empanadas de carne', precio: 2400, descripcion: 'Tres empanadas de carne cortada a cuchillo, al horno.', categoria: 'almuerzo' },
  { id: 8, nombre: 'Guiso de arroz', precio: 2600, descripcion: 'Guiso de arroz con carne y verduras.', categoria: 'almuerzo' },
  { id: 9, nombre: 'Mbeyú', precio: 1500, descripcion: 'Torta de almidón de mandioca y queso, hecha en la sartén.', categoria: 'almuerzo' },

  // Bebidas
  { id: 10, nombre: 'Tereré', precio: 900, descripcion: 'Jarra de tereré con jugo de pomelo y yuyos.', categoria: 'bebidas' },
  { id: 11, nombre: 'Jugo de naranja', precio: 1000, descripcion: 'Vaso de jugo de naranja exprimido.', categoria: 'bebidas' },
  { id: 12, nombre: 'Agua mineral', precio: 700, descripcion: 'Botella de agua mineral de 500 ml.', categoria: 'bebidas' },

  // Kiosco
  { id: 13, nombre: 'Alfajor de maicena', precio: 500, descripcion: 'Alfajor de maicena casero con coco rallado.', categoria: 'kiosco' },
  { id: 14, nombre: 'Pastelitos', precio: 600, descripcion: 'Dos pastelitos de membrillo.', categoria: 'kiosco' },
  { id: 15, nombre: 'Maní con chocolate', precio: 450, descripcion: 'Bolsita de maní con chocolate.', categoria: 'kiosco' },
];

export function buscarPlatoPorId(id: number): Plato | undefined {
  return platos.find((p) => p.id === id);
}

export function platosDeCategoria(categoria: Categoria): Plato[] {
  return platos.filter((p) => p.categoria === categoria);
}

// Para mostrar precios en pesos: 3200 -> "$3.200".
export function formatearPrecio(precio: number): string {
  return `$${precio.toLocaleString('es-AR')}`;
}
