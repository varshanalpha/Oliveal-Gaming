import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { GoogleButton } from '../../components/auth/GoogleButton';
import { authService, DEFAULT_MOCK_CUSTOMER } from '../../services/authService';

export const CustomerLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Populate remembered email if present
    const remembered = authService.getRememberedEmail();
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.loginCustomer({
        email,
        password,
        rememberMe,
      });

      if (res.success) {
        // Successful login -> navigate to customer dashboard placeholder
        navigate('/customer/dashboard');
      } else {
        setError(res.error || 'Failed to sign in. Please verify your credentials.');
      }
    } catch {
      setError('An unexpected error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      const res = await authService.loginWithGoogle();
      if (res.success) {
        // Direct to customer dashboard, skipping OTP
        navigate('/customer/dashboard');
      } else {
        setError(res.error || 'Google login was cancelled.');
      }
    } catch {
      setError('Google authentication failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail(DEFAULT_MOCK_CUSTOMER.email);
    setPassword(DEFAULT_MOCK_CUSTOMER.password);
  };

  return (
    <AuthLayout screenType="login" badgeLabel="Customer Login">
      <div className="space-y-6">
        
        {/* Header (Matching Reference Image) */}
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Welcome Back, <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent text-glow-purple">Gamer!</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Log in to book your gaming slot and continue your gaming journey.
          </p>
        </div>

        {/* Role Switcher Pill Tab (Customer vs Admin) */}
        <div className="flex p-1 rounded-xl bg-zinc-900/90 border border-purple-500/20">
          <button
            type="button"
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-all cursor-default"
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer</span>
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Error Feedback Banner */}
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                autoComplete="email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-zinc-400 hover:text-zinc-200 transition-colors p-0.5 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-zinc-900 border-zinc-700 text-purple-600 focus:ring-purple-500"
              />
              <span>Remember Me</span>
            </label>

            <button
              type="button"
              onClick={() => alert('Password recovery will be available in Stage 3 API integration. You can sign in with any valid password or click demo credentials.')}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-2.5 px-4 rounded-xl font-display font-semibold text-sm bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_28px_rgba(168,85,247,0.6)] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </span>
            ) : (
              <span>Log In</span>
            )}
          </button>
        </form>

        {/* Divider: OR CONTINUE WITH */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-zinc-800 w-full" />
          <span className="bg-[#110f24] px-3 text-[10px] font-bold tracking-wider uppercase text-zinc-500 absolute">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Google OAuth Button */}
        <GoogleButton
          onClick={handleGoogleLogin}
          loading={googleLoading}
          disabled={loading}
        />

        {/* Signup Link */}
        <div className="text-center text-xs text-zinc-400 pt-1">
          <span>Don't have an account? </span>
          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Demo Helper Pill */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] text-zinc-500 hover:text-purple-400 transition-colors cursor-pointer underline"
          >
            Quick Fill Demo Customer Credentials
          </button>
        </div>

      </div>
    </AuthLayout>
  );
};

