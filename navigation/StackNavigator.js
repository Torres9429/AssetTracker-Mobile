import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import InicioSesionScreen from '../screens/InicioSesionScreen';
import RegistroScreen from '../screens/RegistroScreen';
import MainTabNavigator from './MainTabNavigator'; // Importa tu Tab Navigator principal
import RecuperacionContrasenaScreen from '../screens/RecuperacionContrasenaScreen';
import CambioContrasenaScreen from '../screens/CambioContrasenaScreen';
import CodigoRecuperacionScreen from '../screens/CodigoRecuperacionScreen';
import EdicionPerfilScreen from '../screens/EdicionPerfilScreen';
import CambiarContrasenaScreen from '../screens/CambiarContrasenaScreen';
import PerfilScreen from '../screens/PerfilScreen';
import EscanearScreen from '../screens/EscanearScreen';
import CameraComponent from '../components/Camera';

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
      <Stack.Screen name="EdicionPerfilScreen" component={EdicionPerfilScreen}/>
      <Stack.Screen name="Perfil" component={PerfilScreen}/>
      <Stack.Screen name="CambiarContrasenaScreen" component={CambiarContrasenaScreen}/>
      <Stack.Screen name="Escanear" component={EscanearScreen} options={{ unmountOnBlur: true }}/>
      <Stack.Screen name="CameraScreen" component={CameraComponent}/>
      
    </Stack.Navigator>
  );
}