import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PerfilScreen() {
  const navigation = useNavigation();
  const usuario = {
    nombre: 'Carlos Jair',
    apellidos: 'Rodríguez Coronel',
    tipoUsuario: 'Administrador',
    correo: 'carlosrodriguez@utez.edu.mx',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>
      <View style={styles.profileCard}>
        <Ionicons name='person-circle' color="#416FDF" size={100} />
        <Text style={styles.nombre}>{usuario.nombre} {usuario.apellidos}</Text>
        <Text style={styles.correo}>{usuario.correo}</Text>
        <View style={styles.infoContainer}>
          <View style={[styles.infoBox, styles.universityBox]}>
            <Text style={styles.infoLabel}>Tipo de usuario</Text>
            <Text style={styles.infoValue}>{usuario.tipoUsuario}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EdicionPerfilScreen', { usuario })}>
            <Ionicons name="create-outline" size={24} color="#416FDF" />
            <Text style={styles.menuText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CambiarContrasenaScreen')}>
            <Ionicons name="lock-closed-outline" size={24} color="#416FDF" />
            <Text style={styles.menuText}>Cambiar Contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem]} onPress={() => navigation.navigate('Welcome')}>
            <Ionicons name="log-out-outline" size={24} color="red" />
            <Text style={styles.menuText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#416FDF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    top: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profileCard: {
    width: "100%",
    height: "100%",
    top: 40,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
    paddingTop: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  correo: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  infoBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  universityBox: {
    backgroundColor: '#416FDF',
  },
  phoneBox: {
    backgroundColor: '#FFD700',
  },
  infoLabel: {
    fontSize: 12,
    color: 'white',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  menuContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    borderBottomWidth: 0,
    borderRadius: 10,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
});