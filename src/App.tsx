import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CustomerLoginPage } from './pages/auth/CustomerLoginPage';
import { CustomerSignupPage } from './pages/auth/CustomerSignupPage';
import { EmailOtpVerificationPage } from './pages/auth/EmailOtpVerificationPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { CustomerDashboardPlaceholder } from './pages/CustomerDashboardPlaceholder';
import { AdminDashboardPlaceholder } from './pages/AdminDashboardPlaceholder';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Authentication Pages (Strictly matching reference image) */}
      <Route path="/login" element={<CustomerLoginPage />} />
      <Route path="/signup" element={<CustomerSignupPage />} />
      <Route path="/verify-email" element={<EmailOtpVerificationPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Post-Auth Entry Points (Minimal Placeholders) */}
      <Route path="/customer/dashboard" element={<CustomerDashboardPlaceholder />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPlaceholder />} />

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
