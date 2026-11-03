import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { authService, DEFAULT_MOCK_ADMIN } from '../../services/authService';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Admin email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid administrator email.');
      return;
    }
    if (!password) {
      setError('Admin password is required.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.loginAdmin({
        email,
        password,
        rememberMe,
      });

      if (res.success) {
        // Navigates to admin operations dashboard placeholder
        navigate('/admin/dashboard');
      } else {
        setError(res.error || 'Failed to authenticate administrator.');
      }
    } catch {
      setError('An error occurred during admin sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail(DEFAULT_MOCK_ADMIN.email);
    setPassword(DEFAULT_MOCK_ADMIN.password);
  };

  return (
    <AuthLayout screenType="admin" badgeLabel="Admin Login">
      <div className="space-y-6">
        
        {/* Header (Matching Reference Image) */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-[11px] font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Restricted Operations Access</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Admin <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent text-glow-purple">Portal</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Sign in to manage Oliveal Gaming Zone operations.
          </p>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Admin Login Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4">
          
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

          {/* Remember Me Checkbox Only (Strictly NO Forgot Password for Admin per specs) */}
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
          </div>

          {/* Admin Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl font-display font-semibold text-sm bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_28px_rgba(168,85,247,0.6)] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating Administrator...</span>
              </span>
            ) : (
              <span>Log In</span>
            )}
          </button>
        </form>

        {/* Back to Customer Login (Matching Reference Image exact bottom row) */}
        <div className="text-center pt-3 border-t border-purple-500/10">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-purple-400" />
            <span>Back to Customer Login</span>
          </Link>
        </div>

        {/* Quick Demo Credentials Fill for Testing */}
        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={handleFillDemoAdmin}
            className="text-[11px] text-zinc-500 hover:text-purple-400 transition-colors cursor-pointer underline"
          >
            Quick Fill Demo Admin Credentials ({DEFAULT_MOCK_ADMIN.email})
          </button>
        </div>

      </div>
    </AuthLayout>
  );
};

