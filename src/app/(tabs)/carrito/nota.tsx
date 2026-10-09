import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import { Boton } from '@/components/Boton';
import { colores, estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

// /carrito/nota: aclaración para la cocina (ej.: "sin sal").
export default function NotaCocina() {
  const { nota, setNota } = useComedor();
  // Borrador local: la nota se guarda recién al tocar "Guardar nota".
  const [borrador, setBorrador] = useState(nota);

  const guardar = () => {
    setNota(borrador.trim());
    // Navegamos DESPUÉS de una lógica (guardar), por eso router y no Link.
    // dismissTo('/carrito') saca pantallas de la pila hasta llegar a
    // /carrito. Si se entró a la nota por deep link y /carrito no está
    // debajo, reemplaza la nota por /carrito (back() no tendría adónde ir).
    router.dismissTo('/carrito');
  };

  return (
    <Pantalla>
      <Text style={estilosComunes.texto}>¿Querés aclararle algo a la cocina?</Text>
      <TextInput
        style={estilos.campo}
        value={borrador}
        onChangeText={setBorrador}
        placeholder='Ej.: "sin sal", "la milanesa bien cocida"'
        placeholderTextColor={colores.deshabilitado}
        multiline
        maxLength={200}
      />
      <Boton titulo="Guardar nota" onPress={guardar} />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  campo: {
    minHeight: 100,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: colores.texto,
    textAlignVertical: 'top',
  },
});
