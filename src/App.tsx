import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CustomerLoginPage } from './pages/auth/CustomerLoginPage';
import { CustomerSignupPage } from './pages/auth/CustomerSignupPage';
import { EmailOtpVerificationPage } from './pages/auth/EmailOtpVerificationPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { BookSlotPage } from './pages/customer/BookSlotPage';
import { MyBookingsPage } from './pages/customer/MyBookingsPage';
import { ProfilePage } from './pages/customer/ProfilePage';
import { SettingsPage } from './pages/customer/SettingsPage';
import { SupportPage } from './pages/customer/SupportPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';

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

      {/* Customer Experience Routes */}
      <Route path="/customer/dashboard" element={<Navigate to="/customer/book-slot" replace />} />
      <Route path="/customer/book-slot" element={<BookSlotPage />} />
      <Route path="/customer/bookings" element={<MyBookingsPage />} />
      <Route path="/customer/profile" element={<ProfilePage />} />
      <Route path="/customer/settings" element={<SettingsPage />} />
      <Route path="/customer/support" element={<SupportPage />} />

      {/* Admin Experience Routes */}
      <Route path="/admin" element={<Navigate to="/admin/bookings" replace />} />
      <Route path="/admin/dashboard" element={<Navigate to="/admin/bookings" replace />} />
      <Route path="/admin/bookings" element={<AdminBookingsPage />} />

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
