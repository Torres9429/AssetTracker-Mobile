import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import { Ionicons } from '@expo/vector-icons';
import MainTabNavigator from './MainTabNavigator';
import EdificiosScreen from '../screens/EdificiosScreen';
import EspaciosScreen from '../screens/EspaciosScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,0)',
          height: 60,

          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
    >
      {<Tab.Screen
        name="HomeTab"
        component={MainTabNavigator}
        options={{ headerShown: false, title: 'Home' }}
      />}
      <Tab.Screen name="Edificios" component={EdificiosScreen} options={{ headerShown: false, title: 'Home' }} />
      <Tab.Screen name="Espacios" component={EspaciosScreen} options={{ headerShown: false, title: 'Espacios' }} />
    </Tab.Navigator>
  );
}