import api from "./api";

const endpoint = "/inventariosLevantados";

export const getInventarios = async () => {
    return await api.get(`${endpoint}/all`);
};
export const getInventarioId = async (id) => {
    return await api.get(`${endpoint}/${id}`);
};
export const contarInventarios = async () => {
    return await api.get(`${endpoint}/count`);
};
export const getInventariosEspacio = async (id) => {
    return await api.get(`${endpoint}/espacio/${id}`);
};
export const saveInventario = async (data) => {
    return await api.post(`${endpoint}/save`, data);
}
export const updateInventario = async (id, data) => {
    return await api.put(`${endpoint}/update/${id}`, data);
};