/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Using CSS variables for dynamic theming
        background: 'var(--bg-page)', // Mapped to new background variable
        primary: {
          DEFAULT: 'var(--brand-primary)',
          foreground: 'var(--brand-text)',
        },
        secondary: {
          DEFAULT: 'var(--brand-hover)', // Using hover/secondary purple
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: 'var(--mauve-magic)', // Using mauve as accent
        },
        // Semantic Colors
        surface: {
          primary: 'var(--bg-surface)',
          secondary: 'var(--bg-surface-2)',
          tertiary: 'var(--neutral-200)', // Fallback/tertiary
          border: 'var(--border-subtle)',
        },
        text: {
          primary: 'var(--text-main)',
          secondary: 'var(--text-body)',
          tertiary: 'var(--text-muted)',
        },
        // State Colors
        info: 'var(--clr-info)',
        success: 'var(--clr-success)',
        warning: 'var(--clr-warning)',
        error: 'var(--clr-error)',
      },
      fontFamily: {
        display: ['Neue Haas Grotesk', 'Outfit', 'sans-serif'],
        body: ['Inter', 'Nunito Sans', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slideUp': 'slideUp 0.5s ease-out',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'scaleIn': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(104, 24, 165, 0.3)' }, /* Updated to purple glow */
          '100%': { boxShadow: '0 0 40px rgba(104, 24, 165, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
