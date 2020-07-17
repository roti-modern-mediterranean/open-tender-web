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
        h1: '3.2rem',
        h2: '2.8rem',
        h3: '2.4rem',
        h4: '2.0rem',
        h5: '1.8rem',
        h6: '1.6rem',
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
    letterSpacing: '0.1rem',
  },
  links: {
    textDecoration: 'none',
    primary: {
      color: colorLink,
      hover: colorLinkHover,
    },
    light: {
      color: colorLight,
      // hover: '#aaaaaa',
      hover: colorLink,
    },
    dark: {
      color: colorPrimary,
      hover: colorLink,
    },
  },
  opacity: {
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(0, 0, 0, 0.6)',
    alert: 'rgba(239, 35, 60, 0.75)',
  },
  boxShadow: {
    // outer: '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    outer: 'none',
    // outer: '0 1px 2px -1px rgba(0, 0, 0, 0.2)',
    inset: 'inset 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    // inset: 'none',
  },
  border: {
    color: '#edf0f6',
    // color: '#e8e9eb',
    width: '0.1rem',
    radius: '0',
    radiusSmall: '0',
  },
  favorite: {
    size: '2.8rem',
    iconSize: '1.4rem',
  },
  buttons: {
    sizes: {
      main: {
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
    colors: {
      primary: {
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
    },
  },
  inputs: {
    lineHeight: '1.2',
    padding: '1.2rem 1.4rem',
    boxShadow: 'none',
  },
}

export default themeConfig
