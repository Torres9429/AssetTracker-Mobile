import { createContext, useState, useEffect } from "react";
import { login as loginApi } from "../api/auth.api";
import { useNavigation } from "@react-navigation/native";
import { saveToken, getToken, removeToken } from "../api/authService"; // Usa las funciones que me diste
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [error, setError] = useState(null);


  const handleLogin = async (correo, password) => {
    try {
      const response = await loginApi({ correo, password });
  
      // Desestructuración de los datos correctamente
      const { jwt, username, role, userId } = response.data;
  
      // Verifica si el token y el usuario existen
      if (jwt && username && userId) {
        await saveToken(jwt);
        console.log("Token guardado:", jwt);
  
        const user = { username, role, userId };
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("userId", String(userId));
        setUser(user);
        navigation.navigate("Main");
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
        setError(null);
      } else {
        //console.error("Token o usuario no disponibles en la respuesta.");
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      //console.error("Error en el inicio de sesión:", error);
      setError("Correo o contraseña incorrectos");
    }
  };

  const logout = async () => {
    await removeToken();
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("expiration");
    await AsyncStorage.clear();
    setUser(null);
    navigation.navigate("Welcome");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
/*import { createContext, useState } from "react";
import { login as loginApi } from "../api/auth.api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async (correo, password) => {
    try {
      const response = await loginApi({ correo, password });

      if (response.status === 200) {
        const { jwt, username, role, userId, expiration } = response.data;

        // Guardar datos en AsyncStorage
        await AsyncStorage.multiSet([
          ['jwt', jwt],
          ['userId', userId.toString()]
        ]);
        
        console.log('Login exitoso, token guardado:', jwt);
        //const jwtString = JSON.stringify(jwt);  
        //await AsyncStorage.setItem("jwt", jwtString);
        await AsyncStorage.setItem("user", JSON.stringify({ username, role }));
        await AsyncStorage.setItem("userId", String(userId));
        await AsyncStorage.setItem("expiration", String(Date.now() + expiration));

        // Actualizar estado
        setUser({ username, role });
        setError(null);

        // Navegar a la pantalla principal
        navigation.navigate("Main");
      } else {
        setError("Credenciales incorrectas");
        setUser(null);
      }
    } catch (err) {
      //console.error("Error en la conexión:", err);
      setError("Correo o contraseña incorrectos");
    }
  };

  const logout = async () => {
    setUser(null);
    /*await AsyncStorage.removeItem("jwt");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("expiration");*/
    /*await AsyncStorage.clear();
    navigation.navigate("Welcome");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};*/
