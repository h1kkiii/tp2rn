// Pila (LIFO: el último en entrar es el primero en salir).
// Se usa en la app para:
//   - "Deshacer último" en el carrito (guarda el idItem de cada plato agregado).
//   - El historial de pedidos atendidos en la cocina.
export class Pila<T> {
  // El # hace al campo realmente privado: desde afuera nadie puede hacer
  // pila.items.splice(...) y romper el orden LIFO.
  #items: T[] = [];

  // Agrega un elemento en el tope.
  push(x: T): void {
    this.#items.push(x);
  }

  // Saca y devuelve el elemento del tope (undefined si está vacía).
  pop(): T | undefined {
    return this.#items.pop();
  }

  // Mira el tope sin sacarlo (undefined si está vacía).
  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  get vacia(): boolean {
    return this.#items.length === 0;
  }

  get tamanio(): number {
    return this.#items.length;
  }

  // Copia de base a tope: quien la reciba puede modificarla sin tocar la pila.
  aArray(): T[] {
    return [...this.#items];
  }
}
