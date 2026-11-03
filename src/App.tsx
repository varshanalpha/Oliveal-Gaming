import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CustomerLoginPage } from './pages/auth/CustomerLoginPage';
import { CustomerSignupPage } from './pages/auth/CustomerSignupPage';
import { EmailOtpVerificationPage } from './pages/auth/EmailOtpVerificationPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { BookSlotPage } from './pages/customer/BookSlotPage';
import { MyBookingsPage } from './pages/customer/MyBookingsPage';
import { ProfilePage } from './pages/customer/ProfilePage';
import { SettingsPage } from './pages/customer/SettingsPage';
import { SupportPage } from './pages/customer/SupportPage';
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

      {/* Customer Dashboard Experience */}
      <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
      <Route path="/customer/book-slot" element={<BookSlotPage />} />
      <Route path="/customer/bookings" element={<MyBookingsPage />} />
      <Route path="/customer/profile" element={<ProfilePage />} />
      <Route path="/customer/settings" element={<SettingsPage />} />
      <Route path="/customer/support" element={<SupportPage />} />

      {/* Admin Post-Auth Entry Point (Scope reserved for Phase 4) */}
      <Route path="/admin/dashboard" element={<AdminDashboardPlaceholder />} />

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
