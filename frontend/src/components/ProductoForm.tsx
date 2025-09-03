import React, { useState, useEffect} from "react";
import {Producto, ProductoFormData} from "../types/Producto";
import './productoForm.css'
interface ProductoFormProps{
    producto?: Producto | null;
    onSubmit: (data: ProductoFormData) => void;
    onCancel: () => void;
}

const ProductoForm: React.FC<ProductoFormProps> =({
    producto,
    onSubmit,
    onCancel
}) => {
    const [formData, setFormData] = useState<ProductoFormData>({
        nombre: '',
        precio: '',
        descripcion: '',
        stock: ''
    });

    useEffect(() =>{
        if(producto){
            setFormData({
                nombre: producto.nombre || '',
                precio: producto.precio.toString() || '',
                descripcion:producto.descripcion || '',
                stock: producto.stock.toString() || ''
            });
        }
    }, [producto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="producto-form">
            <h2> {producto ?  'Editar producto' : 'Crear Producto'}</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text"
                    id="nombre"
                    name = "nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="precio">Precio:</label>
                    <input type="number"
                        id="precio"
                        name="precio"
                        step="0.01"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock:</label>
                    <input type="number" 
                        id="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">Descripcion:</label>
                    <textarea 
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={3}>
                    </textarea>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        {producto ? 'Actualizar' : 'Crear' }
                    </button>

                    <button type="button" onClick={onCancel} className="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductoForm;