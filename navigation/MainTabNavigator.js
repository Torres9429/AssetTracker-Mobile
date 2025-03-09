import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EdificiosScreen from '../screens/EdificiosScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import { View, Text, TouchableOpacity } from 'react-native';
import InventariosStack from './InventariosStack';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Main') {
            iconName = 'home';
          } else if (route.name === 'Escaner') {
            iconName = 'barcode-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: { display: 'none' }, // Oculta el nombre del tab por defecto
        tabBarStyle: {
          position: 'absolute',
          //bottom: 20, // Elevar el tabBar
          //left: 20,
          //right: 20,
          //backgroundColor: '#152567',
          backgroundColor: 'white',
          height: 70,
          //borderRadius: 30, // Bordes redondeados
          borderTopWidth: 1,
          elevation: 5, // Sombra en Android
          shadowColor: '#000', // Sombra en iOS
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          padding: 5,
        },
      })}
    >
      
      <Tab.Screen 
        name="Main" 
        component={InventariosStack} 
        options={{
          headerShown: false, 
          title: 'Edificios',
          tabBarButton: (props) => <CustomTabButton {...props} label="Edificios" />,
        }} 
      />
      <Tab.Screen 
        name="Escaner" 
        component={HomeScreen} 
        options={{
          headerShown: false, 
          title: 'Escaner',
          tabBarButton: (props) => <CustomTabButton {...props} label="Escaner" />,
        }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={EdificiosScreen} 
        options={{
          headerShown: false, 
          title: 'Edificios',
          tabBarButton: (props) => <CustomTabButton {...props} label="Perfil" />,
        }} 
      />
      
      
    </Tab.Navigator>
  );
}

// Componente personalizado para los botones del TabBar
const CustomTabButton = ({ accessibilityState, children, onPress, label }) => {
  const isSelected = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: isSelected ? '#416FDF' : 'transparent',
        borderRadius: 30,
        margin: 5,
        paddingHorizontal: isSelected ? 20 : 10,
        height: 30,
      }}
    >
      {children}
      {isSelected && (
        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', marginLeft: 8 }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
