import api from "./api";

const endpoint = "/espacios";

export const getEspacios = async () => {
    return await api.get(`${endpoint}/all`);
};
export const getEspaciosId = async (id) => {
    return await api.get(`${endpoint}/${id}`);
};
export const contarEspacios = async () => {
    return await api.get(`${endpoint}/count`)
}