// Tipos compartidos por toda la app.

export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

// Lista de categorías válidas: se usa para validar /categorias/[categoria]
// y para armar los chips del buscador.
export const CATEGORIAS: Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export function esCategoria(valor: string): valor is Categoria {
  return (CATEGORIAS as string[]).includes(valor);
}

export interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}

export interface ItemCarrito {
  // Identificador único del ítem (el mismo plato puede estar dos veces).
  idItem: string;
  plato: Plato;
}

export interface Pedido {
  numero: number;
  items: ItemCarrito[];
  nota: string;
  total: number;
  creadoEn: number;
}
