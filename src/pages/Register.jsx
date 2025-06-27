import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ email: '', username: '', password: '', role: 'customer' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      alert('Registered successfully!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      {['email', 'username', 'password'].map((field) => (
        <input
          key={field}
          type={field === 'password' ? 'password' : 'text'}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 mb-2"
        />
      ))}
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full p-2 mb-2">
        <option value="customer">Customer</option>
        <option value="driver">Driver</option>
      </select>
      <button type="submit" className="bg-green-600 text-white p-2 w-full">Register</button>
    </form>
  );
};

export default Register;
