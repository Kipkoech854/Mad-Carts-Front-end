import React, { useState, useEffect } from 'react';
import { useOrders } from '../hooks/useOrders';
import OrderList from '../components/Orders/OrderList';
import OrderDetails from '../components/Orders/OrderDetails';
import { RefreshCw, AlertCircle } from 'lucide-react';
import '../styles/orders.css';

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, background: '#38bdf8', color: 'white', padding: '16px 24px', borderRadius: 8, zIndex: 1000 }}>
      {message}
      <button onClick={onClose} style={{ marginLeft: 16, background: 'transparent', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
    </div>
  );
}

const OrderDetailsPage = () => {
  const {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders,
    fetchOrder,
    getStatusColor,
    getStatusIcon,
    getTotalItems,
    setCurrentOrder
  } = useOrders();

  const [view, setView] = useState('list');
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (error) setToast(error);
  }, [error]);

  const handleViewDetails = async (orderId) => {
    try {
      await fetchOrder(orderId);
      setView('details');
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Failed to load order details');
    }
  };

  const handleBackToList = () => {
    setView('list');
    setCurrentOrder(null);
  };

  return (
    <div className="orders-page">
      <div className="orders-container">
        <Toast message={toast} onClose={() => setToast('')} />
        {view === 'list' ? (
          <>
            <div className="orders-header">
              <h1>Orders</h1>
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="orders-refresh-btn"
              >
                <RefreshCw size={20} className={loading ? 'orders-spin' : ''} />
                Refresh Orders
              </button>
            </div>
            {error && (
              <div className="orders-error">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
            <div className="orders-list-section">
              {loading ? (
                <div className="orders-loading">
                  <RefreshCw size={64} />
                  <p>Loading orders...</p>
                </div>
              ) : (
                <OrderList
                  orders={orders}
                  onViewDetails={handleViewDetails}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                  getTotalItems={getTotalItems}
                />
              )}
            </div>
          </>
        ) : (
          <div className="orders-details-section">
            {loading ? (
              <div className="orders-loading">
                <RefreshCw size={64} />
                <p>Loading order details...</p>
              </div>
            ) : (
              <OrderDetails
                order={currentOrder}
                onBack={handleBackToList}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                getTotalItems={getTotalItems}
              />
            )}
            {error && (
              <div className="orders-error">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;