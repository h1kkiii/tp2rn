// Cola (FIFO: el primero en entrar es el primero en salir).
// Se usa en la app para la cola de pedidos de la cocina: nadie puede "colarse".
//
// Es la misma solución que el ejercicio A5 de RESPUESTAS.md (ColaEficiente):
// en vez de usar shift(), que mueve todos los elementos un lugar (O(n)),
// guardamos el índice del frente y lo avanzamos al desencolar (O(1)).
export class Cola<T> {
  #items: (T | undefined)[] = [];
  // Índice del elemento que está al frente de la cola.
  #inicio = 0;

  // Agrega un elemento al final.
  encolar(x: T): void {
    this.#items.push(x);
  }

  // Saca y devuelve el elemento del frente (undefined si está vacía).
  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#inicio];
    // Liberamos la referencia para no retener memoria y avanzamos el frente.
    this.#items[this.#inicio] = undefined;
    this.#inicio++;
    return elemento;
  }

  // Mira el frente sin sacarlo (undefined si está vacía).
  frente(): T | undefined {
    return this.vacia ? undefined : this.#items[this.#inicio];
  }

  get vacia(): boolean {
    return this.tamanio === 0;
  }

  get tamanio(): number {
    return this.#items.length - this.#inicio;
  }

  // Copia de frente a final (solo los elementos que siguen en la cola).
  aArray(): T[] {
    return this.#items.slice(this.#inicio) as T[];
  }
}
