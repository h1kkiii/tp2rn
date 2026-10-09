import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import { Boton } from '@/components/Boton';
import { colores, estilosComunes } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

// /login: modal del Stack raíz que SOLO existe sin sesión
// (está dentro de <Stack.Protected guard={!conSesion}>).
export default function Login() {
  const { iniciarSesion } = useComedor();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const ingresar = () => {
    if (!iniciarSesion(usuario, clave)) {
      // Credenciales incorrectas: el modal sigue abierto y mostramos el error.
      setError('Usuario o clave incorrectos.');
      return;
    }
    // Login correcto: NO llamamos a router.back(). Al pasar conSesion a
    // true, el guard de este modal pasa a false, Expo Router saca /login
    // de la pila y el modal se cierra solo.
  };

  return (
    <Pantalla>
      <Text style={estilosComunes.titulo}>Ingreso del personal de cocina</Text>
      <TextInput
        style={estilos.campo}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Usuario"
        placeholderTextColor={colores.deshabilitado}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={estilos.campo}
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        placeholderTextColor={colores.deshabilitado}
        secureTextEntry
        autoCapitalize="none"
        onSubmitEditing={ingresar}
      />
      {error !== '' && <Text style={estilosComunes.error}>{error}</Text>}
      <Boton titulo="Ingresar" onPress={ingresar} />
    </Pantalla>
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
});
