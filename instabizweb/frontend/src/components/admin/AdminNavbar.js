import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminNavbar.css';

export default function AdminNavbar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <header className="admin-nav">
      <div className="admin-nav__inner">
        <Link to="/admin/dashboard" className="admin-nav__brand">
          <span className="brand-box">IBW</span>
          <span>Admin Panel</span>
        </Link>
        <div className="admin-nav__right">
          <span className="admin-nav__user">👤 {admin?.name}</span>
          <button className="admin-nav__logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
