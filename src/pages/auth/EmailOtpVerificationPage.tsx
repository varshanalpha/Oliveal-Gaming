import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, ArrowLeft, RotateCw, Edit3, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { OtpInput } from '../../components/auth/OtpInput';
import { useAuth } from '../../hooks/useAuth';

export const EmailOtpVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, resendOtp } = useAuth();

  // Retrieve email from navigation state or pending signup or default
  const initialEmail =
    (location.state as { email?: string })?.email ||
    '';

  const [email, setEmail] = useState(initialEmail);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(initialEmail);

  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(59);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Mask email helper: e.g. varshan.gamer@gmail.com -> var****@gmail.com
  const maskEmail = (rawEmail: string) => {
    const parts = rawEmail.split('@');
    if (parts.length !== 2) return rawEmail;
    const name = parts[0];
    const domain = parts[1];
    const visiblePrefix = name.slice(0, 3);
    return `${visiblePrefix}****@${domain}`;
  };

  // 60-second cooldown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (otp.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({ email: email.trim().toLowerCase(), otp: otp.trim() });

      if (res.success) {
        setSuccessMessage('Account verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/customer/book-slot', { replace: true });
        }, 1200);
      } else {
        setError(res.error || 'Verification failed. Please check the code and try again.');
      }
    } catch {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;
    setError(null);
    setResending(true);

    try {
      const res = await resendOtp(email.trim().toLowerCase());
      if (res.success) {
        setSuccessMessage(res.message || 'Fresh verification code sent to your email.');
        setCountdown(60);
      } else {
        setError(res.error || 'Failed to resend code.');
      }
    } catch {
      setError('Could not resend code. Please try again later.');
    } finally {
      setResending(false);
    }
  };

  const handleSaveEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempEmail.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setEmail(tempEmail.trim());
    setIsEditingEmail(false);
    setError(null);
    setCountdown(60);
    setSuccessMessage(`Updated email to ${tempEmail.trim()}. Code resent.`);
  };

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AuthLayout screenType="otp" badgeLabel="Email OTP Verification">
      <div className="space-y-6">
        
        {/* Header (Matching Reference Image) */}
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Verify <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent text-glow-purple">Your Email</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            We've sent a 6-digit verification code to your email address.
          </p>
        </div>

        {/* Masked Email Badge Box */}
        <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-purple-500/25 flex items-center justify-center gap-2 text-xs text-zinc-300 shadow-sm">
          <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          {isEditingEmail ? (
            <div className="flex items-center gap-2 w-full">
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="flex-1 bg-black/60 border border-purple-500/50 rounded-lg px-2 py-1 text-white text-xs focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSaveEmail}
                className="px-2 py-1 rounded-md bg-purple-600 text-white font-semibold text-xs"
              >
                Save
              </button>
            </div>
          ) : (
            <span className="font-mono font-medium tracking-wide text-purple-200">
              {maskEmail(email)}
            </span>
          )}
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Feedback */}
        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleVerify} className="space-y-5">
          
          {/* 6-Box OTP Inputs */}
          <OtpInput
            value={otp}
            onChange={(val) => {
              setOtp(val);
              if (error) setError(null);
            }}
            disabled={loading}
          />

          {/* Resend Countdown Text */}
          <div className="text-center text-xs">
            {countdown > 0 ? (
              <span className="text-zinc-400">
                Resend code in{' '}
                <span className="font-mono font-bold text-purple-400">{formatTime(countdown)}</span>
              </span>
            ) : (
              <span className="text-purple-300 font-medium">You can now request a new code.</span>
            )}
          </div>

          {/* Verify Email Button */}
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-2.5 px-4 rounded-xl font-display font-semibold text-sm bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_28px_rgba(168,85,247,0.6)] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Code...</span>
              </span>
            ) : (
              <span>Verify Email</span>
            )}
          </button>
        </form>

        {/* Action Row: Resend OTP | Change Email */}
        <div className="flex items-center justify-center gap-4 text-xs pt-1 border-t border-purple-500/10">
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || resending}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              countdown > 0 || resending
                ? 'text-zinc-600 cursor-not-allowed'
                : 'text-purple-400 hover:text-purple-300 font-medium'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
            <span>Resend OTP</span>
          </button>

          <span className="text-zinc-700">|</span>

          <button
            type="button"
            onClick={() => {
              setIsEditingEmail(!isEditingEmail);
              setTempEmail(email);
            }}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Change Email</span>
          </button>
        </div>

        {/* Back to Login Link */}
        <div className="text-center pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-purple-400" />
            <span>Back to Login</span>
          </Link>
        </div>

        {/* Mock Tester Quick Hint */}
        <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/15 text-[11px] text-zinc-400 text-center">
          <span className="text-purple-300 font-semibold">Test Code: </span>
          <button
            type="button"
            onClick={() => setOtp('482916')}
            className="underline hover:text-purple-200 cursor-pointer font-mono"
          >
            482916
          </button>
          {' '}(or any 6 digits). <span className="text-red-400/80">000000</span> for invalid, <span className="text-amber-400/80">999999</span> for expired.
        </div>

      </div>
    </AuthLayout>
  );
};
