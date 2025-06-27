import React, { useState } from "react";
import { createProduct } from "../../api/productManagerApi"; 
import './Stylesheet.css';

const CreateProductForm = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    size: '',
    description: '',
    brand: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        if (form[key]) formData.append(key, form[key]);
      }
      await createProduct(formData);
      alert("Product created successfully!");
      setForm({
        name: '',
        category: '',
        price: '',
        quantity: '',
        size: '',
        description: '',
        brand: '',
        image: null
      });
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Creation failed.");
    }
  };

  return (
    <div className="create-container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Name:</label>
        <input name="name" id="name" value={form.name} onChange={handleChange} />

        <label htmlFor="category">Category:</label>
        <input name="category" id="category" value={form.category} onChange={handleChange} />

        <label htmlFor="price">Price:</label>
        <input name="price" id="price" type="number" value={form.price} onChange={handleChange} />

        <label htmlFor="quantity">Quantity:</label>
        <input name="quantity" id="quantity" type="number" value={form.quantity} onChange={handleChange} />

        <label htmlFor="size">Size:</label>
        <input name="size" id="size" value={form.size} onChange={handleChange} />

        <label htmlFor="description">Description:</label>
        <input name="description" id="description" value={form.description} onChange={handleChange} />

        <label htmlFor="brand">Brand:</label>
        <input name="brand" id="brand" value={form.brand} onChange={handleChange} />

        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" onChange={handleChange} />

        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
};

export default CreateProductForm;
