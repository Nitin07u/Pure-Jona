/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#F8F6F0',
          200: '#F0ECE1',
          300: '#E5DDCF',
          400: '#D9CDBB',
        },
        parchment: '#F2EDE2',
        botanical: {
          light: '#667A5C', // Natural Sage
          DEFAULT: '#18351F', // Deep Forest Green
          dark: '#0F2314',
          deep: '#09150C',
        },
        sage: {
          light: '#829579',
          DEFAULT: '#667A5C', // Natural Sage
          dark: '#4F6146',
        },
        earth: {
          light: '#8E633C',
          DEFAULT: '#6E4A2D',
          dark: '#4E331D',
        },
        charcoal: {
          light: '#3C423B',
          DEFAULT: '#20241F', // Deep Charcoal
          dark: '#141713',
        },
        beige: {
          DEFAULT: '#E5DDCF',
          muted: '#D7CCBA',
        },
        gold: {
          light: '#D4B87C',
          DEFAULT: '#B99A5A', // Soft Warm Gold
          dark: '#977A3F',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        logo: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        luxury: '0.2em',
        widest: '0.15em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(27, 36, 30, 0.07)',
        'luxury-lg': '0 30px 60px -20px rgba(27, 36, 30, 0.12)',
        'inner-subtle': 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slow-zoom': 'slowZoom 20s ease-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      }
    },
  },
  plugins: [],
}
