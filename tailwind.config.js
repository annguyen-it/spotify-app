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
    },
    fontSize: {
      // base
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      // custom
      'base-sm': 'calc(1rem - 1px)',
      'base-lg': 'calc(1rem + 1px)',
    },
  },
  extend: {
    transitionProperty: {
      height: 'height',
    },
  },
  variants: {},
  plugin: []
}
