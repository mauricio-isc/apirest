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

  if (error) {
    return (
      <div className="app">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestor de Productos</h1>
        <button onClick={handleNewProducto} className="btn btn-primary">
          Nuevo Producto
        </button>
      </header>

      <main className="app-main">
        {showForm ? (
          <ProductoForm
            producto={editingProducto}
            onSubmit={editingProducto ? handleEdit : handleCreate}
            onCancel={handleCancel}
          />
        ) : (
          <ProductoList
            productos={productos}
            loading={loading}
            onEdit={handleEditProducto}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
};

export default App;