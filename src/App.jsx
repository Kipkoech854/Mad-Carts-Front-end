import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardCustomer from './pages/DashboardCustomer';
import DashboardDriver from './pages/DashboardDriver';
import Unauthorized from './pages/Unauthorized';

import ProductManager from './components/ProductManager/ProductManager';
import MainApp from './components/ProductManager/MainApp';
import './App.css';
import { useAuth } from "./context/AuthContext";


function App() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <>
      <nav id="nav-bar">
        <Navbar />
        <h1>Mad Carts</h1>
        <Link to="/" className="link">Home</Link> |
        <Link to="/cart" className="link">Cart</Link> |
        {isAdmin && <Link to="/ProductManager" className="link">Product Manager</Link>}
      </nav>

      <Routes>
        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Public routes */}
        <Route path="/" element={<MainApp />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
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

        {/* Fallbacks */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
