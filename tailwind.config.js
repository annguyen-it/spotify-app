const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: false,
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{js,ts,html}'
    ]
  },
  theme: {
    fontFamily: false,
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      'main-gray': 'rgb(179, 179, 179)',
      white: '#ffffff',
      black: '#000000',
      green: colors.green,
      blue: colors.blue,
    },
    extend: {
      height: {
        'vh-10': '10vh',
        'vh-20': '20vh',
        'vh-30': '30vh',
        'vh-40': '40vh',
        'vh-50': '50vh',
        'vh-60': '60vh',
        'vh-70': '70vh',
        'vh-80': '80vh',
        'vh-90': '90vh',
      },
      fontSize: {
        'base-sm': 'calc(1rem - 1px)',
        'base-lg': 'calc(1rem + 1px)',
      },
    }
  },
  extend: {
    transform: ['hover']
  },
  variants: {},
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
