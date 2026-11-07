import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import {
  UserProfile,
  SignupPayload,
  LoginPayload,
  OtpVerificationPayload,
  AuthResponse,
  CustomerUser,
  AdminUser,
} from '../types/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  signupCustomer: (payload: SignupPayload) => Promise<AuthResponse<CustomerUser>>;
  verifyOtp: (payload: OtpVerificationPayload) => Promise<AuthResponse<CustomerUser>>;
  resendOtp: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  loginCustomer: (payload: LoginPayload) => Promise<AuthResponse<CustomerUser>>;
  loginAdmin: (payload: LoginPayload) => Promise<AuthResponse<AdminUser>>;
  loginWithGoogle: (portalOrigin?: 'customer' | 'admin') => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to safely fetch user profile with retry for trigger latency
const fetchUserProfile = async (userId: string, email?: string): Promise<UserProfile | null> => {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data && !error) {
        return {
          id: data.id,
          fullName: data.full_name || 'Gamer',
          email: email || '',
          phone: data.phone || null,
          avatarUrl: data.avatar_url,
          role: data.role,
          status: data.status,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch {
      // Ignore transient errors during retry
    }
    // Wait briefly before retry if profile was just triggered
    await new Promise((res) => setTimeout(res, 300));
  }
  return null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial session on mount and subscribe to auth state changes
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Failed to retrieve active session:', error.message);
        }

        if (mounted && initialSession?.user) {
          setSession(initialSession);
          setUser(initialSession.user);
          const userProfile = await fetchUserProfile(initialSession.user.id, initialSession.user.email);
          if (mounted) {
            setProfile(userProfile);
          }
        }
      } catch (err) {
        console.error('Error during initial auth check:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for live Supabase Auth state changes (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!mounted) return;

        setSession(newSession);
        setUser(newSession?.user || null);

        if (newSession?.user) {
          const userProfile = await fetchUserProfile(newSession.user.id, newSession.user.email);
          if (mounted) {
            setProfile(userProfile);
          }
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Refresh profile manual trigger
  const refreshProfile = useCallback(async (): Promise<UserProfile | null> => {
    if (!user) return null;
    const updated = await fetchUserProfile(user.id, user.email);
    setProfile(updated);
    return updated;
  }, [user]);

  // Customer Signup with Email & Password
  const signupCustomer = async (payload: SignupPayload): Promise<AuthResponse<CustomerUser>> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: payload.email.trim().toLowerCase(),
        password: payload.password,
        options: {
          data: {
            full_name: payload.fullName.trim(),
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      if (data.user) {
        const isEmailConfirmed = !!data.user.email_confirmed_at;
        const customerUser: CustomerUser = {
          id: data.user.id,
          fullName: payload.fullName.trim(),
          email: data.user.email || payload.email,
          role: 'customer',
          isEmailVerified: isEmailConfirmed,
          createdAt: data.user.created_at,
        };

        return {
          success: true,
          user: customerUser,
          requiresEmailConfirmation: !isEmailConfirmed,
          message: 'Verification code sent to your email.',
        };
      }

      return {
        success: false,
        error: 'Unable to register user.',
      };
    } catch {
      return {
        success: false,
        error: 'An unexpected error occurred during signup.',
      };
    }
  };

  // Verify 6-digit Signup Email OTP
  const verifyOtp = async (payload: OtpVerificationPayload): Promise<AuthResponse<CustomerUser>> => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: payload.email.trim().toLowerCase(),
        token: payload.otp.trim(),
        type: 'signup',
      });

      if (error) {
        // Also attempt 'email' type if user was invited or magic link was triggered
        const retryResult = await supabase.auth.verifyOtp({
          email: payload.email.trim().toLowerCase(),
          token: payload.otp.trim(),
          type: 'email',
        });

        if (retryResult.error) {
          return {
            success: false,
            error: retryResult.error.message || 'Invalid or expired verification code.',
          };
        }

        if (retryResult.data.user) {
          const userProfile = await fetchUserProfile(
            retryResult.data.user.id,
            retryResult.data.user.email
          );
          setProfile(userProfile);
          setUser(retryResult.data.user);
          setSession(retryResult.data.session);

          return {
            success: true,
            user: {
              id: retryResult.data.user.id,
              fullName: userProfile?.fullName || 'Gamer',
              email: retryResult.data.user.email || payload.email,
              role: 'customer',
              isEmailVerified: true,
              avatarUrl: userProfile?.avatarUrl || undefined,
              createdAt: retryResult.data.user.created_at,
            },
            profile: userProfile || undefined,
            message: 'Email verified successfully.',
          };
        }
      }

      if (data.user) {
        const userProfile = await fetchUserProfile(data.user.id, data.user.email);
        setProfile(userProfile);
        setUser(data.user);
        setSession(data.session);

        return {
          success: true,
          user: {
            id: data.user.id,
            fullName: userProfile?.fullName || 'Gamer',
            email: data.user.email || payload.email,
            role: 'customer',
            isEmailVerified: true,
            avatarUrl: userProfile?.avatarUrl || undefined,
            createdAt: data.user.created_at,
          },
          profile: userProfile || undefined,
          message: 'Email verified successfully.',
        };
      }

      return {
        success: false,
        error: 'Verification failed. Please try again.',
      };
    } catch {
      return {
        success: false,
        error: 'An unexpected error occurred during OTP verification.',
      };
    }
  };

  // Resend 6-digit Signup Confirmation OTP
  const resendOtp = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        message: `Fresh verification code sent to ${email}.`,
      };
    } catch {
      return {
        success: false,
        error: 'Failed to resend verification code.',
      };
    }
  };

  // Customer Login with Email & Password
  const loginCustomer = async (payload: LoginPayload): Promise<AuthResponse<CustomerUser>> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email.trim().toLowerCase(),
        password: payload.password,
      });

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes('email not confirmed') || msg.includes('unconfirmed')) {
          return {
            success: false,
            requiresEmailConfirmation: true,
            error: 'Please verify your email address to continue.',
          };
        }
        return {
          success: false,
          error: error.message || 'Invalid email or password.',
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: 'Authentication failed.',
        };
      }

      // Fetch user profile and verify account permissions
      const userProfile = await fetchUserProfile(data.user.id, data.user.email);
      if (!userProfile) {
        return {
          success: false,
          error: 'Profile initialization error. Please contact support.',
        };
      }

      if (userProfile.status === 'disabled') {
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'Your account is currently inactive. Please contact lounge support.',
        };
      }

      // Strict portal separation: Customer Login only admits customer-role accounts.
      // If an admin reaches this portal, sign them out immediately and return an
      // actionable error. Never redirect to the admin dashboard from here.
      if (userProfile.role !== 'customer') {
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'This is an administrator account. Please use the Admin Login portal.',
        };
      }

      setProfile(userProfile);
      setUser(data.user);
      setSession(data.session);

      return {
        success: true,
        user: {
          id: data.user.id,
          fullName: userProfile.fullName,
          email: data.user.email || payload.email,
          role: userProfile.role,
          isEmailVerified: !!data.user.email_confirmed_at,
          avatarUrl: userProfile.avatarUrl || undefined,
          createdAt: data.user.created_at,
        },
        profile: userProfile,
      };
    } catch {
      return {
        success: false,
        error: 'An unexpected error occurred during sign in.',
      };
    }
  };

  // Admin Login via Email & Password with strict role verification
  const loginAdmin = async (payload: LoginPayload): Promise<AuthResponse<AdminUser>> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email.trim().toLowerCase(),
        password: payload.password,
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Invalid administrator credentials.',
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: 'Admin authentication failed.',
        };
      }

      // Fetch profile to verify admin role
      const userProfile = await fetchUserProfile(data.user.id, data.user.email);
      if (!userProfile || userProfile.role !== 'admin') {
        // Reject non-admin callers immediately
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'Access denied. Only authorized Oliveal Gaming Zone administrators can log in here.',
        };
      }

      if (userProfile.status === 'disabled') {
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'This administrator account is disabled.',
        };
      }

      setProfile(userProfile);
      setUser(data.user);
      setSession(data.session);

      return {
        success: true,
        user: {
          id: data.user.id,
          fullName: userProfile.fullName,
          email: data.user.email || payload.email,
          role: 'admin',
          createdAt: data.user.created_at,
        },
        profile: userProfile,
      };
    } catch {
      return {
        success: false,
        error: 'An unexpected error occurred during admin sign in.',
      };
    }
  };

  // Google OAuth PKCE Login / Signup
  // portalOrigin tells the callback which portal triggered this flow so it can
  // enforce the correct role check on return.
  const loginWithGoogle = async (portalOrigin: 'customer' | 'admin' = 'customer'): Promise<{ success: boolean; error?: string }> => {
    try {
      // Persist portal origin so the callback page can read it after the redirect
      localStorage.setItem('oliveal_oauth_portal', portalOrigin);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        localStorage.removeItem('oliveal_oauth_portal');
        return {
          success: false,
          error: error.message,
        };
      }

      return { success: true };
    } catch {
      localStorage.removeItem('oliveal_oauth_portal');
      return {
        success: false,
        error: 'Failed to initiate Google authentication.',
      };
    }
  };

  // Sign out
  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out error:', err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    isAuthenticated: !!user && !!profile && profile.status === 'active',
    isAdmin: profile?.role === 'admin' && profile?.status === 'active',
    isCustomer: profile?.role === 'customer' && profile?.status === 'active',
    signupCustomer,
    verifyOtp,
    resendOtp,
    loginCustomer,
    loginAdmin,
    loginWithGoogle,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
