import api from "./api";

const endpoint = "/inventarios";

export const getInventarios = async () => {
    return await api.get(`${endpoint}/all`);
};
export const getInventarioId = async (id) => {
    return await api.get(`${endpoint}/${id}`);
};