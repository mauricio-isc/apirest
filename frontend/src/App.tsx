import React, { useState, useEffect } from 'react';
import { useProductos } from './hooks/useProductos';
import { Producto, ProductoFormData } from './types/Producto';
import ProductoForm from './components/ProductoForm';
import './App.css';

const App: React.FC = () => {
  const { productos, loading, error, createProducto, updateProducto, deleteProducto } = useProductos();
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [stats, setStats] = useState({
    totalProductos: 0,
    valorTotal: 0,
    stockTotal: 0
  });

  useEffect(() => {
    // Calcular estadísticas
    const totalProductos = productos.length;
    const valorTotal = productos.reduce((sum, p) => {
      const precio = typeof p.precio === 'number' ? p.precio : parseFloat(p.precio);
      return sum + precio;
    }, 0);
    const stockTotal = productos.reduce((sum, p) => {
      const stock = typeof p.stock === 'number' ? p.stock : parseInt(p.stock);
      return sum + stock;
    }, 0);

    setStats({ totalProductos, valorTotal, stockTotal });
  }, [productos]);

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
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
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

  const formatCurrency = (amount: number | string): string => {
    const value = typeof amount === 'number' ? amount : parseFloat(amount);
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(isNaN(value) ? 0 : value);
  };

  const getStockStatus = (stock: number | string): string => {
    const value = typeof stock === 'number' ? stock : parseInt(stock);
    if (value > 20) return 'table-cell-success';
    if (value > 5) return 'table-cell-info';
    return 'table-cell-warning';
  };

  if (error) {
    return (
      <div className="app">
        <div className="error-state">
          <h3>Error del Sistema</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-container">
        {/* Header Corporativo */}
        <header className="corporate-header">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">🏢</div>
              <span>InventoryPro</span>
            </div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
              Sistema de Gestión de Inventarios
            </h1>
          </div>
          <div className="header-actions">
            <button onClick={handleNewProducto} className="btn btn-primary">
              <span>+</span>
              Nuevo Producto
            </button>
          </div>
        </header>

        <main className="main-content">
          {/* Estadísticas */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon primary">📦</div>
              </div>
              <div className="stat-value">{stats.totalProductos}</div>
              <div className="stat-label">Productos Totales</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon success">💰</div>
              </div>
              <div className="stat-value">{formatCurrency(stats.valorTotal)}</div>
              <div className="stat-label">Valor Total</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon warning">📊</div>
              </div>
              <div className="stat-value">{stats.stockTotal}</div>
              <div className="stat-label">Unidades en Stock</div>
            </div>
          </div>

          {/* Tabla de Productos */}
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h2 className="dashboard-title">Inventario de Productos</h2>
              <p className="dashboard-subtitle">
                Gestión completa del catálogo de productos
              </p>
            </div>

            <div className="products-section">
              {showForm ? (
                <ProductoForm
                  producto={editingProducto}
                  onSubmit={editingProducto ? handleEdit : handleCreate}
                  onCancel={handleCancel}
                />
              ) : (
                <div className="table-container">
                  {loading ? (
                    <div className="loading-state">
                      <div className="loading-spinner"></div>
                      <p>Cargando inventario...</p>
                    </div>
                  ) : productos.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">📦</div>
                      <h3>No hay productos registrados</h3>
                      <p>Comience agregando su primer producto al inventario</p>
                    </div>
                  ) : (
                    <table className="corporate-table">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Precio</th>
                          <th>Stock</th>
                          <th>Descripción</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.map((producto) => {
                          const precio = typeof producto.precio === 'number' ? producto.precio : parseFloat(producto.precio);
                          const stock = typeof producto.stock === 'number' ? producto.stock : parseInt(producto.stock);
                          
                          return (
                            <tr key={producto.id}>
                              <td className="table-cell-primary">
                                <strong>{producto.nombre}</strong>
                              </td>
                              <td className="table-cell-number table-cell-currency">
                                {formatCurrency(precio)}
                              </td>
                              <td className={getStockStatus(stock)}>
                                {stock} unidades
                              </td>
                              <td>
                                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                  {producto.descripcion || 'Sin descripción'}
                                </span>
                              </td>
                              <td>
                                <div className="table-actions">
                                  <button
                                    onClick={() => handleEditProducto(producto)}
                                    className="btn-action btn-edit"
                                    title="Editar producto"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => handleDelete(producto.id!)}
                                    className="btn-action btn-delete"
                                    title="Eliminar producto"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;