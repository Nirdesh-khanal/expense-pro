import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  
  if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
