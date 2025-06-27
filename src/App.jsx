import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardCustomer from './pages/DashboardCustomer';
import DashboardDriver from './pages/DashboardDriver';
import Unauthorized from './pages/Unauthorized';

import ProductManager from './components/ProductManager';
import MainApp from './components/MainApp';

function App() {
  return (
    <Router>
      <Navbar />
      
      {/* Extra links for development/testing */}
      <nav id="nav-bar">
        <Link to="/">Main</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/ProductManager">Product Manager</Link>
      </nav>

      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<MainApp />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />

        {/* Product Manager UI */}
        <Route path="/ProductManager" element={<ProductManager />} />

        {/* Protected dashboards */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <DashboardCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DashboardDriver />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized fallback */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Fallback route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
