import React, { useState } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';

const PartialUpdateForm = ({ selectedProduct, setSelectedProduct }) => {
  const [fields, setFields] = useState({});

  const handleChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const payload = new FormData();
      for (let key in fields) {
        if (fields[key]) payload.append(key, fields[key]);
      }

      await axios.patch(`http://127.0.0.1:5555/products/${selectedProduct.id}`, payload);
      alert('Product partially updated!');
      setFields({});
    } catch (err) {
      alert('Update failed');
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Partial Update</h2>
      <Searchbar isAdmin={false} onSelectProduct={setSelectedProduct} />
      {selectedProduct && (
        <form onSubmit={handleSubmit}>
          <p><strong>ID:</strong> {selectedProduct.id}</p>
          <input name="name" placeholder="New name" onChange={handleChange} />
          <textarea name="description" placeholder="New description" onChange={handleChange} />
          <input name="category" placeholder="New category" onChange={handleChange} />
          <input name="price" placeholder="New price" onChange={handleChange} />
          <input type = 'file'name="media" placeholder="New media URL" onChange={handleChange} />
          <button type="submit">Update Fields</button>
        </form>
      )}
    </div>
  );
};

export default PartialUpdateForm;