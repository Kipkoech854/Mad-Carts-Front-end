import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="cart-item">
      <span className="cart-item-icon"><ShoppingCart size={32} /></span>
      <div className="cart-item-info">
        <h3>Product ID: {item.product_id}</h3>
        <p>Price: ${item.price.toFixed(2)} each</p>
        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="cart-item-controls">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="cart-item-quantity"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="cart-item-quantity-value">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="cart-item-quantity"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="cart-item-remove"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;