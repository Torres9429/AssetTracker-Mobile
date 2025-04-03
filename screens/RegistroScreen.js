import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ImageBackground, SafeAreaView, Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { saveUsuario } from "../api/usuariosApi";
import axios from "axios";
import { KeyboardAvoidingView } from "react-native";

const RegistroScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSave = async () => {
    if (!nombre || !apellidos || !correo || !password || !selectedRole) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (!validateEmail(correo)) {
      Alert.alert("Error", "Ingresa un correo válido.");
      return;
    }

    const savedData = {
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      contrasena: password,
      rol: selectedRole,
    };

    try {
      await saveUsuario(savedData);
      /*const response = await axios.post(
        "https://3a76hppbug.execute-api.us-east-1.amazonaws.com/usuarios/save",
        savedData,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );*/
      console.log("Datos guardados:", savedData);
      console.log("Usuario guardado:", response.data);
      Alert.alert("Éxito", "Usuario registrado correctamente.");
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al registrar el usuario.");
      console.error("Error al guardar usuario:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={require("../assets/welcomeBackground.png")} style={styles.background} resizeMode="cover">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.container}>
              <View style={styles.card}>
                <Text style={styles.title}>Registrarse</Text>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{ width: "100%", paddingBottom: 50 }}>
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
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={correo}
                    onChangeText={setCorreo}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed" size={24} color="#aaa" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#aaa"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#aaa" style={styles.icon} />
                  </TouchableOpacity>
                </View>
                {/*Platform.OS === "ios" ? (
                  <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
                    <Text style={styles.pickerText}>{selectedRole ? selectedRole : "Selecciona un rol"}</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.pickerContainer}>
                    <Picker selectedValue={selectedRole} onValueChange={setSelectedRole} style={styles.picker}>
                      <Picker.Item label="Selecciona un rol" value={null} />
                      <Picker.Item label="Administrador" value="ROLE_ADMIN_ACCESS" />
                      <Picker.Item label="Inspector" value="ROLE_INSPECTOR_ACCESS" />
                    </Picker>
                  </View>
                )*/}
                <View style={[styles.pickerContainer,]}>
                  <Ionicons name="briefcase" size={24} color="#aaa" style={styles.icon} />
                  <Picker
                    selectedValue={selectedRole}
                    style={[styles.picker, {backfaceVisibility: "hidden",}]}
                    itemStyle={{
                      fontSize: 16,
                      color: "#333",
                    }}
                    mode="dropdown"
                    onValueChange={(itemValue) => setSelectedRole(itemValue)}
                  >
                    <Picker.Item label="Selecciona un rol" value={null} />
                    <Picker.Item label="Administrador" value="ROLE_ADMIN_ACCESS" />
                    <Picker.Item label="Inspector" value="ROLE_INSPECTOR_ACCESS" />
                  </Picker>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
                
                <Text style={styles.signInText}>
                  ¿Ya tienes una cuenta? <Text style={styles.link} onPress={() => navigation.navigate("SignIn")}>Acceder</Text>
                </Text>
                </ScrollView>
              </View>
            </View>

          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SafeAreaView>

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
    height: "75%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    //flexGrow: 1
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
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50, // Misma altura que los demás inputs
    width: "100%",
    marginBottom: 15,
    justifyContent: "center", // Centra el valor en Android
    marginTop: Platform.OS === "ios" ? 40 : 10, // Ajuste de margen solo para Android

  },
  pickerContainerIOS: {
    justifyContent: "center", // Centra los valores en iOS
    margin: Platform.OS === "ios" ? 40 : 0, // Ajuste de margen solo para iOS
    alignItems: "flex-start", // Alinea el picker a la izquierda
  },
  picker: {
    flex: 1, // Para que ocupe todo el espacio disponible
    height: Platform.OS === "ios" ? 210 : 50, // Ajuste de altura solo para iOS
    //color: "#333",
    backgroundColor: "transparent",

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
    marginBottom: 50,
    alignSelf: "center",
  },
});

export default RegistroScreen;
