import React from 'react'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/core'
import { withTheme } from 'emotion-theming'

const makeGlobalStyles = (theme) => css`
  body {
    font-size: ${theme.fontSizes.main};
    font-family: ${theme.fonts.body.fontFamily};
    font-weight: ${theme.fonts.body.fontWeight};
    letter-spacing: ${theme.fonts.body.letterSpacing};
    color: ${theme.colors.primary};
    background-color: ${theme.bgColors.primary};
  }
`

export const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
))

// export const AppDiv = styled.div`
//   font-size: ${(props) => props.theme.fontSizes.main};
//   font-family: ${(props) => props.theme.fonts.body.fontFamily};
//   font-weight: ${(props) => props.theme.fonts.body.fontWeight};
//   letter-spacing: ${(props) => props.theme.fonts.body.letterSpacing};
//   color: ${(props) => props.theme.colors.primary};
//   background-color: ${(props) => props.theme.bgColors.primary};
// `

export const Preface = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes.small};
`

export const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.secondary};
`
