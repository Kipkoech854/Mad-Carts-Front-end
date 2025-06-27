
import React, { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../../api/productManagerApi.js';
import AddToCartButton from '../AddToCartButton.jsx';


function CategoryProductViewer({ category, logRecentView }) {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category)
        .then(setProducts)
        .then(() => setSelected(null))
        .catch(err => console.error("Error loading products:", err));
    }
  }, [category]);

  const handleClick = (product) => {
    setSelected(product);
    logRecentView(product.id);
  };

  if (selected) {
    return (
      <div style={{ padding: '1rem' }}>
        <button onClick={() => setSelected(null)} style={{ marginBottom: '1rem' }}>
          ← Back to {category}
        </button>
        <h2>{selected.name}</h2>
        <img src={selected.media} alt={selected.name} style={{ width: '300px', objectFit: 'cover' }} />
        <p><strong>Price:</strong> KES {selected.price}</p>
        <p><strong>Brand:</strong> {selected.brand}</p>
        <p>{selected.description}</p>
        <AddToCartButton/>
      </div>
    );
  }

  return (
    <div>
      <h2>Products in "{category}"</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem'
      }}>
        {products.map(p => (
          <button
            key={p.id}
            onClick={() => handleClick(p)}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '0',
              cursor: 'pointer',
              background: 'white'
            }}
          >
            <img
              src={p.media}
              alt={p.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            />
            <div style={{ padding: '0.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem' }}>{p.name}</h4>
              <p style={{ margin: 0 }}>{p.description}</p>
              <p style={{ margin: 0 }}>KES {p.price}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryProductViewer;
