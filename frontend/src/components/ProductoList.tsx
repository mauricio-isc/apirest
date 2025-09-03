import React from 'react';
import { Producto } from '../types/Producto';

interface ProductoListProps {
    productos: Producto[];
    onEdit: (producto: Producto) => void;
    onDelete: (id: number) => void;
    loading: boolean;
}

const ProductoList: React.FC<ProductoListProps> = ({
    productos, 
    onEdit, 
    onDelete,
    loading
}) => {
    if(loading){
        return <div className="loading"> Cargando productos...</div>;
    }

    if(productos.length === 0){
        return <div className="empty">No hay productos registrados</div>
    }


    return (
        <div className="product-list">
            <h2>Lista de productos</h2>
            <div className="productos-grid">
                {productos.map(producto => (
                    <div key={producto.id} className="producto-card">
                        <h3>{producto.nombre}</h3>
                        <p>Precio: {producto.precio}</p>
                        <p>{producto.descripcion}</p>
                        <div className="producto-actions">
                            <button
                            onClick={() => onEdit(producto)}
                            className='btn btn-edit'
                            >
                                Editar
                            </button>
                            <button
                            onClick={() => onDelete(producto.id!)}
                            className='btn btn-delete'
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductoList