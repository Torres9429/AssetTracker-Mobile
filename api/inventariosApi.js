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
/*export const updateInventario = async (id, data) => {
    return await api.put(`${endpoint}/update/${id}`, data);
};*/
export const updateInventario = async (id, file) => {
    const formData = new FormData();

    formData.append("id", id); // parte del DTO
    formData.append("file", {
        uri: file.uri,
        type: file.type || "image/jpeg",
        name: file.name || "foto.jpg",
    });

    return await api.put(`${endpoint}/update`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

