import { createContext, useState } from "react";
import { login as loginApi } from "../api/auth.api";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); 
  const navigation = useNavigation();

  const handleLogin = async (correo, password) => {
    try {
      // Realizar la petición a la API
      const response = await loginApi({ correo, password });

      if (response.status === 200) {
        // Extraer datos de la respuesta
        const { jwt, username, expiration, userId } = response.data;

        // Guardar el JWT y otros datos en localStorage
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("user", JSON.stringify({ username }));
        localStorage.setItem("id", userId);
        localStorage.setItem("expiration", Date.now() + expiration); // Guardar el tiempo de expiración

        // Actualizar el estado del usuario
        setUser({ username });
        setError(null); // Limpiar errores
        navigation.navigate("Main"); // Redirigir a la pantalla principal
      } else {
        // Manejar errores de autenticación
        setError("Credenciales incorrectas");
        setUser(null);
      }
    } catch (err) {
      console.error("Error en la conexión:", err);
      setError("Error en la conexión con el servidor");
      setUser(null);
      alert("Contraseña o correo incorrectos");
    }
  };

  const logout = () => {
    // Limpiar el estado y el localStorage al cerrar sesión
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("expiration");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};