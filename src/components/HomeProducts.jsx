import React, { useState, useEffect } from 'react';

function HomeProducts() {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [products, setProducts] = useState([]);

 
  useEffect(() => {
    (async () => {
      const res = await fetch('http://127.0.0.1:5555/getuniquecategories');
      const data = await res.json();
      setUniqueCategories(data);
    })();
  }, []);


  async function loadProductsOfCategory(categoryName) {
    try {
      const res = await fetch(
        `http://127.0.0.1:5555/category?q=${encodeURIComponent(categoryName)}`
      );
      if (!res.ok) throw new Error(res.statusText);
      const prods = await res.json();
      setProducts(prods);
    } catch (err) {
      console.error(err);
    }
  }

  
  function InitialLoad({ uniquecategories, onSelectCategory }) {
    return uniquecategories.map((cat) => (
      <button
        key={cat.category}
        onClick={() => onSelectCategory(cat.category)}
      >
        <div className="InitialCategorybox">
          <img src={cat.sampleImage} alt={cat.category} />
          <h4>{cat.category}</h4>
        </div>
      </button>
    ));
  }

  return (
    <div>
      <h2>Categories</h2>

      
      <InitialLoad
        categories={uniqueCategories}
        onSelectCategory={loadProductsOfCategory}
      />

    
      {products.length > 0 && (
        <>
          <h2>Products in this category</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {products.map((p) => (
              <div key={p.id} style={{ width: '200px' }}>
                <img
                  src={p.media}
                  alt={p.name}
                  style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                />
                <h4>{p.name}</h4>
                <p>KES {p.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomeProducts;