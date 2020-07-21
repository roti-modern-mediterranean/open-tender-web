const colorPrimary = '#000000'
const colorSecondary = '#666666'
const colorLight = '#ffffff'
const colorLink = '#5a5aff'
const colorLinkHover = '#1ae2de'
const colorError = '#ef233c'

const bgColorPrimary = '#ffffff'
const bgColorSecondary = '#f5f7fa'

const themeConfig = {
  bgColors: {
    primary: bgColorPrimary,
    secondary: bgColorSecondary,
    alert: '#fbdee3',
    error: '#fbdee3',
    success: '#e6fff3',
    dark: colorPrimary,
  },
  boldWeight: '700',
  border: {
    color: '#edf0f6',
    width: '0.1rem',
    radius: '0',
    radiusSmall: '0',
  },
  boxShadow: {
    outer: 'none',
    inset: 'inset 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  },
  buttons: {
    colors: {
      primary: {
        color: colorLight,
        bgColor: colorPrimary,
        borderColor: colorPrimary,
      },
      primaryHover: {
        color: colorLight,
        bgColor: colorLink,
        borderColor: colorLink,
      },
      secondary: {
        color: colorPrimary,
        bgColor: bgColorPrimary,
        borderColor: bgColorPrimary,
      },
      secondaryHover: {
        color: colorPrimary,
        bgColor: bgColorSecondary,
        borderColor: bgColorSecondary,
      },
    },
    sizes: {
      default: {
        padding: '1.0rem 2.0rem',
        borderWidth: '0',
        borderRadius: '2.0rem',
      },
      small: {
        padding: '0.8rem 1.7rem',
        borderWidth: '0',
        borderRadius: '1.8rem',
      },
      big: {
        padding: '1.1rem 2.2rem',
        borderWidth: '0',
        borderRadius: '2.2rem',
      },
      header: {
        padding: '0.8rem 1.3rem',
        borderWidth: '0',
        borderRadius: '0.5rem',
      },
    },
  },
  colors: {
    primary: colorPrimary,
    secondary: colorSecondary,
    alert: colorError,
    error: colorError,
    success: '#03A376',
    light: colorLight,
  },
  favorite: {
    size: '2.8rem',
    iconSize: '1.4rem',
  },
  fonts: {
    body: {
      url:
        'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap',
      family: "'Roboto', sans-serif",
      weight: '400',
      letterSpacing: '0',
      textTransform: 'none',
      color: colorPrimary,
    },
    headings: {
      url:
        'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;1,500&display=swap',
      family: "'Roboto', sans-serif",
      weight: '500',
      letterSpacing: '0',
      textTransform: 'none',
      color: colorPrimary,
    },
    preface: {
      family: "'Roboto', sans-serif",
      weight: '400',
      letterSpacing: '0.1rem',
      textTransform: 'uppercase',
    },
    sizes: {
      xSmall: '1.0rem',
      small: '1.2rem',
      main: '1.4rem',
      big: '1.6rem',
      xBig: '1.8rem',
      h1: '3.2rem',
      h2: '2.8rem',
      h3: '2.4rem',
      h4: '2.0rem',
      h5: '1.8rem',
      h6: '1.6rem',
    },
  },
  header: {
    primary: bgColorPrimary,
    stuck: bgColorPrimary,
  },
  inputs: {
    lineHeight: '1.2',
    padding: '1.2rem 1.4rem',
    boxShadow: 'none',
  },
  lineHeight: '1.4',
  links: {
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    primary: {
      color: colorLink,
      hover: colorLinkHover,
    },
    light: {
      color: colorLight,
      hover: colorLink,
    },
    dark: {
      color: colorPrimary,
      hover: colorLink,
    },
  },
  overlay: {
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(0, 0, 0, 0.6)',
    alert: 'rgba(239, 35, 60, 0.75)',
  },
}

export default themeConfig
