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
      white: '#ffffff'
    }
  },
  extend: {
    transitionProperty: {
      height: 'height',
    },
  },
  variants: {},
  plugin: []
}
