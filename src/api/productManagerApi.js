
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5555/api';

export const createProduct = (formData) =>
  axios.post(`${BASE_URL}/products`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const updateProduct = (id, formData) =>
  axios.put(`${BASE_URL}/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const partialUpdateProduct = (id, formData) =>
  axios.patch(`${BASE_URL}/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });


export const fetchAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};

export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`${BASE_URL}/products/category`, { params: { q: category } });
  return Array.isArray(res.data[0]) ? res.data[0] : res.data;
};

export const fetchAutocompleteSuggestions = async (query) => {
  const res = await axios.get(`${BASE_URL}/products/autocomplete`, { params: { term: query } });
  return res.data;
};

export const fetchUserSearchHistory = async (token) => {
  const res = await axios.get(`${BASE_URL}/search-history`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const logSearchHistory = async (search_term, token) => {
  const res = await axios.post(`${BASE_URL}/search-history`, { search_term }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const fetchCategories = async () => {
  const res = await axios.get(`${BASE_URL}/products/categories`);
  return res.data;
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${BASE_URL}/products/${id}`);
};

export const logRecentView = async (productId, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/visit/recent-visits`,
      { product_id: productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to log recent view:", err);
    throw err;
  }
};