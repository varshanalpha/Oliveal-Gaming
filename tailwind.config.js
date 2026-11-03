/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#080711',
        foreground: '#f8fafc',
        card: {
          DEFAULT: '#0f0e1f',
          foreground: '#f8fafc',
          border: 'rgba(168, 85, 247, 0.15)',
        },
        primary: {
          DEFAULT: '#9333ea',
          hover: '#a855f7',
          active: '#7e22ce',
          foreground: '#ffffff',
        },
        accent: {
          purple: '#a855f7',
          violet: '#8b5cf6',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          fuchsia: '#d946ef',
          emerald: '#10b981',
        },
        muted: {
          DEFAULT: '#1e1c33',
          foreground: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 25px -4px rgba(168, 85, 247, 0.45)',
        'neon-purple-lg': '0 0 45px -8px rgba(168, 85, 247, 0.55)',
        'neon-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.45)',
        'neon-border': '0 0 15px rgba(147, 51, 234, 0.35)',
        'inner-glow': 'inset 0 0 20px rgba(168, 85, 247, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 28px rgba(168, 85, 247, 0.7))' },
        },
      },
    },
  },
  plugins: [],
};
