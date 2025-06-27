import React from 'react';
import { ArrowLeft, Package, Calendar, DollarSign, User } from 'lucide-react';

const OrderDetails = ({ order, onBack, getStatusColor, getStatusIcon, getTotalItems }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!order) {
    return (
      <div className="order-details-empty">
        <Package size={64} />
        <h3>Order not found</h3>
      </div>
    );
  }

  return (
    <div className="order-details">
      {/* Header */}
      <div className="order-details-header">
        <button
          onClick={onBack}
          className="order-details-back-btn"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="order-details-title">Order Details</h1>
      </div>
      {/* Order Info Card */}
      <div className="order-info-card">
        <div className="order-info-grid">
          <div>
            <h2 className="order-info-section-title">Order Information</h2>
            <div className="order-info-section">
              <div className="order-info-item">
                <Package size={18} />
                <span>Order ID:</span>
                <span className="order-info-value">{order.id}</span>
              </div>
              <div className="order-info-item">
                <Calendar size={18} />
                <span>Created:</span>
                <span>{formatDate(order.created_at)}</span>
              </div>
              <div className="order-info-item">
                <User size={18} />
                <span>User ID:</span>
                <span className="order-info-value">{order.user_id}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="order-info-section-title">Order Summary</h2>
            <div className="order-info-section">
              <div className="order-info-item">
                <span>Status:</span>
                <div className={`order-status-badge ${getStatusColor(order.status)}`}>
                  <span>{getStatusIcon(order.status)}</span>
                  {order.status}
                </div>
              </div>
              <div className="order-info-item">
                <span>Total Items:</span>
                <span>{getTotalItems(order)}</span>
              </div>
              <div className="order-info-item order-info-total">
                <span>Total Amount:</span>
                <span>${order.total_amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Order Items */}
      <div className="order-items-card">
        <h2 className="order-items-title">Order Items</h2>
        <div className="order-items-list">
          {order.order_items && order.order_items.length > 0 ? (
            order.order_items.map((item, index) => (
              <div key={item.id || index} className="order-item">
                <div className="order-item-info">
                  <h3>Product ID: {item.product_id}</h3>
                  <p>${item.price.toFixed(2)} × {item.quantity}</p>
                </div>
                <div className="order-item-total">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="order-items-empty">No items in this order</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;