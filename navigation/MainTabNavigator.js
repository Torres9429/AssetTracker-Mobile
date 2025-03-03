import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EdificiosScreen from '../screens/EdificiosScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Main') {
          iconName = 'home';
        } else if (route.name === 'Perfil') {
          iconName = 'person';
          
        } else if (route.name === 'Scanner') {
          iconName = 'barcode-outline';
          
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6EAEE7',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarStyle: {
        backgroundColor: '#133E87',
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
    })}
    >
      <Tab.Screen name="Main" component={EdificiosScreen} options={{ headerShown: false, title: 'Edificios' }} />
    </Tab.Navigator>
  );
}