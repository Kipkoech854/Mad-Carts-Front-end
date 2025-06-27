import React, { useEffect, useState } from 'react';
import { fetchCategories, logRecentView  } from '../../api/productManagerApi';
import CategoryProductViewer from './CategoryProductViewer';
import Searchbar from './Searchbar';

function MainApp() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    loadCategories();
  }, []);

  return (
    <>
      <Searchbar />

      {!selectedCategory ? (
        <>
          <h2>Pick a category</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button
                key={`${cat}-${i}`}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{ marginBottom: '1rem' }}
          >
            ← Back to Categories
          </button>
          <CategoryProductViewer
            category={selectedCategory}
            logRecentView={logRecentView}
          />
        </>
      )}
    </>
  );
}

export default MainApp;

