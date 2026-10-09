import type { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { DondeEstoy } from './DondeEstoy';
import { estilosComunes } from './estilos';

// Contenedor común de todas las pantallas: scroll, padding y el panel
// "¿Dónde estoy?" siempre al final.
export function Pantalla({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      style={estilosComunes.pantalla}
      contentContainerStyle={estilosComunes.contenido}
      keyboardShouldPersistTaps="handled"
    >
      {children}
      <DondeEstoy />
    </ScrollView>
  );
}
