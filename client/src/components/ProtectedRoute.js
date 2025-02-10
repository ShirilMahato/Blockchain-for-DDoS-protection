import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Optional: Consider handling the loading state here as well, similar to AuthProvider
  if (typeof isAuthenticated === 'undefined') {
    return <div>Loading...</div>; // Or handle it based on your loading state management strategy
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
