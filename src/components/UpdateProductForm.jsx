import React, { useState } from "react";
import axios from "axios";
import Searchbar from "./Searchbar"; 

const UpdateProductForm = ({ selectedProduct, setSelectedProduct }) => {
  const [formState, setFormState] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
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

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:5555/products/${selectedProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Product updated successfully!");
      setSelectedProduct(response.data); 
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <div className="update-input-container">
      <Searchbar isAdmin={false} onSelectProduct={setSelectedProduct} />

      {selectedProduct && (
        <form onSubmit={handleSubmit} className="update-form">
          <p><strong>ID:</strong> {selectedProduct.id}</p>
          
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            defaultValue={selectedProduct.name}
            onChange={handleInputChange}
          />
          
          <label htmlFor="category">category:</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            defaultValue={selectedProduct.category}
            onChange={handleInputChange}
          />
          
          <label htmlFor="price">price:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            defaultValue={selectedProduct.price}
            onChange={handleInputChange}
          />
          

          <label htmlFor="quantity">quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            defaultValue={selectedProduct.quantity}
            onChange={handleInputChange}
          />
          

            <label htmlFor="size">size:</label>
          <input
            type="text"
            id="size"
            name="size"
            placeholder="Size"
            defaultValue={selectedProduct.size}
            onChange={handleInputChange}
          />
          
          <label htmlFor="brand">brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="Brand"
            defaultValue={selectedProduct.brand}
            onChange={handleInputChange}
          />
          
            <label htmlFor="description">description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            defaultValue={selectedProduct.description}
            onChange={handleInputChange}
          />

          <label htmlFor="image">image:</label> 
          <input type="file" name="image" accept="image/*" placeholder="📸" onChange={handleImageChange} />

          <button type="submit" className="btn">Update</button>

          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
      )}
      </div>
    </div>
  );
};

export default UpdateProductForm;