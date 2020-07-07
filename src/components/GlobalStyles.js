import React from 'react'
// import styled from '@emotion/styled'
import { css, Global } from '@emotion/core'
import { withTheme } from 'emotion-theming'

const makeGlobalStyles = (theme) => css`
  body {
    font-size: ${theme.fontSizes.main};
    background-color: ${theme.bgColors.primary};
    font-family: ${theme.fonts.body.fontFamily};
    font-weight: ${theme.fonts.body.fontWeight};
    letter-spacing: ${theme.fonts.body.letterSpacing};
    color: ${theme.fonts.body.color};
  }
  header {
    background-color: ${theme.bgColors.primary};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .ot-heading {
    font-family: ${theme.fonts.headings.fontFamily};
    font-weight: ${theme.fonts.headings.fontWeight};
    letter-spacing: ${theme.fonts.headings.letterSpacing};
    color: ${theme.fonts.headings.color};
  }
  h1 {
    font-size: ${theme.fonts.headings.sizes.h1};
  }
  h2 {
    font-size: ${theme.fonts.headings.sizes.h2};
  }
  h3 {
    font-size: ${theme.fonts.headings.sizes.h3};
  }
  h4 {
    font-size: ${theme.fonts.headings.sizes.h4};
  }
  h5 {
    font-size: ${theme.fonts.headings.sizes.h5};
  }
  h6 {
    font-size: ${theme.fonts.headings.sizes.h6};
  }
  a {
    cursor: pointer;
    text-decoration: ${theme.links.textDecoration};
    color: ${theme.links.color};
    &:hover {
      color: ${theme.links.hoverColor};
    }
  }
  .ot-bg-color-primary {
    background-color: ${theme.bgColors.primary};
  }
  .ot-bg-color-secondary {
    background-color: ${theme.bgColors.secondary};
  }
  .ot-preface {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${theme.colors.secondary};
    font-size: ${theme.fontSizes.small};
  }
  .ot-subtitle {
    color: ${theme.colors.secondary};
  }
`

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
))

export default GlobalStyles
