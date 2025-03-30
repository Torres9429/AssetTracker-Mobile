import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EdificiosScreen from '../screens/EdificiosScreen';
import EspaciosScreen from '../screens/EspaciosScreen';
import InventariosEspacioScreen from '../screens/InventariosEspacioScreen';
import InventariosScreen from '../screens/InventariosScreen';
import EscanearScreen from '../screens/EscanearScreen';
import AgregarRecursoScreen from '../screens/AgregarRecursoScreen';

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
      <Stack.Screen
        name="Inventarios"
        component={InventariosEspacioScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recursos"
        component={InventariosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Agregar"
        component={AgregarRecursoScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
}