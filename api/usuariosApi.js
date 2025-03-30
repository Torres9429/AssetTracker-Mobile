import api from './api';

const endpoint ='/usuarios';

export const getUsuarios = async () =>{
    return await api.get(`${endpoint}/all`);
}

export const getUsuario = async (id) =>{
    return await api.get(`${endpoint}/${id}`);
}

export const updateUsuario = async (data) =>{
    return await api.put(`${endpoint}/update`, data);
}