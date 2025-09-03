import React, { useState, useEffect} from "react";
import {Producto, ProductoFormData} from "../types/Producto";
import './productoForm.css'
interface ProductoFormProps {
  producto?: Producto | null;
  onSubmit: (data: ProductoFormData) => void;
  onCancel: () => void;
}

const ProductoForm: React.FC<ProductoFormProps> = ({ 
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

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || '',
        precio: producto.precio.toString() || '',
        descripcion: producto.descripcion || '',
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
    <div className="producto-form-container">
      <h2>{producto ? 'Editar Producto' : 'Crear Producto'}</h2>
      
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <td>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese el nombre del producto"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="form-group">
                  <label htmlFor="precio">Precio:</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input
                    type="number"
                    id="precio"
                    name="precio"
                    step="0.01"
                    min="0"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="form-group">
                  <label htmlFor="stock">Stock:</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    placeholder="0"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción:</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describa las características del producto..."
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="table-actions">
          <button type="submit" className="btn btn-primary">
            {producto ? 'Actualizar' : 'Crear'}
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