import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState('SignIn');

  const handlePress = (button) => {
    setSelectedButton(button);
    navigation.navigate(button);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ImageBackground
      source={require("../assets/welcomeBackground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>¡Bienvenido!</Text>
            <Text style={styles.subtitle}>Gestiona tus recursos eficientemente</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === "SignIn" && styles.buttonSelectedSignIn,
              ]}
              onPress={() => handlePress("SignIn")}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedButton === "SignIn" && styles.buttonTextSelectedSignIn,
                ]}
              >
                Acceder
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === "SignUp" && styles.buttonSelectedSignUp,
              ]}
              onPress={() => handlePress("SignUp")}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedButton === "SignUp" && styles.buttonTextSelectedSignUp,
                ]}
              >
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </ImageBackground>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end", 
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    width: '100%',
  },
  button: {
    flex: 1, 
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSelectedSignIn: {
    backgroundColor: "white",
    borderTopRightRadius: 40,
  },
  buttonTextSelectedSignIn: {
    color: "#416FDF",
  },
  buttonSelectedSignUp: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
  },
  buttonTextSelectedSignUp: {
    color: "#416FDF",
  },
});

export default WelcomeScreen;