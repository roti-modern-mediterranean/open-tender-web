export type ThemeType = {
  bgColors: {
    alert: string
    dark: string
    error: string
    light: string
    primary: string
    secondary: string
    success: string
    tertiary: string
    transparent: string
  }
  boldWeight: string
  border: {
    color: string
    radius: string
    radiusSmall: string
    width: string
    radiusLarge: string
  }
  boxShadow: {
    inset: string
    outer: string
  }
  breakpoints: {
    laptop: string
    mobile: string
    narrow: string
    tablet: string
  }
  buttons: {
    colors: {
      cart: {
        bgColor: string
        borderColor: string
        color: string
      }
      cartHover: {
        bgColor: string
        borderColor: string
        color: string
      }
      header: {
        bgColor: string
        borderColor: string
        color: string
      }
      headerHover: {
        bgColor: string
        borderColor: string
        color: string
      }
      primary: {
        bgColor: string
        borderColor: string
        color: string
      }
      primaryHover: {
        bgColor: string
        borderColor: string
        color: string
      }
      secondary: {
        bgColor: string
        borderColor: string
        color: string
      }
      secondaryHover: {
        bgColor: string
        borderColor: string
        color: string
      }
    }
    sizes: {
      big: {
        borderRadius: string
        borderWidth: string
        family: string
        fontSize: string
        fontSmoothing: string
        letterSpacing: string
        padding: string
        textTransform: string
        weight: string
      }
      default: {
        borderRadius: string
        borderWidth: string
        family: string
        fontSize: string
        fontSmoothing: string
        letterSpacing: string
        padding: string
        textTransform: string
        weight: string
        width: string
      }
      header: {
        borderRadius: string
        borderWidth: string
        family: string
        fontSize: string
        fontSmoothing: string
        letterSpacing: string
        padding: string
        textTransform: string
        weight: string
      }
      small: {
        borderRadius: string
        borderWidth: string
        family: string
        fontSize: string
        fontSmoothing: string
        letterSpacing: string
        padding: string
        textTransform: string
        weight: string
      }
    }
  }
  colors: {
    alert: string
    dark: string
    error: string
    light: string
    primary: string
    secondary: string
    success: string
    title: string
    pepper: string
    tahini: string
    paprika: string
    beet: string
    line: string
    cardHover: string
    navHover: string
    switch: string
    blue: string
  }
  counts: {
    alerts: {
      bgColor: string
      borderColor: string
      borderWidth: string
      color: string
      family: string
      fontSize: string
      fontSizeMobile: string
      fontSmoothing: string
      paddingBottom: string
      paddingTop: string
      weight: string
    }
    quantity: {
      family: string
      fontSize: string
      fontSizeMobile: string
      fontSmoothing: string
      paddingBottom: string
      paddingTop: string
      weight: string
    }
  }
  favorite: {
    iconSize: string
    size: string
  }
  fonts: {
    body: {
      color: string
      family: string
      fontSmoothing: string
      letterSpacing: string
      textTransform: string
      url: string
      weight: string
    }
    headings: {
      color: string
      family: string
      fontSmoothing: string
      letterSpacing: string
      textTransform: string
      url: string
      weight: string
    }
    preface: {
      family: string
      fontSize: string
      fontSmoothing: string
      letterSpacing: string
      textTransform: string
      weight: string
    }
    sizes: {
      big: string
      giga: string
      h1: string
      h2: string
      h3: string
      h4: string
      h5: string
      h6: string
      main: string
      mega: string
      small: string
      tera: string
      xBig: string
      xSmall: string
    }
    catering: {
      currentOrder: {
        title: {
          fontSize: string
          weight: string
          fontSizeMobile: string
          weightMobile: string
        }
      }
    }
  }
  header: {
    primary: string
    stuck: string
  }
  inputs: {
    bgColor: string
    bgColorFocus: string
    borderColor: string
    borderColorFocus: string
    borderWidth: string
    boxShadow: string
    color: string
    colorFocus: string
    family: string
    fontSize: string
    fontSmoothing: string
    letterSpacing: string
    lineHeight: string
    padding: string
    placeholderColor: string
    radius: string
    textTransform: string
    weight: string
    labelTextLeftMargin: string
  }
  layout: {
    containerMaxWidth: string
    margin: string
    marginMobile: string
    maxWidth: string
    navHeight: string
    navHeightMobile: string
    padding: string
    paddingMobile: string
    catering: {
      minHeight: string
      containerWidth: string
      containerBorderRadius: string
      containerPadding: string
      containerBgColor: string
      bgGradientMobile: string
    }
  }
  lineHeight: string
  links: {
    dark: {
      color: string
      hover: string
    }
    light: {
      color: string
      hover: string
    }
    primary: {
      color: string
      hover: string
    }
    textDecoration: string
    transition: string
  }
  overlay: {
    alert: string
    dark: string
    light: string
  }
  animations: {
    default: string
    fast: string
  }
}

// Considering theme parameter of ThemeType to avoid undesired complexity
export const decorateTheme = (theme: ThemeType): ThemeType => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      pepper: '#25272A',
      tahini: '#FBF8EA',
      paprika: '#E73C3E',
      beet: '#621C27',
      line: '#E3DFC9',
      cardHover: '#ADB8C6',
      navHover: '#F3EDD2',
      switch: '#979EA7',
      blue: '#36AFFC',
    },
    fonts: {
      ...theme.fonts,
      catering: {
        currentOrder: {
          title: {
            fontSize: '3rem',
            weight: '500',
            fontSizeMobile: '2.2rem',
            weightMobile: '500',
          },
        },
      },
    },
    inputs: {
      ...theme.inputs,
      labelTextLeftMargin: '3.4rem',
    },
    layout: {
      ...theme.layout,
      navHeightMobile: '6.4rem',
      catering: {
        minHeight: '53rem',
        containerWidth: '112rem',
        containerBorderRadius: '2.2rem',
        containerPadding: '4rem 4.5rem',
        containerBgColor: 'rgba(37, 39, 42, 0.6)',
        bgGradientMobile: `linear-gradient(
          0deg,
          rgba(37, 39, 42, 1) 30%,
          rgba(37, 39, 42, 0.9) 60%,
          rgba(37, 39, 42, 0.1) 100%
        )`,
      },
    },
    border: {
      ...theme.border,
      radiusLarge: '3rem',
    },
    buttons: {
      ...theme.buttons,
      sizes: {
        ...theme.buttons?.sizes,
        default: {
          ...theme.buttons?.sizes?.default,
          width: '16.4rem',
        },
      },
    },
    animations: {
      default: 'slide-up 0.25s ease-in-out 0.5s forwards',
      fast: 'slide-up 0.25s ease-in-out 0.5s forwards',
    },
  }
}

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
