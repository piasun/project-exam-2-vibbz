import { useState } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@stud.noroff.no')) {
        setError('Email must end with @stud.noroff.no');
        return;
      }
    
      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
    
      try {
        await api.post('/auth/register', { name, email, password });
        navigate('/login');
      } catch (err) {
        setError('Registration failed. Try a different username.');
      }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-success">Register</button>
      </form>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
}
