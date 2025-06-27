import React from 'react';
import { Eye, Package, Calendar, DollarSign } from 'lucide-react';

const OrderCard = ({ order, onViewDetails, getStatusColor, getStatusIcon, getTotalItems }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <h3 className="order-card-title">
            Order #{order.id.slice(0, 8)}...
          </h3>
          <div className="order-card-date">
            <Calendar size={16} />
            <span>{formatDate(order.created_at)}</span>
          </div>
        </div>
        <div className={`order-card-status ${getStatusColor(order.status)}`}>
          <span>{getStatusIcon(order.status)}</span>
          {order.status}
        </div>
      </div>
      <div className="order-card-stats">
        <div>
          <Package size={16} />
          <span>{getTotalItems(order)} items</span>
        </div>
        <div>
          <DollarSign size={16} />
          <span>${order.total_amount.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={() => onViewDetails(order.id)}
        className="order-card-view-btn"
      >
        <Eye size={18} />
        View Details
      </button>
    </div>
  );
};

export default OrderCard;