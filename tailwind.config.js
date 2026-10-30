/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#09121B',
          900: '#0D1A25',
          850: '#112231',
          800: '#162B3D',
          700: '#1E3A50',
          600: '#2B4B62',
          500: '#4A6679',
          400: '#7C93A3',
          300: '#A9BBC5',
          200: '#CFDBE1',
          100: '#E6EEF0',
          50: '#F4F8F9',
        },
        ember: {
          500: '#A41D03',
          400: '#C4290A',
          300: '#E8452A',
          200: '#F5907A',
          100: '#FBD3C9',
        },
        teal: {
          500: '#5B8987',
          400: '#74A5A2',
          300: '#95BEBB',
          200: '#BCD9D7',
          100: '#E0EFEE',
          600: '#466C6A',
        },
        success: { 500: '#4FB286', 100: '#DDF3E8' },
        warning: { 500: '#D9A441', 100: '#FAF0DA' },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 0 1px rgba(116,165,162,0.35), 0 0 24px -4px rgba(116,165,162,0.45)',
        'glow-ember': '0 0 0 1px rgba(232,69,42,0.45), 0 0 28px -4px rgba(232,69,42,0.55)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-10px,0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        drift: 'drift 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
