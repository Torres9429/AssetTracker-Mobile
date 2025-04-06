import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const InicioSesionScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, error } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCorreoChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }
  
    setErrorMessage(null); // Limpiar mensaje anterior si lo había
  
    try {
      await handleLogin(email, password);
    } catch (err) {
      // Si `handleLogin` lanza error, capturarlo aquí
      setErrorMessage("Correo o contraseña incorrectos."); // o el mensaje que desees
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../assets/welcomeBackground.png")}
        style={styles.background}
        resizeMode="cover"
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.container}>
              <View style={styles.card}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{ width: "100%", paddingBottom: 50 }}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail" size={24} color="#aaa" style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Correo electrónico"
                      placeholderTextColor="#aaa"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed" size={24} color="#aaa" style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Contraseña"
                      placeholderTextColor="#aaa"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#aaa" style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                  {(error || errorMessage) && (
                    <Text style={styles.errorText}>{error || errorMessage}</Text>
                  )}
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Entrar</Text>
                  </TouchableOpacity>
                  <Text style={styles.signUpText}>
                    ¿No tienes una cuenta? <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>Regístrate</Text>
                  </Text>
                  {/*<View style={styles.line} />
                  <Text style={styles.signUpText}>
                    ¿Olvidaste tu contraseña? <Text style={styles.link} onPress={() => navigation.navigate("RecuperarContra")}>Recuperar contraseña</Text>
                  </Text>*/}
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground >
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
    bottom: 0,
    paddingBottom: 0,
    height: "100%",
    marginBottom: 0,
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
    paddingTop: 45,
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
    marginBottom: 40,
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
  signUpText: {
    color: "#555",
    //marginTop: 20,
    marginVertical: 20,
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  /*line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },*/
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#F0F0F0",
    //marginVertical: 10,
  },
  dividerText: {
    fontSize: 16,
    color: "#888",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },


});

export default InicioSesionScreen;