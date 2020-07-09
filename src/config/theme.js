const colorPrimary = '#000000'
const colorSecondary = '#666666'
const colorLight = '#ffffff'
const colorLink = '#5a5aff'
const colorLinkHover = '#1ae2de'
const colorError = '#ef233c'

const bgColorPrimary = '#ffffff'
const bgColorSecondary = '#f5f7fa'
const bgColorTertiary = '#e4e9f2'

const themeConfig = {
  transition: 'all 0.15s ease',
  text: {
    lineHeight: '1.4',
    bold: 'bold',
  },
  colors: {
    primary: colorPrimary,
    secondary: colorSecondary,
    alert: colorError,
    error: colorError,
    success: '#03A376',
    light: colorLight,
    link: colorLink,
  },
  bgColors: {
    primary: bgColorPrimary,
    secondary: bgColorSecondary,
    tertiary: bgColorTertiary,
    alert: '#fbdee3',
    error: '#fbdee3',
    success: '#e6fff3',
    dark: colorPrimary,
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
      // fontFamily: "'Heebo', sans-serif",
      fontWeight: 'normal',
      letterSpacing: '0',
      color: colorPrimary,
    },
    headings: {
      fontFamily: "'Roboto', sans-serif",
      // fontFamily: "'Heebo', sans-serif",
      fontWeight: '500',
      letterSpacing: '0',
      color: colorPrimary,
      sizes: {
        h1: '2.25em',
        h2: '2.0em',
        h3: '1.75em',
        h4: '1.5em',
        h5: '1.25em',
        h6: '1.1em',
      },
    },
  },
  header: {
    // bgColor: 'transparent',
    bgColor: bgColorPrimary,
    bgColorStuck: bgColorPrimary,
  },
  preface: {
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  links: {
    textDecoration: 'none',
    primary: {
      color: colorLink,
      hover: colorLinkHover,
    },
    light: {
      color: colorLight,
      hover: '#aaaaaa',
    },
    dark: {
      color: colorPrimary,
      hover: colorLink,
    },
  },
  opacity: {
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(0, 0, 0, 0.5)',
    alert: 'rgba(239, 35, 60, 0.75)',
  },
  boxShadow: {
    // outer: '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    outer: 'none',
    // outer: '0 1px 2px -1px rgba(0, 0, 0, 0.2)',
    inset: 'inset 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  },
  border: {
    // color: '#edf0f6',
    color: '#e8e9eb',
    width: '0.1rem',
    // radius: '1.0rem',
    // radiusSmall: '0.5rem',
    radius: '0',
    radiusSmall: '0',
  },
  buttons: {
    primary: {
      padding: '0.7em 1.5em',
      borderWidth: '0',
      borderRadius: '3em',
      initial: {
        color: colorLight,
        bgColor: colorPrimary,
        borderColor: colorPrimary,
      },
      hover: {
        color: colorLight,
        bgColor: colorLink,
        borderColor: colorLink,
      },
    },
    secondary: {
      initial: {
        color: colorPrimary,
        bgColor: bgColorPrimary,
        borderColor: bgColorPrimary,
      },
      hover: {
        color: colorPrimary,
        bgColor: bgColorSecondary,
        borderColor: bgColorSecondary,
      },
    },
    header: {
      padding: '0.7em 1.1em',
      borderWidth: '0',
      borderRadius: '0.5rem',
    },
  },
  inputs: {
    lineHeight: '1.2',
    padding: '0.9em',
    boxShadow: 'none',
  },
}

export default themeConfig
