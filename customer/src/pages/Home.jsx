import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Mad-Carts</h1>
      <nav>
        <ul>
          <li><Link to="/login/customer">Customer Login</Link></li>
          <li><Link to="/login/admin">Admin Login</Link></li>
          <li><Link to="/login/delivery">Delivery Login</Link></li>
        </ul>
      </nav>
    </div>
  );
}
