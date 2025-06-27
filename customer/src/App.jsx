import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginCustomer from "./pages/LoginCustomer";
import LoginAdmin from "./pages/LoginAdmin";
import LoginDelivery from "./pages/LoginDelivery";
import DashboardCustomer from "./pages/DashboardCustomer";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardDelivery from "./pages/DashboardDelivery";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/customer" element={<LoginCustomer />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/login/delivery" element={<LoginDelivery />} />
        <Route path="/dashboard/customer" element={<DashboardCustomer />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        <Route path="/dashboard/delivery" element={<DashboardDelivery />} />
      </Routes>
    </Router>
  );
}
