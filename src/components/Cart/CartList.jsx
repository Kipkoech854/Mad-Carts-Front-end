import React from 'react';
import CartItem from './CartItem';
import { ShoppingCart } from 'lucide-react';

const CartList = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-list">
      <h2 className="cart-list-header">
        <span className="cart-list-icon"><ShoppingCart size={24} /></span>
        Cart Items <span className="cart-list-count">({cart.cart_items.length})</span>
      </h2>
      <div className="cart-items-grid">
        {cart.cart_items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CartList;