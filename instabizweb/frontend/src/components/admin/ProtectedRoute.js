import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#0f172a', color: '#94a3b8', fontSize: '0.9rem'
      }}>
        Verifying session…
      </div>
    );
  }

  return admin ? children : <Navigate to="/admin" replace />;
}
