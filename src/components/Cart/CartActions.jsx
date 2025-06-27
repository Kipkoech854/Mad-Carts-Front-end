import React, { useState } from 'react';
import { ShoppingBag, Trash2, AlertTriangle } from 'lucide-react';

const CartActions = ({ cart, onCheckout, onClearCart, loading }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentCart, setCurrentCart] = useState(cart);

  const handleCheckout = () => {
    if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
      alert('Cart is empty!');
      return;
    }
    onCheckout(cart);
  };

  const handleClearCart = () => {
    if (showConfirm) {
      onClearCart(cart.id);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return null;
  }

  return (
    <div className="cart-actions">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="cart-checkout-btn"
      >
        <ShoppingBag size={24} />
        {loading ? 'Processing...' : 'Proceed to Checkout'}
      </button>
      {!showConfirm ? (
        <button
          onClick={handleClearCart}
          disabled={loading}
          className="cart-clear-btn"
        >
          <Trash2 size={20} />
          Clear Cart
        </button>
      ) : (
        <div className="cart-confirm-dialog">
          <div className="cart-confirm-header">
            <AlertTriangle size={20} />
            <span>Confirm Clear Cart</span>
          </div>
          <p>Are you sure you want to clear all items from your cart? This action cannot be undone.</p>
          <div className="cart-confirm-buttons">
            <button
              onClick={handleClearCart}
              disabled={loading}
              className="cart-confirm-yes"
            >
              Yes, Clear Cart
            </button>
            <button
              onClick={cancelClear}
              disabled={loading}
              className="cart-confirm-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartActions;