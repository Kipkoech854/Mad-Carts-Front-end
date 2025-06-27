import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import { fetchAllProducts, deleteProduct } from '../../api/productManagerApi';
import { useAuth } from '../../context/AuthContext';
import './Stylesheet.css';

const DeleteProductForm = ({ selectedProduct, setSelectedProduct }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchAllProducts();
        setAllProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await deleteProduct(id, token); 
      setAllProducts(prev => prev.filter(p => p.id !== id));
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
      setMessage('Product deleted.');
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage('Failed to delete product.');
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <Searchbar onSelectProduct={setSelectedProduct} />

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {selectedProduct && (
        <div style={{ border: '1px solid red', padding: '1rem', marginTop: '1rem' }}>
          <p><strong>Selected Product:</strong> {selectedProduct.name}</p>
          <button
            onClick={() => handleDelete(selectedProduct.id)}
            style={{ backgroundColor: 'red', color: 'white', padding: '0.5rem' }}
          >
            Confirm Delete
          </button>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>All Products</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allProducts.map(p => (
            <li key={p.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              border: '1px solid #ccc',
              padding: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {p.media && (
                  <img src={p.media} alt={p.name} style={{ width: '50px', marginRight: '10px' }} />
                )}
                <span>{p.name}</span>
              </div>
              <button
                onClick={() => handleDelete(p.id)}
                style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeleteProductForm;
