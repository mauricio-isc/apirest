export interface Producto{
    id?: number;
    nombre: string;
    precio: number;
    descripcion: string;
    stock: number;
    creado?: string;
    actualizado?: string;
}


export interface ProductoFormData{
    nombre: string;
    precio: string;
    descripcion: string;
    stock: string;
}