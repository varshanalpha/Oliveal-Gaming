import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RequireCustomer, RequireAdmin } from './components/auth/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { CustomerLoginPage } from './pages/auth/CustomerLoginPage';
import { CustomerSignupPage } from './pages/auth/CustomerSignupPage';
import { EmailOtpVerificationPage } from './pages/auth/EmailOtpVerificationPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { AuthCallbackPage } from './pages/auth/AuthCallbackPage';
import { BookSlotPage } from './pages/customer/BookSlotPage';
import { MyBookingsPage } from './pages/customer/MyBookingsPage';
import { ProfilePage } from './pages/customer/ProfilePage';
import { SettingsPage } from './pages/customer/SettingsPage';
import { SupportPage } from './pages/customer/SupportPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminOnSpotBookingPage } from './pages/admin/AdminOnSpotBookingPage';
import { AdminScanQRPage } from './pages/admin/AdminScanQRPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Pages (Strictly matching reference image) */}
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/signup" element={<CustomerSignupPage />} />
        <Route path="/verify-email" element={<EmailOtpVerificationPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Customer Experience Routes (Protected) */}
        <Route path="/customer/dashboard" element={<Navigate to="/customer/book-slot" replace />} />
        <Route
          path="/customer/book-slot"
          element={
            <RequireCustomer>
              <BookSlotPage />
            </RequireCustomer>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <RequireCustomer>
              <MyBookingsPage />
            </RequireCustomer>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <RequireCustomer>
              <ProfilePage />
            </RequireCustomer>
          }
        />
        <Route
          path="/customer/settings"
          element={
            <RequireCustomer>
              <SettingsPage />
            </RequireCustomer>
          }
        />
        <Route
          path="/customer/support"
          element={
            <RequireCustomer>
              <SupportPage />
            </RequireCustomer>
          }
        />

        {/* Admin Experience Routes (Protected Admin) */}
        <Route path="/admin" element={<Navigate to="/admin/bookings" replace />} />
        <Route path="/admin/dashboard" element={<Navigate to="/admin/bookings" replace />} />
        <Route
          path="/admin/bookings"
          element={
            <RequireAdmin>
              <AdminBookingsPage />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/on-spot"
          element={
            <RequireAdmin>
              <AdminOnSpotBookingPage />
            </RequireAdmin>
          }
        />
        <Route path="/admin/on-spot-booking" element={<Navigate to="/admin/on-spot" replace />} />
        <Route
          path="/admin/scan-qr"
          element={
            <RequireAdmin>
              <AdminScanQRPage />
            </RequireAdmin>
          }
        />
        <Route path="/admin/scan" element={<Navigate to="/admin/scan-qr" replace />} />
        <Route path="/admin/reports" element={<Navigate to="/admin/bookings" replace />} />
        <Route
          path="/admin/settings"
          element={
            <RequireAdmin>
              <AdminSettingsPage />
            </RequireAdmin>
          }
        />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
