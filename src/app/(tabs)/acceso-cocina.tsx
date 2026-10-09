import { Redirect } from 'expo-router';

// Desafío 2: pestaña "Cocina" (solo existe con sesión, ver Tabs.Protected en
// (tabs)/_layout.tsx). Es un ACCESO a la sección cocina, no la sección:
// /cocina ya es el Drawer del Stack raíz. Por eso este archivo no puede
// llamarse cocina.tsx: generaría otra ruta /cocina en conflicto con
// src/app/cocina/.
//
// Normalmente esta pantalla nunca se ve: el listener tabPress de la tab
// cancela el foco y hace router.push('/cocina'). Este <Redirect> es el
// respaldo si alguien entra por URL (/acceso-cocina): reemplaza esta
// pantalla por /cocina.
export default function AccesoCocina() {
  return <Redirect href="/cocina" />;
}
