export type UserRole = 'customer' | 'admin';
export type UserStatus = 'active' | 'disabled';

export interface UserProfile {
  id: string;
  fullName: string;
  email?: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  role: 'customer';
  isEmailVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: 'admin';
  createdAt: string;
}

export type AuthUser = CustomerUser | AdminUser;

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agreedToTerms?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface OtpVerificationPayload {
  email: string;
  otp: string;
}

export interface AuthResponse<T = AuthUser> {
  success: boolean;
  user?: T;
  profile?: UserProfile;
  token?: string;
  message?: string;
  error?: string;
  requiresEmailConfirmation?: boolean;
}

export interface OtpState {
  email: string;
  isSent: boolean;
  canResend: boolean;
  cooldownSeconds: number;
}
