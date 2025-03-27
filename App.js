import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
          <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}