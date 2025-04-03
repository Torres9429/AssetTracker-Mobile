import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

<<<<<<< HEAD

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
},
});
console.log('API Base URL:', API_BASE_URL);



api.interceptors.request.use(
  async (config) => {
    //const token = await getToken();
    const token = await AsyncStorage.getItem("jwt"); // Cambia esto por el nombre correcto de tu token
    console.log("Token obtenido:", token); // Muestra el token obtenido
    if (token) {        
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    //console.log("Respuesta de la API:", response);
    return response;
  },
  (error) => {
    //console.error("Error en la respuesta de la API:", error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default api;

/*/ api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://3a76hppbug.execute-api.us-east-1.amazonaws.com/";
// Usar el URL de desarrollo local (si corresponde)
// const API_BASE_URL = "http://localhost:5000/";
=======
const API_BASE_URL = "https://3a76hppbug.execute-api.us-east-1.amazonaws.com/"; // Reemplázalo con la URL de tu API
>>>>>>> a25d8ce2c33ef2ca2bc72e9729fceed296ec279f

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
