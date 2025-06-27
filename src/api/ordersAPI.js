const API_BASE = 'http://localhost:5000/api';


export const ordersAPI = {
  
  getOrders: async () => {
    try {
      const response = await fetch(`${API_BASE}/orders`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE}/orders/single`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId })
      });
      if (!response.ok) throw new Error('Failed to fetch order');
      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('Failed to create order');
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  updateOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE}/orders/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('Failed to update order');
      return await response.json();
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  deleteOrder: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE}/orders/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId })
      });
      if (!response.ok) throw new Error('Failed to delete order');
      return await response.json();
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};