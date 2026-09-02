import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const { login, admin }        = useAuth();
  const navigate                = useNavigate();

  useEffect(() => {
    if (admin) navigate('/admin/dashboard', { replace: true });
  }, [admin, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) { setError('Both fields are required.'); return; }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__header">
          <span className="brand-box">IBW</span>
          <h1>Admin Panel</h1>
          <p>Sign in to manage enquiries</p>
        </div>

        <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
          <div className="aform-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email" type="email" placeholder="admin@instabizweb.com"
              value={email} onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="aform-group">
            <label htmlFor="password">Password</label>
            <input
              id="password" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="admin-login__error">{error}</div>}

          <button type="submit" className="admin-login__btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="admin-login__back">
          <a href="/">← Back to website</a>
        </p>
      </div>
    </div>
  );
}
