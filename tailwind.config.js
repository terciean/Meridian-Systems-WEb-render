/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#F7FAFD',
          900: '#FFFFFF',
          850: '#F1F3F5',
          800: '#E8EDF1',
          700: '#C8CED5',
          600: '#A2AFBB',
          500: '#627181',
          400: '#546474',
          300: '#455462',
          200: '#34404B',
          100: '#242B33',
          50: '#171B20',
        },
        teal: {
          600: '#2F4A5E',
          500: '#507289',
          400: '#507289',
          300: '#3D5A70',
          200: '#304D62',
          100: '#243E50',
        },
        ember: {
          500: '#B94A44',
          400: '#9C3934',
          300: '#9C3934',
          200: '#88352F',
          100: '#752F2B',
        },
        success: { 500: '#287652', 100: '#236244' },
        warning: { 500: '#77531B', 100: '#674610' },
      },
      fontFamily: {
        display: ['Barlow Condensed', 'Arial Narrow', 'system-ui', 'sans-serif'],
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 8px 24px -12px rgba(36, 62, 80, 0.28)',
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
