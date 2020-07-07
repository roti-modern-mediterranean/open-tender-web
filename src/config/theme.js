const bodyColor = '#000000'
const secondaryColor = '#666666'
const linkColor = '#5a5aff'

const themeConfig = {
  colors: {
    primary: bodyColor,
    secondary: secondaryColor,
  },
  bgColors: {
    primary: '#fff',
    secondary: '#f5f7fa',
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
    hoverColor: bodyColor,
  },
}

export default themeConfig
