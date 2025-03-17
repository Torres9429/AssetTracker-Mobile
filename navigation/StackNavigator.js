import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import InicioSesionScreen from '../screens/InicioSesionScreen';
import RegistroScreen from '../screens/RegistroScreen';
import MainTabNavigator from './MainTabNavigator'; // Importa tu Tab Navigator principal
import RecuperacionContrasenaScreen from '../screens/RecuperacionContrasenaScreen';
import CambioContrasenaScreen from '../screens/CambioContrasenaScreen';
import CodigoRecuperacionScreen from '../screens/CodigoRecuperacionScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={InicioSesionScreen} />
      <Stack.Screen name="SignUp" component={RegistroScreen} />
      <Stack.Screen name="RecuperarContra" component={RecuperacionContrasenaScreen} />
      <Stack.Screen name="CodigoRecuperacion" component={CodigoRecuperacionScreen} />
      <Stack.Screen name="CambioContrasena" component={CambioContrasenaScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}