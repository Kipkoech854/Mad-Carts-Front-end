import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Components.css'

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <div>
          
          {!user && (
            <div className = 'sign-up icon'>
              <Link to="/login" className="sign-in">Sign-in</Link>
              <Link to="/register" className='create-account'>Create account</Link>
            
            </div>
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
