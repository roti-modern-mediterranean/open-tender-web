import React from 'react'
import { css, Global } from '@emotion/core'
import { withTheme } from 'emotion-theming'

// https://stackoverflow.com/questions/51637950/enable-global-theming-with-emotion

const makeGlobalStyles = (theme) => css`
  body {
    font-family: ${theme.fonts.body.family};
    font-weight: ${theme.fonts.body.weight};
    letter-spacing: ${theme.fonts.body.letterSpacing};
    text-transform: ${theme.fonts.body.textTransform};
    -webkit-font-smoothing: ${theme.fonts.body.fontSmoothing};
    color: ${theme.fonts.body.color};
    font-size: ${theme.fonts.sizes.main};
    background-color: ${theme.bgColors.primary};
  }
  header {
    background-color: ${theme.header.primary};
    &.stuck {
      background-color: ${theme.header.stuck};
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .ot-heading {
    font-family: ${theme.fonts.headings.family};
    font-weight: ${theme.fonts.headings.weight};
    letter-spacing: ${theme.fonts.headings.letterSpacing};
    text-transform: ${theme.fonts.headings.textTransform};
    -webkit-font-smoothing: ${theme.fonts.headings.fontSmoothing};
    color: ${theme.fonts.headings.color};
  }
  h1,
  .ot-font-size-h1 {
    font-size: ${theme.fonts.sizes.h1};
  }
  h2,
  .ot-font-size-h2 {
    font-size: ${theme.fonts.sizes.h2};
  }
  h3,
  .ot-font-size-h3 {
    font-size: ${theme.fonts.sizes.h3};
  }
  h4,
  .ot-font-size-h4 {
    font-size: ${theme.fonts.sizes.h4};
  }
  h5,
  .ot-font-size-h5 {
    font-size: ${theme.fonts.sizes.h5};
  }
  h6,
  .ot-font-size-h6 {
    font-size: ${theme.fonts.sizes.h6};
  }

  a {
    cursor: pointer;
    text-decoration: ${theme.links.textDecoration};
    transition: ${theme.links.transition};
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
    font-family: ${theme.fonts.preface.family};
    font-weight: ${theme.fonts.preface.weight};
    letter-spacing: ${theme.fonts.preface.letterSpacing};
    text-transform: ${theme.fonts.preface.textTransform};
    -webkit-font-smoothing: ${theme.fonts.preface.fontSmoothing};
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes.small};
  }
  .ot-dark .ot-preface {
    color: ${theme.colors.light};
  }
  .ot-title {
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.sizes.h1};
  }
  .ot-subtitle {
    color: ${theme.colors.secondary};
    line-height: ${theme.lineHeight};
  }

  .ot-line-height {
    line-height: ${theme.lineHeight};
  }
  .ot-bold {
    font-weight: ${theme.boldWeight};
  }

  .ot-font-size-x-small {
    font-size: ${theme.fonts.sizes.xSmall};
  }
  .ot-font-size-small {
    font-size: ${theme.fonts.sizes.small};
  }
  .ot-font-size {
    font-size: ${theme.fonts.sizes.main};
  }
  .ot-font-size-big {
    font-size: ${theme.fonts.sizes.big};
  }
  .ot-font-size-x-big {
    font-size: ${theme.fonts.sizes.xBig};
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
    color: ${theme.links.primary.color};
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
    background-color: ${theme.links.primary.color};
  }

  .ot-opacity-light {
    background-color: ${theme.overlay.light};
  }
  .ot-opacity-dark {
    background-color: ${theme.overlay.dark};
  }
  .ot-opacity-alert {
    background-color: ${theme.overlay.alert};
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
    font-family: ${theme.fonts.body.family};
    font-weight: ${theme.fonts.body.weight};
    transition: ${theme.links.transition};
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

  .ot-btn-link-subtle {
    font-size: inherit;
    color: ${theme.colors.primary};
    &:hover,
    &:active,
    &:focus {
      color: ${theme.colors.primary};
    }
    &:disabled {
      color: ${theme.colors.primary};
      opacity: 0.5;
    }
  }

  .ot-btn {
    display: inline-block;
    line-height: 1;
    margin: 0;
    text-align: center;
    font-size: ${theme.fonts.sizes.main};
    padding: ${theme.buttons.sizes.default.padding};
    border-width: ${theme.buttons.sizes.default.borderWidth};
    border-radius: ${theme.buttons.sizes.default.borderRadius};
    color: ${theme.buttons.colors.primary.color};
    background-color: ${theme.buttons.colors.primary.bgColor};
    border-color: ${theme.buttons.colors.primary.borderColor};

    &:hover,
    &:active,
    &:focus {
      border-width: ${theme.buttons.sizes.default.borderWidth};
      color: ${theme.buttons.colors.primaryHover.color};
      background-color: ${theme.buttons.colors.primaryHover.bgColor};
      border-color: ${theme.buttons.colors.primaryHover.borderColor};
    }

    &:disabled {
      color: ${theme.buttons.colors.primary.color};
      background-color: ${theme.buttons.colors.primary.bgColor};
      border-color: ${theme.buttons.colors.primary.borderColor};
    }
  }

  .ot-btn--small {
    font-size: ${theme.fonts.sizes.small};
    padding: ${theme.buttons.sizes.small.padding};
    border-width: ${theme.buttons.sizes.small.borderWidth};
    border-radius: ${theme.buttons.sizes.small.borderRadius};

    &:hover,
    &:active,
    &:focus {
      border-width: ${theme.buttons.sizes.small.borderWidth};
    }
  }

  .ot-btn--big {
    font-size: ${theme.fonts.sizes.big};
    padding: ${theme.buttons.sizes.big.padding};
    border-width: ${theme.buttons.sizes.big.borderWidth};
    border-radius: ${theme.buttons.sizes.big.borderRadius};

    &:hover,
    &:active,
    &:focus {
      border-width: ${theme.buttons.sizes.big.borderWidth};
    }
  }

  .ot-btn--header {
    font-size: ${theme.fonts.sizes.small};
    padding: ${theme.buttons.sizes.header.padding};
    border-width: ${theme.buttons.sizes.header.borderWidth};
    border-radius: ${theme.buttons.sizes.header.borderRadius};

    &:hover,
    &:active,
    &:focus {
      border-width: ${theme.buttons.sizes.header.borderWidth};
    }
  }

  .ot-btn--secondary {
    color: ${theme.buttons.colors.secondary.color};
    background-color: ${theme.buttons.colors.secondary.bgColor};
    border-color: ${theme.buttons.colors.secondary.borderColor};

    &:hover,
    &:active,
    &:focus {
      color: ${theme.buttons.colors.secondaryHover.color};
      background-color: ${theme.buttons.colors.secondaryHover.bgColor};
      border-color: ${theme.buttons.colors.secondaryHover.borderColor};
    }

    &:disabled {
      color: ${theme.buttons.colors.secondary.color};
      background-color: ${theme.buttons.colors.secondary.bgColor};
      border-color: ${theme.buttons.colors.secondary.borderColor};
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

  .ot-btn--highlight {
    color: ${theme.colors.light};
    background-color: ${theme.links.primary.color};
    border-color: ${theme.links.primary.color};

    &:hover,
    &:active,
    &:focus {
      color: ${theme.colors.light};
      background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }

    &:disabled {
      color: ${theme.colors.light};
      background-color: ${theme.links.primary.color};
      border-color: ${theme.links.primary.color};
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

  .ot-btn--mobile {
    width: 4.4rem;
    height: 4.4rem;
    padding: 0;
    border: 0;
    border-radius: 0;
    color: ${theme.colors.light};
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};

    &:hover,
    &:active,
    &:focus {
      color: ${theme.colors.light};
      background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }

    &:disabled {
      color: ${theme.colors.light};
      background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }
  }

  .ot-btn--mobile.ot-btn--cancel {
    color: ${theme.colors.error};
    &:hover,
    &:active,
    &:focus {
      color: ${theme.colors.error};
    }

    &:disabled {
      color: ${theme.colors.error};
    }
  }

  .ot-input-quantity,
  .ot-btn.favorite {
    padding: 0;
    text-align: center;
    width: ${theme.favorite.size};
    height: ${theme.favorite.size};
    border-radius: ${theme.favorite.size};
  }

  .ot-input-quantity-order {
    line-height: ${theme.favorite.size};
  }

  .ot-btn.favorite .favorite__icon {
    width: ${theme.favorite.iconSize};
    height: ${theme.favorite.iconSize};
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
    font-family: ${theme.fonts.body.family};
    font-size: ${theme.fonts.sizes.main};
    color: ${theme.fonts.body.color};
    background-color: ${theme.bgColors.secondary};
    border: ${theme.border.width} solid ${theme.bgColors.secondary};
    transition: ${theme.links.transition};

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

  input,
  textarea {
    box-shadow: ${theme.inputs.boxShadow};

    &:active,
    &:focus {
      box-shadow: ${theme.inputs.boxShadow};
    }
  }

  .ot-input-quantity {
    color: ${theme.buttons.colors.primary.color};
    background-color: ${theme.buttons.colors.primary.bgColor};
    border-color: ${theme.buttons.colors.primary.borderColor};

    &:active,
    &:focus,
    &:disabled,
    &:read-only {
      color: ${theme.buttons.colors.primary.color};
      background-color: ${theme.buttons.colors.primary.bgColor};
      border-color: ${theme.buttons.colors.primary.borderColor};
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
    background-color: ${theme.links.primary.color};
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
    border-right-color: ${theme.links.primary.color};
  }
  .react-datepicker__navigation--next {
    border-left-color: ${theme.links.primary.color};
  }
  .react-datepicker__time-container {
    border-left-color: ${theme.border.color};
  }
  .react-datepicker__day,
  .react-datepicker__time-list-item {
    color: ${theme.links.primary.color};
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
    background-color: ${theme.links.primary.color};
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
    border-left-color: ${theme.links.primary.color};
  }
  .load-complete {
    border-color: ${theme.links.primary.color};
    background-color: ${theme.links.primary.color};
  }

  .clear-input {
    border-color: ${theme.links.primary.color};
    &:before,
    &:after {
      background-color: ${theme.links.primary.color};
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
