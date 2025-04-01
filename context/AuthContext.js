import { createContext, useState } from "react";
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
    await AsyncStorage.clear();
    navigation.navigate("Welcome");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
