import axios, { AxiosResponse, AxiosError, Axios } from 'axios';
import { Producto } from '../types/Producto';


const API_BASE_URL = 'http://127.0.0.1:8000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//Manejar errores 

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error('API Error: ', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const productoService = {
     //obtener todos los productos (GET)
     getProductos: (): Promise<AxiosResponse<Producto[]>> => 
        api.get<Producto[]>('/productos/'),

     // obtener solo un producto (GET > id)
     getProducto: (id: number): Promise<AxiosResponse<Producto>> =>
        api.get<Producto>(`/productos/${id}/`),

     //crear producto (POST)
     createProducto: (producto: Omit<Producto, 'id'>): Promise<AxiosResponse<Producto>> =>
        api.post<Producto>('/productos/', producto),

     // actualizar producto (PUT)
     updateProducto: (id: number, producto: Partial<Producto>): Promise<AxiosResponse<Producto>> =>
        api.put<Producto>(`/productos/${id}/`, producto),

     // eliminar producto (DELETE)
     deleteProducto: (id: number, producto: Partial<Producto>): Promise<AxiosResponse<Producto>> =>
        api.delete(`/productos/${id}/`),
};

export default api;