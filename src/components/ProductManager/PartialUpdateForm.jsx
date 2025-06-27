import React, { useState } from 'react';
import Searchbar from './Searchbar';
import { partialUpdateProduct } from '../../api/productManagerApi'; 
import './Stylesheet.css';

const PartialUpdateForm = ({ selectedProduct, setSelectedProduct }) => {
  const [fields, setFields] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    } else {
      setFields(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const payload = new FormData();
    Object.entries(fields).forEach(([key, val]) => {
      if (val) payload.append(key, val);
    });

    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      await partialUpdateProduct(selectedProduct.id, payload);
      setFields({});
      setImageFile(null);
      setMessage('Product partially updated!');
    } catch (err) {
      console.error('Partial update failed:', err);
      setMessage('Failed to update product.');
    }
  };

  return (
    <div>
      <h2>Partial Update</h2>
      <Searchbar onSelectProduct={setSelectedProduct} />

      {selectedProduct && (
        <form onSubmit={handleSubmit} className="update-form">
          <p><strong>ID:</strong> {selectedProduct.id}</p>

          <input name="name" placeholder="New name" onChange={handleChange} />
          <textarea name="description" placeholder="New description" onChange={handleChange} />
          <input name="category" placeholder="New category" onChange={handleChange} />
          <input name="price" placeholder="New price" type="number" onChange={handleChange} />
          <input name="quantity" placeholder="New quantity" type="number" onChange={handleChange} />
          <input name="size" placeholder="New size" onChange={handleChange} />
          <input name="brand" placeholder="New brand" onChange={handleChange} />
          <input type="file" name="image" onChange={handleChange} />

          <button type="submit" className="btn">Update Fields</button>
          {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
        </form>
      )}
    </div>
  );
};

export default PartialUpdateForm;
