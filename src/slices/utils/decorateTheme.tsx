
// TODO remove any's

import { DeepPartial } from '../../utils/types'

export type ThemeType = any

export const decorateTheme = (theme:DeepPartial<ThemeType>):ThemeType => {
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
    layout: {
      ...theme.layout,
      navHeightMobile: '6.4rem',
    },
    border: {
      ...theme.border,
      radiusLarge: "3rem"
    },
    buttons: {
      ...theme.buttons,
      sizes: {
        ...theme.buttons?.sizes,
        default: {
          ...theme.buttons?.sizes?.default,
          width: "16.4rem"
        }
      }
    }
  }
}

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
