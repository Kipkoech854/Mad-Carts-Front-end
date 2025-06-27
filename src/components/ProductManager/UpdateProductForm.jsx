import React, { useState } from "react";
import Searchbar from "./Searchbar";
import { updateProduct } from "../../api/productManagerApi"; 
import './Stylesheet.css';

const UpdateProductForm = ({ selectedProduct, setSelectedProduct }) => {
  const [formState, setFormState] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData();
    formData.append("name", formState.name || selectedProduct.name);
    formData.append("category", formState.category || selectedProduct.category);
    formData.append("price", formState.price || selectedProduct.price);
    formData.append("quantity", formState.quantity || selectedProduct.quantity);
    formData.append("size", formState.size || selectedProduct.size);
    formData.append("description", formState.description || selectedProduct.description);
    formData.append("brand", formState.brand || selectedProduct.brand);

    if (imageFile) formData.append("image", imageFile);

    try {
      const updated = await updateProduct(selectedProduct.id, formData);
      setSuccessMessage("Product updated successfully!");
      setSelectedProduct(updated.data);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed.");
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <div className="update-input-container">
        <Searchbar onSelectProduct={setSelectedProduct} />

        {selectedProduct && (
          <form onSubmit={handleSubmit} className="update-form">
            <p><strong>ID:</strong> {selectedProduct.id}</p>

            <label htmlFor="name">Name:</label>
            <input name="name" defaultValue={selectedProduct.name} onChange={handleInputChange} />

            <label htmlFor="category">Category:</label>
            <input name="category" defaultValue={selectedProduct.category} onChange={handleInputChange} />

            <label htmlFor="price">Price:</label>
            <input name="price" type="number" defaultValue={selectedProduct.price} onChange={handleInputChange} />

            <label htmlFor="quantity">Quantity:</label>
            <input name="quantity" type="number" defaultValue={selectedProduct.quantity} onChange={handleInputChange} />

            <label htmlFor="size">Size:</label>
            <input name="size" defaultValue={selectedProduct.size} onChange={handleInputChange} />

            <label htmlFor="brand">Brand:</label>
            <input name="brand" defaultValue={selectedProduct.brand} onChange={handleInputChange} />

            <label htmlFor="description">Description:</label>
            <textarea name="description" defaultValue={selectedProduct.description} onChange={handleInputChange} />

            <label htmlFor="image">Image:</label>
            <input type="file" name="image" onChange={handleImageChange} />

            <button type="submit" className="btn">Update</button>

            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProductForm;
