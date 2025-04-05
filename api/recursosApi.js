import api from "./api";

const endpoint = "/recursos";

export const getRecursos = async () => {
    return await api.get(`${endpoint}/all`);
};
export const getRecursoId = async (id) => {
    return await api.get(`${endpoint}/inventario/${id}`);
};
export const getRecursoCodigo = async (codigo) => {
    return await api.get(`${endpoint}/${codigo}`);
};
export const contarRecursos = async () => {
    return await api.get(`${endpoint}/count`)
}
export const saveRecurso = async (data) => {
    return await api.post(`${endpoint}/save`, data);
};
