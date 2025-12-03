module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#a78bfa',
        'accent-light': '#c4b5fd',
        'accent-dark': '#8b5cf6'
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards'
      }
    }
  },
  plugins: []
}
