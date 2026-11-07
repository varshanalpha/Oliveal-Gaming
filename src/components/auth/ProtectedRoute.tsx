import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, Gamepad2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-[#080610] text-white flex flex-col items-center justify-center p-4">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] animate-pulse">
        <Gamepad2 className="w-7 h-7" />
      </div>
      <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading session...</span>
      </div>
    </div>
  </div>
);

/**
 * Route guard requiring an active authenticated session (any role)
 */
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * Route guard requiring an active customer profile
 */
export const RequireCustomer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isCustomer, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated as admin, redirect to admin operations
  if (isAdmin && !isCustomer) {
    return <Navigate to="/admin/bookings" replace />;
  }

  return <>{children}</>;
};

/**
 * Route guard requiring an active verified administrator profile
 */
export const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

