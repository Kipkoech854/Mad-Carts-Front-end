import React, { useState } from "react";
import CreateProductForm from "./CreateProductForm";
import UpdateProductForm from "./UpdateProductForm";
import PartialUpdateForm from "./PartialUpdateForm";
import DeleteProductForm from "./DeleteProductForm";

const ProductManager = () => {
  const [mode, setMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Product Manager</h2>
      <div className="flex gap-4">
        <button onClick={() => setMode("create")} className="btn">Create</button>
        <button onClick={() => setMode("update")} className="btn">Update</button>
        <button onClick={() => setMode("partial")} className="btn">Partial Update</button>
        <button onClick={() => setMode("delete")} className="btn">Delete</button>
      </div>

      <div className="pt-6">
        {mode === "create" && <CreateProductForm />}
        {mode === "update" && (
          <UpdateProductForm 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
          />
        )}
        {mode === "partial" && (
          <PartialUpdateForm 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
          />
        )}
        {mode === "delete" && (
          <DeleteProductForm 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
          />
        )}
      </div>
    </div>
  );
};

export default ProductManager;