const bodyColor = '#000000'
const secondaryColor = '#666666'
const linkColor = '#5a5aff'
const linkHoverColor = '#1ae2de'

const themeConfig = {
  text: {
    lineHeight: '1.4',
    bold: 'bold',
  },
  colors: {
    primary: bodyColor,
    secondary: secondaryColor,
    alert: '#ef233c',
    error: '#ef233c',
    success: '#03A376',
    light: '#ffffff',
    link: linkColor,
  },
  bgColors: {
    primary: '#fff',
    secondary: '#f5f7fa',
    alert: '#fbdee3',
    error: '#fbdee3',
    success: '#e6fff3',
  },
  opacity: {
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(0, 0, 0, 0.5)',
    alert: 'rgba(239, 35, 60, 0.75)',
  },
  boxShadow: {
    outer: '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    inset: 'inset 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  },
  fontSizes: {
    xSmall: '1.0rem',
    small: '1.2rem',
    main: '1.4rem',
    big: '1.6rem',
    xBig: '1.8rem',
  },
  fonts: {
    body: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 'normal',
      letterSpacing: '0',
      color: bodyColor,
    },
    headings: {
      fontFamily: "'Roboto Slab', serif",
      fontWeight: '700',
      letterSpacing: '0',
      color: bodyColor,
      sizes: {
        h1: '2.25em',
        h2: '1.75em',
        h3: '1.5em',
        h4: '1.25em',
        h5: '1.1em',
        h6: '1.0em',
      },
    },
  },
  links: {
    textDecoration: 'none',
    color: linkColor,
    hover: {
      color: linkHoverColor,
    },
  },
}

export default themeConfig
