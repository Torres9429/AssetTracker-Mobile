import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const RegistroScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState("Administrador");
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ImageBackground source={require("../assets/welcomeBackground.png")} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Registrarse</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={24} color="#aaa" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre(s)"
                placeholderTextColor="#aaa"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={24} color="#aaa" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Apellidos"
                placeholderTextColor="#aaa"
                value={apellidos}
                onChangeText={setApellidos}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={24} color="#aaa" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={correo}
                onChangeText={setCorreo}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={24} color="#aaa" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#aaa" style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="briefcase" size={24} color="#aaa" style={styles.icon} />
              <Picker
                selectedValue={selectedRole}
                style={styles.input}
                onValueChange={(itemValue) => setSelectedRole(itemValue)}
              >
                <Picker.Item label="Administrador" value="Administrador" />
                <Picker.Item label="Inspector" value="Inspector" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <Text style={styles.signInText}>
              ¿Ya tienes una cuenta? <Text style={styles.link} onPress={() => navigation.navigate("SignIn")}>Acceder</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  card: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2B50EC",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
    borderWidth: 0,
    backgroundColor: '#F0F0F0',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#2B50EC",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#2B50EC",
    fontWeight: "bold",
  },
  signInText: {
    color: "#555",
    marginTop: 10,
  },
});

export default RegistroScreen;