import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import CartList from '../components/Cart/CartList';
import CartSummary from '../components/Cart/CartSummary';
import CartActions from '../components/Cart/CartActions';
import { RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import '../styles/cart.css';
import { useNavigate } from 'react-router-dom';

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, background: '#38bdf8', color: 'white', padding: '16px 24px', borderRadius: 8, zIndex: 1000 }}>
      {message}
      <button onClick={onClose} style={{ marginLeft: 16, background: 'transparent', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
    </div>
  );
}

function SuccessModal({ orderId, onClose, loading }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: 'white', borderRadius: 16, padding: 32, minWidth: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#059669', marginBottom: 12 }}>Order Placed!</h2>
        <p style={{ fontSize: 18, color: '#374151', marginBottom: 16 }}>Thank you for your purchase.</p>
        <div style={{ marginBottom: 16 }}>
          <span style={{ color: '#6b7280' }}>Order ID:</span>
          <span style={{ fontWeight: 700, color: '#2563eb', marginLeft: 8 }}>{orderId}</span>
        </div>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Loader2 className="animate-spin" size={24} />
            <span style={{ color: '#2563eb' }}>Redirecting to order details...</span>
          </div>
        ) : null}
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 10, background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, fontWeight: 600 }}>Back to Shopping</button>
          <a href={`/orders/${orderId}`} style={{ flex: 1, padding: 10, background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, textAlign: 'center', textDecoration: 'none' }}>View Order</a>
          <a href="/orders" style={{ flex: 1, padding: 10, background: '#6366f1', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, textAlign: 'center', textDecoration: 'none' }}>View All Orders</a>
        </div>
      </div>
    </div>
  );
}

function ErrorModal({ message, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: 'white', borderRadius: 16, padding: 32, minWidth: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#dc2626', marginBottom: 12 }}>Order Failed</h2>
        <p style={{ color: '#374151', marginBottom: 16 }}>{message}</p>
        <button onClick={onClose} style={{ padding: 10, background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, fontWeight: 600 }}>Close</button>
      </div>
    </div>
  );
}

const CartPage = () => {
  const {
    carts,
    currentCart,
    loading: cartLoading,
    error: cartError,
    fetchCarts,
    updateCart,
    deleteCart,
    calculateCartTotal,
    getTotalItems,
    setCurrentCart
  } = useCart();

  const {
    createOrder,
    loading: orderLoading,
    error: orderError
  } = useOrders();

  const navigate = useNavigate();
  const [toast, setToast] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  React.useEffect(() => {
    if (carts.length > 0) {
      setCurrentCart(carts[0]);
    } else {
      setCurrentCart(null);
    }
  }, [carts, setCurrentCart]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (!currentCart) return;
    const updatedCart = {
      ...currentCart,
      cart_items: currentCart.cart_items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    };
    setCurrentCart(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    if (!currentCart) return;
    const updatedCart = {
      ...currentCart,
      cart_items: currentCart.cart_items.filter(item => item.id !== itemId)
    };
    setCurrentCart(updatedCart);
  };

  const handleCheckout = async (cart) => {
    try {
      const orderData = {
        user_id: cart.user_id,
        total_amount: calculateCartTotal(cart),
        order_items: cart.cart_items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      const newOrder = await createOrder(orderData);
      await deleteCart(cart.id);
      setCurrentCart(null);
      setOrderId(newOrder.id);
      setShowSuccess(true);
      setRedirecting(true);
      setTimeout(() => {
        setRedirecting(false);
        window.location.href = `/orders/${newOrder.id}`;
      }, 2000);
    } catch (error) {
      setErrorMsg(error.message || 'Failed to create order. Please try again.');
      setShowError(true);
    }
  };

  const handleClearCart = async (cartId) => {
    try {
      await deleteCart(cartId);
      setCurrentCart(null);
      setToast('Cart cleared!');
    } catch (error) {
      setToast('Failed to clear cart. Please try again.');
    }
  };

  const totalAmount = currentCart ? calculateCartTotal(currentCart) : 0;
  const totalItems = currentCart ? getTotalItems(currentCart) : 0;

  return (
    <div className="cart-page">
      {showSuccess && <SuccessModal orderId={orderId} loading={redirecting} onClose={() => { setShowSuccess(false); window.location.href = '/'; }} />}
      {showError && <ErrorModal message={errorMsg} onClose={() => setShowError(false)} />}
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button
            onClick={() => navigate('/')}
            className="cart-back-btn"
          >
            ← Back to Shopping
          </button>
        </div>
        {cartLoading ? (
          <div className="cart-loading">
            <RefreshCw size={64} />
            <p>Loading cart...</p>
          </div>
        ) : currentCart ? (
          <div className="cart-main-grid">
            {/* Cart Items */}
            <div className="cart-items-section">
              <CartList
                cart={currentCart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>
            {/* Cart Summary & Actions */}
            <div className="cart-summary-section">
              <CartSummary
                cart={currentCart}
                totalAmount={totalAmount}
                totalItems={totalItems}
              />
              <CartActions
                cart={currentCart}
                onCheckout={handleCheckout}
                onClearCart={handleClearCart}
                loading={orderLoading || cartLoading || redirecting}
              />
              {orderError && (
                <div className="cart-error">
                  <AlertCircle size={20} />
                  <span>{orderError}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;