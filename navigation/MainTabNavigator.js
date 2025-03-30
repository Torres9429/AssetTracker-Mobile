import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, StyleSheet, ScrollView } from 'react-native';
import InventariosStack from './InventariosStack';
import Scanner from '../scanner/Scanner';
import PerfilScreen from '../screens/PerfilScreen';
import EscanearScreen from '../screens/EscanearScreen';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

export default function MainTabNavigator() {
  return (
    <View style={{ width, height, flexGrow: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return <Ionicons name="home" size={size} color={color} />;
              } else if (route.name === 'Escaner') {
                return <MaterialCommunityIcons name="barcode-scan" size={size} color={color} />;
              } else if (route.name === 'Perfil') {
                return <Ionicons name="person-circle-outline" size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#999',
            animation: 'shift',
            //tabBarHideOnKeyboard: true,
            tabBarLabelStyle: { display: 'none' }, // Hide default tab label
            tabBarStyle: {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              height: 70,
              borderTopWidth: 1,
              padding: 5,
              paddingBottom: Platform.OS === 'ios' ? 20 : 5,
              zIndex: 10, // Ensure tab bar stays on top
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={InventariosStack}
            options={{
              headerShown: false,
              title: 'Edificios',
              tabBarButton: (props) => <CustomTabButton {...props} label="Edificios" />,
            }}
          />
          <Tab.Screen
            name="Escaner"
            component={EscanearScreen}
            options={{
              headerShown: false,
              title: 'Escaner',
              tabBarButton: (props) => <CustomTabButton {...props} label="Escaner" />,
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={PerfilScreen}
            options={{
              headerShown: false,
              title: 'Perfil',
              tabBarButton: (props) => <CustomTabButton {...props} label="Perfil" />,
            }}
          />
        </Tab.Navigator>
    </View>
  );
}

// Custom button for tab bar
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