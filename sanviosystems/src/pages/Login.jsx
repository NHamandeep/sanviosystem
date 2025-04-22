import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // 👈 added Link

// For Eye Icon
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{
      width: '300px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px', position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show Eye icon */}
          </span>
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginBottom: '10px'
        }}>
          Login
        </button>

        {/* 👉 Forgot Password Link */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/forgot-password" style={{ color: '#007bff', textDecoration: 'none' }}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
