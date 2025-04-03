import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "https://3a76hppbug.execute-api.us-east-1.amazonaws.com/"; // Reemplázalo con la URL de tu API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para agregar el token automáticamente a cada petición
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("bearerToken");
    console.log("token"+token);
    if (token) {
      console.log("token"+token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("token"+token);
      console.warn("⚠️ No hay token en la solicitud");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
