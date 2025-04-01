import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

const endpoint = "/edificios";

export const getEdificios = async () => {
  return await api.get(`${endpoint}/all`);
};
export const getEdificiosId = async (id) => {
  return await api.get(`${endpoint}/${id}`);
};
export const chageStatus = async (id) => {
  try {
    const response = await api.put(
      `${endpoint}/status`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${AsyncStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al cambiar el estado de la categoría de Espacios:",
      error
    );
    throw error;
  }
};

export const crearEdificio = async (nombre, numeroPisos) => {
  try {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("numerPisos", numeroPisos);
    const response = await api.post(`${endpoint}/save`, formData, {
      headers: {
        Authorization: `Bearer ${AsyncStorage.getItem("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el edificio");
    throw error;
  }
};

export const contarEdificios = async () => {
  return await api.get(`${endpoint}/count`);
};
