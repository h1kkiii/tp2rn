import { Redirect } from 'expo-router';

// /pedido era la URL de la versión anterior de la app. <Redirect> REEMPLAZA
// la entrada en la pila (como router.replace): si apilara, "atrás" desde
// /carrito volvería a /pedido y este volvería a redirigir (bucle).
export default function Pedido() {
  return <Redirect href="/carrito" />;
}
