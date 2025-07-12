import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner fullScreen text="Checking authentication..." />;
  }

  // If route requires authentication and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to auth page with return URL
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If route is for non-authenticated users and user is authenticated
  if (!requireAuth && isAuthenticated) {
    // Redirect to dashboard
    return <Navigate to="/my-applications" replace />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;