/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        'whiskey-dark': '#191815',
        'whiskey-dark-lighter': '#252420',
        'whiskey-light': '#F8F6F0',
        'whiskey-gold': '#D4A547',
        'whiskey-amber': '#E6A23C',
        'whiskey-caramel': '#C87533',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      spacing: {
        '128': '32rem',
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        'grain-texture': "url('https://images.pexels.com/photos/7794435/pexels-photo-7794435.jpeg?auto=compress&cs=tinysrgb&w=1600&h=750&dpr=1')",
      },
    },
  },
  plugins: [],
};