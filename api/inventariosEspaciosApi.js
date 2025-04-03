import api from "./api";

const endpoint = "/inventariosLevantados";

export const getInventarios = async () => {
    return await api.get(`${endpoint}/all`);
};
export const getInventarioId = async (id) => {
    return await api.get(`${endpoint}/${id}`);
};
export const contarInventario= async () => {
    return await api.get(`${endpoint}/count`)
}