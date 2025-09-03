import { useState, useEffect, useCallback } from 'react';
import { Producto, ProductoFormData  } from '../types/Producto';
import { productoService  } from '../services/api';

interface UseProductosReturn {
    productos: Producto[];
    loading: boolean;
    error: string | null;
    fetchProductos: () => Promise<void>;
    createProducto: (productoData: ProductoFormData) => Promise<Producto>;
    updateProducto: (id: number, productoData: ProductoFormData) => Promise<Producto>;
    deleteProducto: (id: number) => Promise<void>;
}

export const useProductos = (): UseProductosReturn => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProductos = useCallback(async (): Promise<void> => {
        try{
            setLoading(true);
            const response = await productoService.getProductos();
            setProductos(response.data);
            setError(null);
        }catch(err: any){
            setError(err.response?.data || 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    }, []);

    const createProducto = async (productoData: ProductoFormData): Promise<Producto> => {
        try{
            const producto: Omit<Producto, 'id'> = {
                nombre: productoData.nombre,
                precio: parseFloat(productoData.precio),
                description: productoData.descripcion,
                stock: parseInt(productoData.stock),
            };
            const response = await productoService.createProducto(producto);
            const newProducto = response.data;
            setProductos(prev => [...prev, newProducto]);
            setError(null);
            return newProducto;
        }catch(err: any){
            const errorMsg = err.response?.data || 'Error al crear producto';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const updateProducto = async (id: number, productoData: ProductoFormData): Promise<Producto> =>
    {
        try {
            const producto: Partial<Producto> = {
                nombre: productoData.nombre,
                precio: parseFloat(productoData.precio),
                description: productoData.descripcion,
                stock: parseInt(productoData.stock),
            };

            const response = await productoService.updateProducto(id, producto);
            const updatedProducto = response.data;
            setProductos(prev => prev.map(p => p.id === id ? updatedProducto: p));
            setError(null);
            return updatedProducto;

        }catch(err: any) {
            const errorMsg = err.response?.data || 'Error al actualizar producto';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const deleteProducto = async (id: number): Promise<void> => {
        try{
        await productoService.deleteProducto(id);
        setProductos(prev => prev.filter(p => p.id !== id));
        setError(null);
        }catch(err: any){
         const errorMsg = err.response?.data || 'Error al eliminar producto';
         setError(errorMsg);
         throw new Error(errorMsg);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, [fetchProductos]);
    
    return {
        productos,
        loading,
        error,
        fetchProductos,
        createProducto,
        updateProducto,
        deleteProducto
    };
};