import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Stylesheet.css';

const Searchbar = ({ isAdmin, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get(`http://127.0.0.1:5555/autocomplete?q=${query}`);
      setSuggestions(res.data);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Suggestion error:', err);
    }
  };

  const fetchResults = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:5555/autocomplete?term=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim()) fetchSuggestions(val.trim());
    else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item.name);
    setShowSuggestions(false);
    fetchResults(item.name);
    setSelectedProduct(null);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      fetchResults(searchTerm.trim());
      setSelectedProduct(null);
    }
  };

  const handleSelect = async (item) => {
    try {
      const res = await axios.get(`http://127.0.0.1:5555/products/${item.id}`);
      const product = res.data;
      setSelectedProduct(product);
      onSelectProduct?.(product);
    } catch (err) {
      alert('Could not fetch product details.');
      console.error(err);
    }
  };

  return (
    <div className='searchbar-container' ref={containerRef}>
      {!selectedProduct && (
        <>
          <div className='searchbar'>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
              placeholder="Search products..."
              style={{ flex: 1, padding: '10px', fontSize: '16px' }}
            />
            <button onClick={handleSearchClick} style={{ padding: '10px' }}>🔍</button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="autocomplete-list">
              {suggestions.map(item => (
                <li
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  onMouseDown={e => e.preventDefault()}
                  style={{ padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {item.media && (
                    <img src={item.media} alt={item.name}
                         style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }} />
                  )}
                  {item.name}
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: '20px' }}>
            {loading && <p>Loading results...</p>}
            {!loading && results.length > 0 && (
              <div>
                <h3>Results:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {results.map(item => (
                    <li key={item.id} style={{ marginBottom: '10px' }}>
                      <button
                        onClick={() => handleSelect(item)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          border: selectedProduct?.id === item.id ? '2px solid red' : '1px solid #ccc',
                          padding: '10px',
                          background: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {item.media && (
                          <img src={item.media} alt={item.name}
                               style={{ maxWidth: '60px', marginRight: '10px' }} />
                        )}
                        <div>
                          <strong>{item.name}</strong>
                          <p>{item.description?.slice(0, 50)}...</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}

      {selectedProduct && (
        <div className='product-detail'>
          <button onClick={() => setSelectedProduct(null)} style={{ marginBottom: '20px' }}>
            Back to results
          </button>
          <div className='product-box'>
            <img src={selectedProduct[6]} alt={selectedProduct[1]} style={{ maxWidth: '200px' }} />
            <p>{selectedProduct[7]}</p>
            <p><strong>Name:</strong> {selectedProduct[1]}</p>
            <p><strong>Category:</strong> {selectedProduct[2]}</p>
            <p><strong>Price:</strong> {selectedProduct[3]}</p>
            <p><strong>Size:</strong> {selectedProduct[5]}</p>
            <p><strong>Quantity:</strong> {selectedProduct[4]}</p>
            <p><strong>Brand:</strong> {selectedProduct[8]}</p>
            
          </div>
          {isAdmin && (
            <button
              onClick={async () => {
                try {
                  await axios.delete(`http://127.0.0.1:5555/products/${selectedProduct.id}`);
                  alert('Product deleted.');
                  setSelectedProduct(null);
                  setResults(prev => prev.filter(p => p.id !== selectedProduct.id));
                } catch {
                  alert('Delete failed.');
                }
              }}
              style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', padding: '10px' }}
            >
              Delete Product
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;

