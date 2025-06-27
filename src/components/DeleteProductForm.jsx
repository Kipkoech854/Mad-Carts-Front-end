import React from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';

const DeleteProductForm = ({ selectedProduct, setSelectedProduct }) => {
  const handleDelete = async () => {
    if (!selectedProduct) return;
    const confirmed = window.confirm(`Delete product "${selectedProduct.name}"?`);
    if (!confirmed) return;

    try {
      await axios.delete(`http://127.0.0.1:5555/products/${selectedProduct.id}`);
      alert('Product deleted!');
      setSelectedProduct(null);
    } catch (error) {
      alert('Delete failed');
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <Searchbar isAdmin={true} onSelectProduct={setSelectedProduct} />
      {selectedProduct && (
        <div>
          <p><strong>ID:</strong> {selectedProduct.id}</p>
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
            Confirm Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteProductForm;