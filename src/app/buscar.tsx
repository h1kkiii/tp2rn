import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colores, estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { filtrarPlatos } from '@/data/platos';
import { CATEGORIAS, esCategoria } from '@/data/tipos';

// /buscar?q=&categoria=
// La búsqueda vive en la URL: no hay useState para el texto ni para la
// categoría. Por eso se puede compartir con un link, por ejemplo:
// comedoripf://buscar?q=chipa&categoria=desayuno
export default function Buscar() {
  // No hacen falta corchetes en el nombre del archivo: q y categoria son
  // parámetros de búsqueda (?q=...), no segmentos de la ruta.
  const { q = '', categoria } = useLocalSearchParams<{ q?: string; categoria?: string }>();

  // Validamos la categoría que viene en la URL (puede venir cualquier cosa).
  const categoriaNormalizada = categoria?.toLowerCase();
  const categoriaValida =
    categoriaNormalizada !== undefined && esCategoria(categoriaNormalizada) ? categoriaNormalizada : undefined;
  const categoriaInvalida = categoria !== undefined && categoria !== '' && categoriaValida === undefined;

  const resultados = filtrarPlatos(q, categoriaValida);

  // router.setParams actualiza los parámetros de ESTA pantalla sin apilar
  // una nueva: si usáramos push, cada letra escrita sería una pantalla más
  // y "atrás" recorrería letra por letra. Con setParams, "atrás" sale del
  // buscador de una.
  const cambiarTexto = (texto: string) => {
    router.setParams({ q: texto === '' ? undefined : texto });
  };

  const elegirCategoria = (nueva?: string) => {
    router.setParams({ categoria: nueva });
  };

  return (
    <Pantalla>
      <TextInput
        style={estilos.campo}
        value={q}
        onChangeText={cambiarTexto}
        placeholder="Buscar platos (ej.: chipa)"
        placeholderTextColor={colores.deshabilitado}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <View style={estilos.chips}>
        <Chip texto="Todas" activo={categoriaValida === undefined} onPress={() => elegirCategoria(undefined)} />
        {CATEGORIAS.map((c) => (
          <Chip key={c} texto={c} activo={categoriaValida === c} onPress={() => elegirCategoria(c)} />
        ))}
      </View>

      {categoriaInvalida && (
        <Text style={estilosComunes.error}>La categoría &quot;{categoria}&quot; no existe: se muestran todas.</Text>
      )}

      <Text style={estilosComunes.textoSuave}>
        {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
      </Text>
      {resultados.map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}
    </Pantalla>
  );
}

// Chip de categoría. No es un Link porque no navega a otra pantalla:
// solo cambia un parámetro de la pantalla actual con setParams.
function Chip({ texto, activo, onPress }: { texto: string; activo: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[estilos.chip, activo && estilos.chipActivo]}>
      <Text style={[estilos.textoChip, activo && estilos.textoChipActivo]}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  campo: {
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colores.texto,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colores.primario,
    backgroundColor: colores.tarjeta,
  },
  chipActivo: {
    backgroundColor: colores.primario,
  },
  textoChip: {
    color: colores.primario,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  textoChipActivo: {
    color: '#FFFFFF',
  },
});
