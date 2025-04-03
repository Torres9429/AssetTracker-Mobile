import api from "./api";  // Aquí usas el axios configurado con baseURL

const endpoint = "/edificios";

export const getEdificios = async () => {
  return await api.get(`${endpoint}/all`);
};


export const getEdificiosId = async (id) => {
    return await api.get(`${endpoint}/${id}`);
};

export const contarEdificios = async () => {
  return await api.get(`${endpoint}/count`);
   
};
