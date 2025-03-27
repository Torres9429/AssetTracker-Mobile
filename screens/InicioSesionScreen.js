import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const InicioSesionScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin } = useContext(AuthContext);
  /*const handleLogin = () => {
    if (email === '2' && password === '1') {
      navigation.navigate('Main');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };*/
  const handleCorreoChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    handleLogin(email, password); // Asegúrate de pasar los valores, no el evento
    
  };
  /*const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado con:", { email, password });
    await handleLogin(email, password);
    const token = localStorage.getItem("jwt");
    if (token) {
      navigation.navigate('Main'); // Redirige solo si hay token
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };*/

  return (
    <ImageBackground
      source={require("../assets/welcomeBackground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Iniciar Sesión</Text>
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
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.signUpText}>
              ¿No tienes una cuenta? <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>Regístrate</Text>
            </Text>
            {/*<View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>¿Olvidaste tu contraseña?</Text>
              <View style={styles.line} />
            </View>*/}
            <View style={styles.line} />
            <Text style={styles.signUpText}>
              ¿Olvidaste tu contraseña? <Text style={styles.link} onPress={() => navigation.navigate("RecuperarContra")}>Recuperar contraseña</Text>
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
    height: "75%",
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2B50EC",
    marginBottom: 50,
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

});

export default InicioSesionScreen;