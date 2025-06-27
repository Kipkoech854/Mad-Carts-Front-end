import { useState, useEffect } from 'react';
import { cartAPI } from '../api/cartAPI';

export const useCart = () => {
  const [carts, setCarts] = useState([]);
  const [currentCart, setCurrentCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCarts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartAPI.getCarts();
      setCarts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async (cartId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartAPI.getCart(cartId);
      setCurrentCart(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCart = async (cartData) => {
    setLoading(true);
    setError(null);
    try {
      const newCart = await cartAPI.createCart(cartData);
      setCarts(prev => [...prev, newCart]);
      return newCart;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (cartId, cartData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCart = await cartAPI.updateCart(cartId, cartData);
      setCarts(prev => prev.map(cart => 
        cart.id === cartId ? updatedCart : cart
      ));
      if (currentCart && currentCart.id === cartId) {
        setCurrentCart(updatedCart);
      }
      return updatedCart;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCart = async (cartId) => {
    setLoading(true);
    setError(null);
    try {
      await cartAPI.deleteCart(cartId);
      setCarts(prev => prev.filter(cart => cart.id !== cartId));
      if (currentCart && currentCart.id === cartId) {
        setCurrentCart(null);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const calculateCartTotal = (cart) => {
    if (!cart || !cart.cart_items) return 0;
    return cart.cart_items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getTotalItems = (cart) => {
    if (!cart || !cart.cart_items) return 0;
    return cart.cart_items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return {
    carts,
    currentCart,
    loading,
    error,
    fetchCarts,
    fetchCart,
    createCart,
    updateCart,
    deleteCart,
    calculateCartTotal,
    getTotalItems,
    setCurrentCart,
    setError
  };
};