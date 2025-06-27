import React from 'react';
import { Calculator, Receipt } from 'lucide-react';

const CartSummary = ({ cart, totalAmount, totalItems }) => {
  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return null;
  }

  return (
    <div className="cart-summary">
      <h3 className="cart-summary-header">
        <Receipt size={24} />
        Cart Summary
      </h3>
      <div className="cart-summary-section">
        <div>
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div>
          <span>Subtotal:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="cart-summary-total">
          <span>Total Amount:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="cart-summary-meta">
          <p>Created: {new Date(cart.created_at).toLocaleDateString()}</p>
          <p>Cart ID: {cart.id}</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;