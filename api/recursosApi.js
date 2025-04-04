import api from "./api";

const endpoint = "/recursos";

export const getRecursos = async () => {
    return await api.get(`${endpoint}/all`);
};
export const getRecursoId = async (id) => {
    return await api.get(`${endpoint}/inventario/${id}`);
};
export const contarRecursos = async () => {
    return await api.get(`${endpoint}/count`)
}