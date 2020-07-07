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
  h1,
  .ot-font-size-h1 {
    font-size: ${theme.fonts.headings.sizes.h1};
  }
  h2,
  .ot-font-size-h2 {
    font-size: ${theme.fonts.headings.sizes.h2};
  }
  h3,
  .ot-font-size-h3 {
    font-size: ${theme.fonts.headings.sizes.h3};
  }
  h4,
  .ot-font-size-h4 {
    font-size: ${theme.fonts.headings.sizes.h4};
  }
  h5,
  .ot-font-size-h5 {
    font-size: ${theme.fonts.headings.sizes.h5};
  }
  h6,
  .ot-font-size-h6 {
    font-size: ${theme.fonts.headings.sizes.h6};
  }
  a {
    cursor: pointer;
    text-decoration: ${theme.links.textDecoration};
    color: ${theme.links.color};
    &:hover {
      color: ${theme.links.hover.color};
    }
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

  .ot-line-height {
    line-height: ${theme.text.lineHeight};
  }
  .ot-bold {
    font-weight: ${theme.text.bold};
  }

  .ot-color-primary {
    color: ${theme.colors.primary};
  }
  .ot-color-secondary {
    color: ${theme.colors.secondary};
  }
  .ot-color-alert {
    color: ${theme.colors.alert};
  }
  .ot-color-error {
    color: ${theme.colors.error};
  }
  .ot-color-success {
    color: ${theme.colors.success};
  }
  .ot-color-light {
    color: ${theme.colors.light};
  }
  .ot-color-link {
    color: ${theme.colors.link};
  }

  .ot-bg-color-primary {
    background-color: ${theme.bgColors.primary};
  }
  .ot-bg-color-secondary {
    background-color: ${theme.bgColors.secondary};
  }
  .ot-bg-color-alert {
    background-color: ${theme.bgColors.alert};
  }
  .ot-bg-color-error {
    background-color: ${theme.bgColors.error};
  }
  .ot-bg-color-success {
    background-color: ${theme.bgColors.success};
  }

  .ot-warning {
    color: ${theme.colors.light};
    background-color: ${theme.colors.error};
  }
  .ot-success {
    color: ${theme.colors.light};
    background-color: ${theme.colors.success};
  }
  .ot-dark {
    color: ${theme.colors.light};
    background-color: ${theme.colors.success};
  }
  .ot-highlight {
    color: ${theme.colors.light};
    background-color: ${theme.colors.link};
  }

  .ot-opacity-light {
    background-color: ${theme.opacity.light};
  }
  .ot-opacity-dark {
    background-color: ${theme.opacity.dark};
  }
  .ot-opacity-alert {
    background-color: ${theme.opacity.alert};
  }

  .ot-box-shadow {
    box-shadow: ${theme.boxShadow.outer};
  }
  .ot-box-shadow-inset {
    box-shadow: ${theme.boxShadow.inset};
  }

  .ot-font-size-x-small {
    font-size: ${theme.fontSizes.xSmall};
  }
  .ot-font-size-small {
    font-size: ${theme.fontSizes.small};
  }
  .ot-font-size {
    font-size: ${theme.fontSizes.main};
  }
  .ot-font-size-big {
    font-size: ${theme.fontSizes.big};
  }
  .ot-font-size-x-big {
    font-size: ${theme.fontSizes.xBig};
  }
`

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
))

export default GlobalStyles
