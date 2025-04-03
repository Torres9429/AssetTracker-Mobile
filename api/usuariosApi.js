import axios from 'axios';
import api from './api';
import {API_BASE_URL} from '@env';

const endpoint ='usuarios';

export const getUsuarios = async () =>{
    return await api.get(`${endpoint}/all`);
}

export const getUsuario = async (id) =>{
    return await api.get(`${endpoint}/${id}`);
}

export const updateUsuario = async (data) =>{
    return await api.put(`${endpoint}/update`, data);
}
export const saveUsuario = async (data) =>{
    return await api.post(`${endpoint}/save`, data);
}