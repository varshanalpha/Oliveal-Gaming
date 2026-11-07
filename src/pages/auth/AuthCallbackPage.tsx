import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, Gamepad2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    const processAuthCallback = async () => {
      try {
        // Check for error parameters in URL (e.g. user cancelled Google OAuth)
        const params = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const authError =
          params.get('error_description') ||
          params.get('error') ||
          hashParams.get('error_description') ||
          hashParams.get('error');

        if (authError) {
          if (isSubscribed) {
            setError(authError);
          }
          return;
        }

        // Retrieve the current session established by Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          // Listen for a brief window in case PKCE exchange is finishing
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, currentSession) => {
              if (event === 'SIGNED_IN' && currentSession?.user) {
                subscription.unsubscribe();
                await handleRedirect();
              }
            }
          );

          // Timeout fallback after 4 seconds
          setTimeout(() => {
            if (isSubscribed && !session) {
              setError('Authentication timed out. Please try logging in again.');
            }
          }, 4000);
          return;
        }

        await handleRedirect();
      } catch (err) {
        if (isSubscribed) {
          setError('Failed to complete authentication. Please try again.');
        }
      }
    };

    const handleRedirect = async () => {
      const userProfile = await refreshProfile();

      if (!isSubscribed) return;

      if (userProfile?.role === 'admin') {
        navigate('/admin/bookings', { replace: true });
      } else {
        navigate('/customer/book-slot', { replace: true });
      }
    };

    processAuthCallback();

    return () => {
      isSubscribed = false;
    };
  }, [navigate, refreshProfile]);

  return (
    <div className="min-h-screen bg-[#080610] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#0e0a1d]/90 border border-purple-500/20 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col items-center text-center space-y-6">
        
        {/* Gaming Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 flex items-center justify-center text-white shadow-[0_0_30px_rgba(168,85,247,0.5)]">
          <Gamepad2 className="w-8 h-8" />
        </div>

        {error ? (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-center gap-2.5 text-left">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-purple-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="font-semibold text-base">Authenticating...</span>
            </div>
            <p className="text-xs text-zinc-400">
              Securing session and loading your gaming profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
