import { supabase } from '../lib/supabase';
import {
  AuthResponse,
  CustomerUser,
  AdminUser,
  SignupPayload,
  LoginPayload,
  OtpVerificationPayload,
  UserProfile,
} from '../types/auth';

const STORAGE_KEYS = {
  CURRENT_USER: 'oliveal_current_user',
  PENDING_SIGNUP: 'oliveal_pending_signup',
  REMEMBERED_EMAIL: 'oliveal_remembered_email',
};

// Default Demo Credentials
export const DEFAULT_MOCK_ADMIN = {
  email: 'admin@oliveal.com',
  password: 'AdminPassword123!',
};

export const DEFAULT_MOCK_CUSTOMER = {
  email: 'varshanxalpha90@gmail.com',
  password: 'TestPassword123!',
};

// Helper to fetch user profile from Supabase profiles table
export const fetchProfileById = async (userId: string, email?: string): Promise<UserProfile | null> => {
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
          avatarUrl: data.avatar_url,
          role: data.role,
          status: data.status,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch {
      // Retry
    }
    await new Promise((res) => setTimeout(res, 300));
  }
  return null;
};

export const authService = {
  /**
   * Register a new customer via email and password using Supabase Auth.
   */
  async registerCustomer(payload: SignupPayload): Promise<AuthResponse<CustomerUser>> {
    const email = payload.email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signUp({
      email,
      password: payload.password,
      options: {
        data: {
          full_name: payload.fullName.trim(),
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      const isConfirmed = !!data.user.email_confirmed_at;
      const customer: CustomerUser = {
        id: data.user.id,
        fullName: payload.fullName.trim(),
        email: data.user.email || email,
        role: 'customer',
        isEmailVerified: isConfirmed,
        createdAt: data.user.created_at,
      };

      localStorage.setItem(STORAGE_KEYS.PENDING_SIGNUP, JSON.stringify(customer));

      return {
        success: true,
        user: customer,
        requiresEmailConfirmation: !isConfirmed,
        message: 'Verification code sent to your email.',
      };
    }

    return { success: false, error: 'Registration failed.' };
  },

  /**
   * Resend signup verification OTP using Supabase Auth.
   */
  async resendSignupOtp(email: string): Promise<{ success: boolean; message?: string; error?: string }> {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim().toLowerCase(),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: `A fresh 6-digit verification code has been sent to ${email}.`,
    };
  },

  /**
   * Verify the 6-digit signup OTP using Supabase Auth.
   */
  async verifySignupOtp({ email, otp }: OtpVerificationPayload): Promise<AuthResponse<CustomerUser>> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanToken = otp.trim();

    let { data, error } = await supabase.auth.verifyOtp({
      email: cleanEmail,
      token: cleanToken,
      type: 'signup',
    });

    if (error) {
      const retry = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: cleanToken,
        type: 'email',
      });
      data = retry.data;
      error = retry.error;
    }

    if (error || !data.user) {
      return {
        success: false,
        error: error?.message || 'Invalid or expired verification code.',
      };
    }

    const profile = await fetchProfileById(data.user.id, data.user.email);
    const customerUser: CustomerUser = {
      id: data.user.id,
      fullName: profile?.fullName || data.user.user_metadata?.full_name || 'Gamer',
      email: data.user.email || cleanEmail,
      role: 'customer',
      isEmailVerified: true,
      avatarUrl: profile?.avatarUrl || undefined,
      createdAt: data.user.created_at,
    };

    localStorage.removeItem(STORAGE_KEYS.PENDING_SIGNUP);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(customerUser));

    return {
      success: true,
      user: customerUser,
      profile: profile || undefined,
      token: data.session?.access_token,
      message: 'Email verified successfully!',
    };
  },

  /**
   * Customer Login via email and password using Supabase Auth.
   */
  async loginCustomer(payload: LoginPayload): Promise<AuthResponse<CustomerUser>> {
    const email = payload.email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: payload.password,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('email not confirmed') || msg.includes('unconfirmed')) {
        return {
          success: false,
          requiresEmailConfirmation: true,
          error: 'Please verify your email address before logging in.',
        };
      }
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'Sign in failed.' };
    }

    const profile = await fetchProfileById(data.user.id, data.user.email);
    if (!profile) {
      return { success: false, error: 'User profile not found.' };
    }

    if (profile.status === 'disabled') {
      await supabase.auth.signOut();
      return { success: false, error: 'Your account has been disabled.' };
    }

    const customerUser: CustomerUser = {
      id: data.user.id,
      fullName: profile.fullName,
      email: data.user.email || email,
      role: 'customer',
      isEmailVerified: !!data.user.email_confirmed_at,
      avatarUrl: profile.avatarUrl || undefined,
      createdAt: data.user.created_at,
    };

    if (payload.rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, email);
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(customerUser));

    return {
      success: true,
      user: customerUser,
      profile,
      token: data.session?.access_token,
    };
  },

  /**
   * Google OAuth Login/Signup using Supabase Auth.
   */
  async loginWithGoogle(): Promise<AuthResponse<CustomerUser>> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  /**
   * Admin Login via email and password with strict database-backed role verification.
   */
  async loginAdmin(payload: LoginPayload): Promise<AuthResponse<AdminUser>> {
    const email = payload.email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: payload.password,
    });

    if (error) {
      return { success: false, error: error.message || 'Invalid administrator credentials.' };
    }

    if (!data.user) {
      return { success: false, error: 'Admin authentication failed.' };
    }

    const profile = await fetchProfileById(data.user.id, data.user.email);
    if (!profile || profile.role !== 'admin') {
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'Access denied. Only authorized Oliveal Gaming Zone administrators can log in here.',
      };
    }

    if (profile.status === 'disabled') {
      await supabase.auth.signOut();
      return { success: false, error: 'This administrator account has been disabled.' };
    }

    const adminUser: AdminUser = {
      id: data.user.id,
      fullName: profile.fullName,
      email: data.user.email || email,
      role: 'admin',
      createdAt: data.user.created_at,
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(adminUser));

    return {
      success: true,
      user: adminUser,
      profile,
      token: data.session?.access_token,
    };
  },

  /**
   * Retrieve cached user or pending registration
   */
  getCurrentUser(): (CustomerUser | AdminUser) | null {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  },

  getPendingSignup(): CustomerUser | null {
    const raw = localStorage.getItem(STORAGE_KEYS.PENDING_SIGNUP);
    return raw ? JSON.parse(raw) : null;
  },

  getRememberedEmail(): string {
    return localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL) || '';
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore signOut errors
    }
  },
};
