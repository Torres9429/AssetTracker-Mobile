import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import WelcomeScreen from '../screens/WelcomeScreen';
import { Ionicons } from '@expo/vector-icons';

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
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {<Tab.Screen
        name="HomeTab"
        component={StackNavigator}
        options={{ headerShown: false, title: 'Home' }}
      />}
      <Tab.Screen name="Profile" component={WelcomeScreen} options={{ headerShown: false, title: 'Home' }} />
    </Tab.Navigator>
  );
}