import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EdificiosScreen from '../screens/EdificiosScreen';
import EspaciosScreen from '../screens/EspaciosScreen';

const Stack = createNativeStackNavigator();

export default function InventariosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Edificios"
        component={EdificiosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Espacios"
        component={EspaciosScreen}
        options={{ headerShown: false }}
      />
      {/*<Stack.Screen
        name="Inventarios"
        component={InventariosPorEspacioScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetallesRecurso"
        component={DetallesRecursoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NuevoRecurso"
        component={NuevoRecursoScreen}
        options={{ headerShown: false }}
      />*/}
    </Stack.Navigator>
  );
}