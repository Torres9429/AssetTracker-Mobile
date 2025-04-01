import api from './api';

const endpoint = "/auth";

export const login = async (credenciales) => {
  console.log("Credenciales enviadas para login:", credenciales); // Muestra las credenciales que se envían
  try {
    return await api.post(`${endpoint}/login`, credenciales)
      .then(response => {
        console.log("Respuesta del login:", response); // Muestra la respuesta de la API
        return response;
      })
  } catch (error) {
    if (error.response) {
      //console.error("Error en la solicitud de login:", error.response.data);
      throw new Error(error.response.data.message || "Error en la autenticación");
    } else {
      //console.error("Error en la conexión:", error);
      throw new Error("Error en la conexión con el servidor");
    }
  }

};

export const logout = async () => {
  return await api.post(`${endpoint}/logout`)
    .then(response => {
      // console.log("Respuesta de logout:", response);
      return response;
    })
    .catch(error => {
      // console.error("Error en el logout:", error);
      throw error;
    });
};
