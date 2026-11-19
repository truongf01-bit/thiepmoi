/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#EAE0D2',
          400: '#DDD0BF',
          500: '#C7B6A1',
        },
        vintage: {
          dark: '#2E221B',
          espresso: '#3D2C22',
          brown: '#5C4436',
          sepia: '#7A5E4D',
          muted: '#967D6E',
          border: '#E3D7C7',
          card: '#FDFCFA',
        },
        sage: {
          50: '#F3F6F2',
          100: '#E5ECE3',
          200: '#CCD9C9',
          300: '#AFC3AA',
          400: '#8FA88A',
          500: '#6C8666',
          600: '#546A4F',
          700: '#3E503A',
        },
        wax: {
          red: '#8A2534',
          seal: '#962A3B',
          gold: '#C59E3F',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        script: ['"Alex Brush"', 'cursive', 'serif'],
      },
      boxShadow: {
        'photobook': '0 20px 40px -15px rgba(61, 44, 34, 0.12), 0 0 0 1px rgba(227, 215, 199, 0.6)',
        'envelope': '0 25px 50px -12px rgba(61, 44, 34, 0.25)',
        'wax': '0 4px 12px rgba(138, 37, 52, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.25)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
