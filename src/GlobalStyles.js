import React from 'react'
import { css, Global } from '@emotion/core'
import { withTheme } from 'emotion-theming'

// https://stackoverflow.com/questions/51637950/enable-global-theming-with-emotion

const makeGlobalStyles = (theme) => css`
  body {
    font-family: ${theme.fonts.body.fontFamily};
    font-weight: ${theme.fonts.body.fontWeight};
    letter-spacing: ${theme.fonts.body.letterSpacing};
    color: ${theme.fonts.body.color};
    font-size: ${theme.fontSizes.main};
    background-color: ${theme.bgColors.primary};
  }
  header {
    background-color: ${theme.header.bgColor};
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
    transition: ${theme.transition};
    color: ${theme.links.primary.color};
    &:hover,
    &:active,
    &:focus {
      color: ${theme.links.primary.hover};
    }
  }
  a.ot-link-light {
    color: ${theme.links.light.color};
    &:hover,
    &:active,
    &:focus,
    &.active {
      color: ${theme.links.light.hover};
    }
  }
  a.ot-link-dark {
    color: ${theme.links.dark.color};
    &:hover,
    &:active,
    &:focus,
    &.active {
      color: ${theme.links.dark.hover};
    }
  }

  .ot-preface {
    text-transform: ${theme.preface.textTransform};
    letter-spacing: ${theme.preface.letterSpacing};
    color: ${theme.colors.secondary};
    font-size: ${theme.fontSizes.small};
  }
  .ot-dark .ot-preface {
    color: ${theme.colors.light};
  }
  .ot-title {
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.headings.sizes.h1};
  }
  .ot-subtitle {
    color: ${theme.colors.secondary};
    line-height: ${theme.text.lineHeight};
  }

  .ot-line-height {
    line-height: ${theme.text.lineHeight};
  }
  .ot-bold {
    font-weight: ${theme.text.bold};
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
  .ot-bg-color-dark {
    background-color: ${theme.bgColors.dark};
  }

  .ot-warning {
    color: ${theme.colors.light};
    background-color: ${theme.colors.error};
    border-color: ${theme.colors.light};
  }
  .ot-success {
    color: ${theme.colors.light};
    background-color: ${theme.colors.success};
  }
  .ot-dark {
    color: ${theme.colors.light};
    background-color: ${theme.colors.primary};
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

  .ot-border-color {
    border-color: ${theme.border.color};
  }
  .ot-border {
    border: ${theme.border.width} solid ${theme.border.color};
  }
  .ot-border-radius {
    border-radius: ${theme.border.radius};
  }
  .ot-border-radius-small {
    border-radius: ${theme.border.radiusSmall};
  }

  button {
    font-family: ${theme.fonts.body.fontFamily};
    font-weight: ${theme.fonts.body.fontWeight};
    transition: ${theme.transition};
  }

  button:disabled {
    opacity: 0.5;
  }

  .ot-btn-link {
    font-size: inherit;
    color: ${theme.links.primary.color};
    &:hover,
    &:active,
    &:focus {
      color: ${theme.links.primary.hover};
    }
    &:disabled {
      color: ${theme.links.primary.color};
      opacity: 0.5;
    }
  }

  .ot-btn {
    display: inline-block;
    line-height: 1;
    margin: 0;
    text-align: center;
    font-size: ${theme.fontSizes.main};
    padding: ${theme.buttons.primary.padding};
    border-width: ${theme.buttons.primary.borderWidth};
    border-radius: ${theme.buttons.primary.borderRadius};
    color: ${theme.buttons.primary.initial.color};
    background-color: ${theme.buttons.primary.initial.bgColor};
    border-color: ${theme.buttons.primary.initial.borderColor};

    &:hover,
    &:active,
    &:focus {
      border-width: ${theme.buttons.primary.borderWidth};
      color: ${theme.buttons.primary.hover.color};
      background-color: ${theme.buttons.primary.hover.bgColor};
      border-color: ${theme.buttons.primary.hover.borderColor};
    }

    &:disabled {
      color: ${theme.buttons.primary.initial.color};
      background-color: ${theme.buttons.primary.initial.bgColor};
      border-color: ${theme.buttons.primary.initial.borderColor};
    }
  }

  .ot-btn--secondary {
    color: ${theme.buttons.secondary.initial.color};
    background-color: ${theme.buttons.secondary.initial.bgColor};
    border-color: ${theme.buttons.secondary.initial.borderColor};

    &:hover,
    &:active,
    &:focus {
      border-width: ${theme.buttons.secondary.borderWidth};
      color: ${theme.buttons.secondary.hover.color};
      background-color: ${theme.buttons.secondary.hover.bgColor};
      border-color: ${theme.buttons.secondary.hover.borderColor};
    }

    &:disabled {
      color: ${theme.buttons.secondary.initial.color};
      background-color: ${theme.buttons.secondary.initial.bgColor};
      border-color: ${theme.buttons.secondary.initial.borderColor};
    }
  }

  .ot-btn--light {
    color: ${theme.colors.primary};
    background-color: ${theme.bgColors.primary};
    border-color: ${theme.border.color};

    &:hover,
    &:active,
    &:focus {
      color: ${theme.colors.primary};
      background-color: ${theme.bgColors.secondary};
      border-color: ${theme.bgColors.secondary};
    }

    &:disabled {
      color: ${theme.colors.primary};
      background-color: ${theme.bgColors.primary};
      border-color: ${theme.bgColors.primary};
    }
  }

  .ot-btn--cancel {
    color: ${theme.colors.light};
    background-color: ${theme.colors.error};
    border-color: ${theme.colors.error};

    &:hover,
    &:active,
    &:focus {
      color: ${theme.colors.light};
      background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }

    &:disabled {
      color: ${theme.colors.light};
      background-color: ${theme.colors.error};
      border-color: ${theme.colors.error};
    }
  }

  .ot-btn--highlight {
    color: ${theme.colors.light};
    background-color: ${theme.colors.link};
    border-color: ${theme.colors.link};

    &:hover,
    &:active,
    &:focus {
      color: ${theme.colors.light};
      background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }

    &:disabled {
      color: ${theme.colors.light};
      background-color: ${theme.colors.link};
      border-color: ${theme.colors.link};
    }
  }

  .ot-btn--big {
    font-size: ${theme.fontSizes.big};
  }

  .ot-btn--small {
    font-size: ${theme.fontSizes.small};
  }

  .ot-btn--header {
    font-size: ${theme.fontSizes.small};
    padding: ${theme.buttons.header.padding};
    border-width: ${theme.buttons.header.borderWidth};
    border-radius: ${theme.buttons.header.borderRadius};
  }

  span.required {
    color: ${theme.colors.alert};
    padding-left: 0.5rem;
  }

  input,
  textarea,
  select {
    line-height: ${theme.inputs.lineHeight};
    padding: ${theme.inputs.padding};
    border-radius: ${theme.border.radiusSmall};
    font-family: ${theme.fonts.body.fontFamily};
    font-size: ${theme.fontSizes.main};
    color: ${theme.fonts.body.color};
    background-color: ${theme.bgColors.secondary};
    border: ${theme.border.width} solid ${theme.bgColors.secondary};
    transition: ${theme.transition};

    &::placeholder {
      color: ${theme.fonts.body.color};
      opacity: 0.5;
    }

    &::selection {
      color: ${theme.bgColors.primary};
      background-color: ${theme.fonts.body.color};
    }

    &:active,
    &:focus {
      color: ${theme.fonts.body.color};
      background-color: ${theme.bgColors.primary};
      border: ${theme.border.width} solid ${theme.border.color};
    }

    &:disabled,
    &:read-only {
      cursor: default;
      opacity: 0.5;
      color: ${theme.fonts.body.color};
      background-color: ${theme.bgColors.secondary};
      border: ${theme.border.width} solid ${theme.border.color};
    }
  }

  input[type='submit'] {
    border: ${theme.buttons.primary.borderWidth};

    &:active,
    &:focus {
      border: ${theme.buttons.primary.borderWidth};
    }
  }

  input,
  textarea {
    box-shadow: ${theme.inputs.boxShadow};

    &:active,
    &:focus {
      box-shadow: ${theme.inputs.boxShadow};
    }
  }

  .ot-input-quantity {
    color: ${theme.buttons.primary.initial.color};
    background-color: ${theme.buttons.primary.initial.bgColor};
    border-color: ${theme.buttons.primary.initial.borderColor};

    &:active,
    &:focus,
    &:disabled,
    &:read-only {
      color: ${theme.buttons.primary.initial.color};
      background-color: ${theme.buttons.primary.initial.bgColor};
      border-color: ${theme.buttons.primary.initial.borderColor};
    }
  }

  .ot-form-error {
    outline: 0;
    display: inline-block;
    width: 100%;
    line-height: ${theme.inputs.lineHeight};
    padding: ${theme.inputs.padding};
    margin: ${theme.inputs.padding} 0 0;
    border-radius: ${theme.border.radiusSmall};
    color: ${theme.colors.error};
    background-color: ${theme.bgColors.error};
  }

  span.checkbox__custom {
    background-color: ${theme.bgColors.secondary};
  }

  span.checkbox__custom:before {
    color: ${theme.colors.primary};
  }

  span.switch__toggle {
    background-color: ${theme.bgColors.secondary};
  }

  span.switch__toggle:before {
    background-color: ${theme.bgColors.primary};
  }

  input.switch__input:checked + span.switch__toggle {
    background-color: ${theme.colors.link};
  }

  span.radio__custom {
    background-color: ${theme.bgColors.primary};
    border-color: ${theme.border.color};
  }

  input.radio__input:checked + span.radio__custom {
    border-color: ${theme.colors.primary};
  }

  input.radio__input:checked + span.radio__custom:before {
    background-color: ${theme.colors.primary};
  }

  .react-datepicker__navigation--previous {
    border-right-color: ${theme.colors.link};
  }
  .react-datepicker__navigation--next {
    border-left-color: ${theme.colors.link};
  }
  .react-datepicker__time-container {
    border-left-color: ${theme.border.color};
  }
  .react-datepicker__day,
  .react-datepicker__time-list-item {
    color: ${theme.colors.link};
  }
  .react-datepicker__day--selected,
  .react-datepicker__day:hover,
  .react-datepicker__day:active,
  .react-datepicker__day:focus,
  .react-datepicker__time-list-item--selected,
  .react-datepicker__time-list-item:hover,
  .react-datepicker__time-list-item:active,
  .react-datepicker__time-list-item:focus {
    color: ${theme.colors.light};
    background-color: ${theme.colors.link};
  }

  .react-datepicker__day--today {
    background-color: ${theme.bgColors.secondary};
  }
  .react-datepicker__day--disabled,
  .react-datepicker__time-list-item--disabled {
    color: ${theme.colors.secondary};
  }

  .circle-loader {
    border-color: ${theme.border.color};
    border-left-color: ${theme.colors.link};
  }
  .load-complete {
    border-color: ${theme.colors.link};
    background-color: ${theme.colors.link};
  }

  .clear-input {
    border-color: ${theme.colors.link};
    &:before,
    &:after {
      background-color: ${theme.colors.link};
    }
    &:hover {
      border-color: ${theme.colors.primary};
      &:before,
      &:after {
        background-color: ${theme.colors.primary};
      }
    }
  }
`

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
))

export default GlobalStyles
