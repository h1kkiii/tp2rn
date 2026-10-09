import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

import type { ItemCarrito, Pedido, Plato } from '@/data/tipos';
import { Cola } from '@/estructuras/Cola';
import { Pila } from '@/estructuras/Pila';

// Credenciales fijas del personal de cocina (lo pide la consigna).
const USUARIO_COCINA = 'cocina';
const CLAVE_COCINA = 'ipf2026';

interface ValorComedor {
  // Sesión de la cocina
  conSesion: boolean;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;

  // Carrito
  carrito: ItemCarrito[];
  cantidadItems: number;
  total: number;
  agregarAlCarrito: (plato: Plato) => void;
  puedeDeshacer: boolean;
  deshacerUltimo: () => void;
  nota: string;
  setNota: (nota: string) => void;
  // Devuelve el número de turno asignado, o null si el carrito estaba vacío.
  confirmarPedido: () => number | null;

  // Cola de pedidos (cocina)
  pedidosEnEspera: Pedido[]; // de frente a final
  pedidoAlFrente: Pedido | undefined;
  cantidadEnEspera: number;
  colaVacia: boolean;
  atenderSiguiente: () => void;

  // Historial de atendidos: del último atendido al primero
  atendidos: Pedido[];

  // Último número de turno entregado (0 si todavía no hubo pedidos)
  ultimoNumero: number;
}

const ComedorContext = createContext<ValorComedor | null>(null);

export function ProveedorComedor({ children }: { children: ReactNode }) {
  // Estado "común": React detecta el cambio porque reemplazamos el valor.
  const [conSesion, setConSesion] = useState(false);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [nota, setNota] = useState('');

  // ---------------------------------------------------------------------
  // PATRÓN useRef + versión
  // Pila y Cola son clases que MUTAN su estado interno (#items). Si las
  // guardáramos en useState, React compararía la misma instancia antes y
  // después de un push/encolar, no vería cambios y no re-renderizaría.
  // Solución:
  //   1. Las instancias viven en useRef: se crean una sola vez y sobreviven
  //      entre renders sin disparar renders por sí mismas.
  //   2. Un useState "version" se incrementa con refrescar() después de cada
  //      mutación. Ese cambio de estado es lo que fuerza el re-render.
  //   3. Hacia afuera exponemos solo datos derivados (aArray(), tamanio,
  //      vacia, frente()), que se recalculan en cada render. Así ninguna
  //      pantalla puede mutar las estructuras sin pasar por las acciones.
  // ---------------------------------------------------------------------
  const colaPedidos = useRef(new Cola<Pedido>());
  const pilaDeshacer = useRef(new Pila<string>()); // guarda el idItem agregado
  const pilaAtendidos = useRef(new Pila<Pedido>());
  const ultimoNumero = useRef(0); // número correlativo de pedidos
  const contadorItems = useRef(0); // para generar idItem únicos

  const [, setVersion] = useState(0);
  const refrescar = () => setVersion((v) => v + 1);

  // --- Sesión ---
  const iniciarSesion = (usuario: string, clave: string) => {
    const valido = usuario.trim() === USUARIO_COCINA && clave === CLAVE_COCINA;
    // Al pasar conSesion a true, el guard de /login en el layout raíz pasa
    // a false y el modal se cierra solo.
    if (valido) setConSesion(true);
    return valido;
  };

  const cerrarSesion = () => {
    // Al pasar conSesion a false, el guard de /cocina se vuelve false y
    // Expo Router saca esas pantallas del historial automáticamente.
    setConSesion(false);
  };

  // --- Carrito + pila de deshacer ---
  const agregarAlCarrito = (plato: Plato) => {
    contadorItems.current += 1;
    const idItem = `${plato.id}-${contadorItems.current}`;
    setCarrito((actual) => [...actual, { idItem, plato }]);
    pilaDeshacer.current.push(idItem); // LIFO: lo último agregado queda arriba
    refrescar();
  };

  const deshacerUltimo = () => {
    const idItem = pilaDeshacer.current.pop();
    if (idItem === undefined) return;
    // Quitamos exactamente ESE ítem (no el último de la lista por casualidad).
    setCarrito((actual) => actual.filter((item) => item.idItem !== idItem));
    refrescar();
  };

  const total = carrito.reduce((suma, item) => suma + item.plato.precio, 0);

  // --- Cola de pedidos ---
  const confirmarPedido = () => {
    if (carrito.length === 0) return null;
    ultimoNumero.current += 1;
    const pedido: Pedido = {
      numero: ultimoNumero.current,
      items: carrito,
      nota: nota.trim(),
      total,
      creadoEn: Date.now(),
    };
    colaPedidos.current.encolar(pedido); // FIFO: entra al final de la cola

    // Al confirmar se vacían el carrito, la nota y la pila de deshacer.
    setCarrito([]);
    setNota('');
    pilaDeshacer.current = new Pila<string>();
    refrescar();
    return pedido.numero;
  };

  const atenderSiguiente = () => {
    // Única forma de sacar pedidos: siempre el del frente (nadie se cuela).
    const pedido = colaPedidos.current.desencolar();
    if (pedido === undefined) return;
    pilaAtendidos.current.push(pedido);
    refrescar();
  };

  const valor: ValorComedor = {
    conSesion,
    iniciarSesion,
    cerrarSesion,

    carrito,
    cantidadItems: carrito.length,
    total,
    agregarAlCarrito,
    puedeDeshacer: !pilaDeshacer.current.vacia,
    deshacerUltimo,
    nota,
    setNota,
    confirmarPedido,

    pedidosEnEspera: colaPedidos.current.aArray(),
    pedidoAlFrente: colaPedidos.current.frente(),
    cantidadEnEspera: colaPedidos.current.tamanio,
    colaVacia: colaPedidos.current.vacia,
    atenderSiguiente,

    // aArray() va de base a tope; lo invertimos para mostrar del tope a la
    // base (el último atendido primero). reverse() no afecta a la pila
    // porque aArray() devuelve una copia.
    atendidos: pilaAtendidos.current.aArray().reverse(),

    ultimoNumero: ultimoNumero.current,
  };

  return <ComedorContext.Provider value={valor}>{children}</ComedorContext.Provider>;
}

export function useComedor(): ValorComedor {
  const contexto = useContext(ComedorContext);
  if (contexto === null) {
    throw new Error('useComedor tiene que usarse dentro de <ProveedorComedor>');
  }
  return contexto;
}
