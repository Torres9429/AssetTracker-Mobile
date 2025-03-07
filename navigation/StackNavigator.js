import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import InicioSesionScreen from '../screens/InicioSesionScreen';
import RegistroScreen from '../screens/RegistroScreen';
import MainTabNavigator from './MainTabNavigator'; // Importa tu Tab Navigator principal
import EspaciosScreen from '../screens/EspaciosScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={InicioSesionScreen} />
      <Stack.Screen name="SignUp" component={RegistroScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="Espacios" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}