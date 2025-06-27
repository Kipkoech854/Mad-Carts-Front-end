import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <div>
          <Link to="/" className="mr-4">Home</Link>
          {!user && (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
          {user && user.role === 'customer' && <Link to="/customer">Customer</Link>}
          {user && user.role === 'driver' && <Link to="/driver">Driver</Link>}
        </div>
        {user && <button onClick={logout} className="text-red-400">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
