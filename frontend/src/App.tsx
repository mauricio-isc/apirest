import React, { useState } from 'react';
import { useProductos } from './hooks/useProductos';
import { Producto, ProductoFormData } from './types/Producto';
import ProductoList from './components/ProductoList';
import ProductoForm from './components/ProductoForm';
import './App.css';

const App: React.FC = () => {
  const { productos, loading, error, createProducto, updateProducto, deleteProducto } = useProductos();
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleCreate = async (productoData: ProductoFormData) => {
    try {
      await createProducto(productoData);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleEdit = async (productoData: ProductoFormData) => {
    if (!editingProducto?.id) return;
    
    try {
      await updateProducto(editingProducto.id, productoData);
      setEditingProducto(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProducto(id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleNewProducto = () => {
    setEditingProducto(null);
    setShowForm(true);
  };

  const handleEditProducto = (producto: Producto) => {
    setEditingProducto(producto);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProducto(null);
  };

  const getStockClass = (stock: number): string => {
    if (stock > 20) return 'high';
    if (stock > 5) return 'medium';
    return 'low';
  };

  // Función segura para formatear el precio
  const formatPrecio = (precio: number | string): string => {
    if (typeof precio === 'number') {
      return precio.toFixed(2);
    }
    if (typeof precio === 'string') {
      const parsed = parseFloat(precio);
      return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
    }
    return '0.00';
  };

  // Función segura para obtener el stock como número
  const getStockNumber = (stock: number | string): number => {
    if (typeof stock === 'number') return stock;
    if (typeof stock === 'string') {
      const parsed = parseInt(stock);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>🏪 Gestor de Productos</h1>
          <div className="header-actions">
            <button onClick={handleNewProducto} className="btn-new">
              ➕ Nuevo Producto
            </button>
          </div>
        </header>

        <main className="app-main">
          {showForm ? (
            <ProductoForm
              producto={editingProducto}
              onSubmit={editingProducto ? handleEdit : handleCreate}
              onCancel={handleCancel}
            />
          ) : (
            <div className="products-table-container">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Cargando productos...</p>
                </div>
              ) : productos.length === 0 ? (
                <div className="empty-container">
                  <div className="empty-icon">📦</div>
                  <h3>No hay productos registrados</h3>
                  <p>Comienza agregando tu primer producto</p>
                </div>
              ) : (
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto) => (
                      <tr key={producto.id}>
                        <td data-label="Nombre" className="col-nombre">
                          {producto.nombre}
                        </td>
                        <td data-label="Precio" className="col-precio">
                          ${formatPrecio(producto.precio)}
                        </td>
                        <td data-label="Stock" className={`col-stock ${getStockClass(getStockNumber(producto.stock))}`}>
                          {getStockNumber(producto.stock)} unidades
                        </td>
                        <td data-label="Descripción" className="col-descripcion">
                          {producto.descripcion || 'Sin descripción'}
                        </td>
                        <td data-label="Acciones" className="col-actions">
                          <button
                            onClick={() => handleEditProducto(producto)}
                            className="btn-action btn-edit"
                            title="Editar producto"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => handleDelete(producto.id!)}
                            className="btn-action btn-delete"
                            title="Eliminar producto"
                          >
                            🗑️ Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;