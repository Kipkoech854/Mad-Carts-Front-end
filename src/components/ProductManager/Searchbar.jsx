import React, { useState, useRef, useEffect } from 'react';
import {
  fetchAutocompleteSuggestions,
  fetchProductById,
  logSearchHistory
} from '../../api/productManagerApi';
import { useAuth } from '../../context/AuthContext'; 

const Searchbar = ({ onSelectProduct, enableHistory = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);
  const { user } = useAuth(); 
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (e) => {
    const val = e.target.value;
    setSearchTerm(val);

    if (val.trim()) {
      const data = await fetchAutocompleteSuggestions(val.trim());
      setSuggestions(data);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (item) => {
    setSearchTerm(item.name);
    setShowSuggestions(false);

    try {
      const product = await fetchProductById(item.id);
      onSelectProduct?.(product);

      if (enableHistory && token && user?.id) {
        await logSearchHistory(item.name, token); 
      }
    } catch (err) {
      console.error('Error selecting product:', err);
    }
  };

  return (
    <div className="searchbar-container" ref={containerRef}>
      <div className="searchbar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
          placeholder="Search products..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button onClick={() => setShowSuggestions(false)} style={{ padding: '10px' }}>
          🔍
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSuggestionClick(item)}
              onMouseDown={(e) => e.preventDefault()}
              style={{
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {item.media && (
                <img
                  src={item.media}
                  alt={item.name}
                  style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                />
              )}
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
