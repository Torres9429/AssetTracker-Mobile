import axios from 'axios';
import { API_BASE_URL } from '@env';
import { getToken } from '../api/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const token = await AsyncStorage.getItem("jwt");
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
    console.log("Respuesta de la API:", response);
    return response;
  },
  (error) => {
    console.error("Error en la respuesta de la API:", error.response ? error.response.data : error.message);
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

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const noAuthRoutes = [
  "/auth/login",
  "/usuarios/save",
  "/usuarios/change-password",
  "/usuarios/send-email",
  "/usuarios/verify-code",
  "/usuarios/verify-password",
  "/usuarios/change-password-gral"
];

api.interceptors.request.use(
  async (config) => {
    if (!config.url) {
      return config;
    }

    // Normaliza la URL eliminando parámetros de consulta para comparación exacta
    const urlPath = new URL(config.url, API_BASE_URL+'/usuarios').pathname;
    const requiresAuth = !noAuthRoutes.includes(urlPath);

    if (requiresAuth) {
      const token = await AsyncStorage.getItem("jwt");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    // console.log("Respuesta de la API:", response);
    return response;
  },
  (error) => {
    // console.error("Error en la respuesta de la API:", error);
    return Promise.reject(error);
  }
);

export default api;


// // api.js
// import axios from "axios";
// //Se usa Asynctorage como si  fuera un local stoarage
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = "https://3a76hppbug.execute-api.us-east-1.amazonaws.com/";
// // Usar el URL de desarrollo local (si corresponde)
// // const API_BASE_URL = "http://localhost:5000/";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // Interceptor para agregar el JWT al header Authorization
// api.interceptors.request.use(
//   async (config) => {
//     // Obtener el token desde AsyncStorage
//     const token = await AsyncStorage.getItem("jwt");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Interceptor para manejar las respuestas de la API
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Función para almacenar el JWT en AsyncStorage
// const saveToken = async (token) => {
//   try {
//     await AsyncStorage.setItem("jwt", token);
//   } catch (error) {
//     console.error("Error al guardar el token:", error);
//   }
// };

// // Función para obtener el JWT desde AsyncStorage
// const getToken = async () => {
//   try {
//     return await AsyncStorage.getItem("jwt");
//   } catch (error) {
//     console.error("Error al obtener el token:", error);
//     return null;
//   }
// };

// // Función para eliminar el JWT de AsyncStorage
// const removeToken = async () => {
//   try {
//     await AsyncStorage.removeItem("jwt");
//   } catch (error) {
//     console.error("Error al eliminar el token:", error);
//   }
// };

// export { api, saveToken, getToken, removeToken };*
*/