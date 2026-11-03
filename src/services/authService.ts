import {
  AuthResponse,
  CustomerUser,
  AdminUser,
  SignupPayload,
  LoginPayload,
  OtpVerificationPayload,
} from '../types/auth';

const STORAGE_KEYS = {
  CURRENT_USER: 'oliveal_current_user',
  PENDING_SIGNUP: 'oliveal_pending_signup',
  REMEMBERED_EMAIL: 'oliveal_remembered_email',
};

// Default Mock Admin Credential
export const DEFAULT_MOCK_ADMIN = {
  email: 'admin@oliveal.com',
  password: 'AdminPassword123!',
};

// Default Mock Customer Credential
export const DEFAULT_MOCK_CUSTOMER = {
  email: 'gamer@oliveal.com',
  password: 'GamerPassword123!',
};

// Helper delay to simulate real server latency
const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  /**
   * Register a new customer via email and password.
   * Returns success and navigates to OTP verification.
   */
  async registerCustomer(payload: SignupPayload): Promise<AuthResponse<CustomerUser>> {
    await delay(700);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!payload.fullName.trim()) {
      return { success: false, error: 'Full name is required.' };
    }

    if (payload.password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' };
    }

    if (payload.password !== payload.confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }

    if (!payload.agreedToTerms) {
      return { success: false, error: 'You must agree to the Terms of Service and Privacy Policy.' };
    }

    // Save pending registration for OTP step
    const pendingCustomer: CustomerUser = {
      id: `usr-${Date.now()}`,
      fullName: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      role: 'customer',
      isEmailVerified: false,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.PENDING_SIGNUP, JSON.stringify(pendingCustomer));

    return {
      success: true,
      user: pendingCustomer,
      message: 'Verification code sent to your email.',
    };
  },

  /**
   * Resend signup verification OTP.
   */
  async resendSignupOtp(email: string): Promise<{ success: boolean; message?: string; error?: string }> {
    await delay(500);
    if (!email) {
      return { success: false, error: 'Email address missing.' };
    }
    return {
      success: true,
      message: `A fresh 6-digit verification code has been sent to ${email}.`,
    };
  },

  /**
   * Verify the 6-digit signup OTP.
   * Test code: '482916' (as shown in design) or any valid 6-digit code.
   * '000000' simulates an invalid code error.
   * '999999' simulates an expired code error.
   */
  async verifySignupOtp({ email, otp }: OtpVerificationPayload): Promise<AuthResponse<CustomerUser>> {
    await delay(700);

    if (otp.length !== 6) {
      return { success: false, error: 'Please enter the complete 6-digit code.' };
    }

    if (otp === '000000') {
      return { success: false, error: 'Invalid verification code. Please check your email and try again.' };
    }

    if (otp === '999999') {
      return { success: false, error: 'This verification code has expired. Please request a new code.' };
    }

    const pendingRaw = localStorage.getItem(STORAGE_KEYS.PENDING_SIGNUP);
    let customer: CustomerUser;

    if (pendingRaw) {
      customer = JSON.parse(pendingRaw);
      customer.isEmailVerified = true;
    } else {
      customer = {
        id: `usr-${Date.now()}`,
        fullName: 'Oliveal Gamer',
        email: email.toLowerCase(),
        role: 'customer',
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
      };
    }

    localStorage.removeItem(STORAGE_KEYS.PENDING_SIGNUP);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(customer));

    return {
      success: true,
      user: customer,
      token: `mock-jwt-customer-${Date.now()}`,
      message: 'Email verified successfully! Welcome to Oliveal Gaming Zone.',
    };
  },

  /**
   * Customer Login via email and password.
   */
  async loginCustomer(payload: LoginPayload): Promise<AuthResponse<CustomerUser>> {
    await delay(700);

    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!email || !password) {
      return { success: false, error: 'Please provide both email and password.' };
    }

    if (email === 'invalid@oliveal.com' || password === 'wrongpass') {
      return { success: false, error: 'Invalid email or password. Please try again.' };
    }

    const user: CustomerUser = {
      id: 'usr-customer-101',
      fullName: email.split('@')[0].toUpperCase(),
      email: email,
      role: 'customer',
      isEmailVerified: true,
      createdAt: new Date().toISOString(),
    };

    if (payload.rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, email);
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));

    return {
      success: true,
      user,
      token: `mock-jwt-customer-${Date.now()}`,
    };
  },

  /**
   * Customer Google OAuth Simulation.
   * Directly authenticates and skips OTP as per specification.
   */
  async loginWithGoogle(): Promise<AuthResponse<CustomerUser>> {
    await delay(1000);

    const user: CustomerUser = {
      id: 'usr-google-202',
      fullName: 'Alex Vance',
      email: 'alex.gamer@gmail.com',
      role: 'customer',
      isEmailVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));

    return {
      success: true,
      user,
      token: `mock-jwt-google-${Date.now()}`,
    };
  },

  /**
   * Admin Login via email and password only.
   * Strictly NO Google OAuth, NO signup, NO role creation.
   */
  async loginAdmin(payload: LoginPayload): Promise<AuthResponse<AdminUser>> {
    await delay(800);

    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!email || !password) {
      return { success: false, error: 'Admin email and password are required.' };
    }

    // Check admin qualification
    const isAdminDomain = email.endsWith('@oliveal.com') || email.includes('admin');
    if (!isAdminDomain) {
      return {
        success: false,
        error: 'Access denied. Only authorized Oliveal Gaming Zone administrators can log in here.',
      };
    }

    if (password.length < 6 || password === 'wrongpass') {
      return { success: false, error: 'Invalid admin credentials.' };
    }

    const adminUser: AdminUser = {
      id: 'adm-ops-001',
      fullName: 'Operations Desk Lead',
      email: email,
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(adminUser));

    return {
      success: true,
      user: adminUser,
      token: `mock-jwt-admin-${Date.now()}`,
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

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
};

