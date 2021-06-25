import React from 'react'
import { css, Global, withTheme } from '@emotion/react'

// https://stackoverflow.com/questions/51637950/enable-global-theming-with-emotion

const makeGlobalStyles = (theme) => css`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: sans-serif;
    height: 100%;
    @media (max-width: 1400px) {
      font-size: 54.166667%;
    }
    @media (max-width: ${theme.breakpoints.narrow}) {
      font-size: 62.5%;
    }
  }

  body {
    height: 100%;
    overflow: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul,
  legend {
    margin: 0;
    padding: 0;

    @media (max-width: ${theme.breakpoints.tablet}) {
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }
  }

  fieldset {
    padding: 0;
    border: 0;
    margin: 0;
  }

  label {
    position: relative;
  }

  input,
  textarea,
  select {
    -webkit-appearance: none;
  }

  input[type='search'] {
    -webkit-appearance: none;

    &::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      display: none;
    }
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='submit'] {
    width: auto;
    cursor: pointer;
  }

  ol,
  ul {
    list-style: none;
  }

  ol {
    list-style: decimal outside;
    padding: 0 0 0 1.5rem;

    li {
      margin: 1em 0 0;

      span {
        position: relative;
        left: 0rem;
      }
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border-radius: ${theme.border.radius};
    background-color: ${theme.bgColors.light};

    thead {
      padding: 1rem;
      padding-bottom: 0;
    }

    tr {
      border-bottom-width: 0.1rem;
      border-bottom-style: solid;
      border-bottom-color: ${theme.border.color};
    }

    th,
    td {
      text-align: center;
      padding: 1rem;
      font-size: 1.8rem;
      font-family: ${theme.fonts.preface.family};
      font-weight: ${theme.fonts.preface.weight};
      letter-spacing: ${theme.fonts.preface.letterSpacing};
      text-transform: ${theme.fonts.preface.textTransform};
      -webkit-font-smoothing: ${theme.fonts.preface.fontSmoothing};

      &:first-of-type {
        text-align: left;
      }

      &:last-child {
        text-align: right;
      }
    }

    td {
      font-weight: normal;
    }

    thead th {
      font-weight: 500;
    }

    tbody tr:last-child {
      border-bottom: 0;
    }
  }

  a,
  button {
    &:active {
      outline: none;
    }
  }

  button {
    cursor: pointer;
    appearance: none;
    background: transparent;
    border: none;
    padding: 0;
    font-family: ${theme.fonts.body.family};
    font-weight: ${theme.fonts.body.weight};
    transition: ${theme.links.transition};
    font-size: ${theme.fonts.sizes.main};
    color: ${theme.fonts.body.color};
  }

  button:disabled {
    cursor: default;
    opacity: 0.5;
  }

  button > * {
    pointer-events: none;
  }

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
  h6 {
    font-family: ${theme.fonts.headings.family};
    font-weight: ${theme.fonts.headings.weight};
    letter-spacing: ${theme.fonts.headings.letterSpacing};
    text-transform: ${theme.fonts.headings.textTransform};
    -webkit-font-smoothing: ${theme.fonts.headings.fontSmoothing};
    color: ${theme.fonts.headings.color};
  }

  h1 {
    font-size: ${theme.fonts.sizes.h1};
  }

  h2 {
    font-size: ${theme.fonts.sizes.h2};
  }

  h3 {
    font-size: ${theme.fonts.sizes.h3};
  }

  h4 {
    font-size: ${theme.fonts.sizes.h4};
  }

  h5 {
    font-size: ${theme.fonts.sizes.h5};
  }

  h6 {
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

  input,
  textarea {
    width: 100%;
    line-height: ${theme.inputs.lineHeight};
    padding: ${theme.inputs.padding};
    border: 0;
    border-bottom: ${theme.inputs.borderWidth} solid ${theme.inputs.borderColor};
    border-radius: ${theme.inputs.radius};
    font-family: ${theme.inputs.family};
    font-weight: ${theme.inputs.weight};
    letter-spacing: ${theme.inputs.letterSpacing};
    text-transform: ${theme.inputs.textTransform};
    -webkit-font-smoothing: ${theme.inputs.fontSmoothing};
    font-size: ${theme.inputs.fontSize};
    color: ${theme.inputs.color};
    // background-color: ${theme.inputs.bgColor};
    background-color: transparent;
    box-shadow: ${theme.inputs.boxShadow};
    transition: ${theme.links.transition};

    &::placeholder {
      color: ${theme.inputs.placeholderColor};
    }

    &::selection {
      color: ${theme.bgColors.primary};
      background-color: ${theme.inputs.placeholderColor};
    }

    // &:active,
    // &:focus {
    //   color: ${theme.inputs.color};
    //   background-color: transparent;
    //   border-bottom: 0.1rem solid ${theme.inputs.borderColor};
    // }

    &:disabled,
    &:read-only {
      cursor: default;
      opacity: 0.5;
      color: ${theme.inputs.color};
      background-color: transparent;
      border-bottom: ${theme.inputs.borderWidth} solid
        ${theme.inputs.borderColor};
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

  textarea {
    height: 4.4rem;

    &:focus {
      outline: none;
    }
  }

  select {
    position: relative;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    width: 100%;
    padding: 1rem 1.5rem;
    border: 0;
    border-radius: ${theme.border.radius};
    line-height: ${theme.inputs.lineHeight};
    font-family: ${theme.inputs.family};
    font-weight: ${theme.inputs.weight};
    letter-spacing: ${theme.inputs.letterSpacing};
    text-transform: ${theme.inputs.textTransform};
    -webkit-font-smoothing: ${theme.inputs.fontSmoothing};
    font-size: ${theme.inputs.fontSize};
    color: ${theme.inputs.color};
    background-color: ${theme.bgColors.secondary};
    transition: ${theme.links.transition};

    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-down {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fill-bar {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }

  .md-enter,
  .md-exit.md-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;

    > div {
      transition: all 250ms ease;
      transform: translateY(10%);
    }
  }

  .md-enter.md-enter-active,
  .md-exit {
    opacity: 1;
    visibility: visible;

    > div {
      transform: translateY(0);
    }
  }

  .sidebar-enter,
  .sidebar-exit.sidebar-exit-active {
    transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
    visibility: hidden;
    transform: translateX(100%);
  }

  .sidebar-enter.sidebar-enter-active,
  .sidebar-exit {
    visibility: visible;
    transform: translateX(0);
  }

  .sidebar-left-enter,
  .sidebar-left-exit.sidebar-left-exit-active {
    transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
    transform: translateX(-100%);
  }

  .sidebar-left-enter.sidebar-left-enter-active,
  .sidebar-left-exit {
    transform: translateX(0);
  }

  .slide-up-enter,
  .slide-up-exit.slide-up-exit-active {
    transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
    opacity: 0;
    visibility: hidden;
    transform: translate3D(0, 100%, 0);
  }

  .slide-up-enter.slide-up-enter-active,
  .slide-up-exit {
    opacity: 1;
    visibility: visible;
    transform: translate3D(0, 0, 0);
  }

  .overlay-enter,
  .overlay-exit.overlay-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
  }

  .overlay-enter.overlay-enter-active,
  .overlay-exit {
    opacity: 1;
    visibility: visible;
  }

  .flash-enter {
    opacity: 0;
    transform: translateY(-20%);
  }

  .flash-enter-active,
  .flash-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .flash-exit-active {
    opacity: 0;
    transform: translateY(-20%);
  }

  .flash-message-enter {
    opacity: 0;
    transform: translateY(-20%);
  }

  .flash-message-enter-active,
  .flash-message-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .flash-message-exit-active {
    opacity: 0;
    transform: translateY(20%);
  }

  .reveal-enter,
  .reveal-exit.reveal-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
  }

  .reveal-enter.reveal-enter-active,
  .reveal-exit {
    opacity: 1;
    visibility: visible;
  }

  .slide-toggle-down-enter,
  .slide-toggle-down-exit.slide-toggle-down-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10%);
  }

  .slide-toggle-down-enter.slide-toggle-down-enter-active,
  .slide-toggle-down-exit {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .scale-up {
    transition: all 250ms ease;
    transform: scale(1.1);
  }

  .react-datepicker__current-month {
    font-family: ${theme.fonts.preface.family};
    text-transform: ${theme.fonts.preface.textTransform};
    -webkit-font-smoothing: ${theme.fonts.preface.fontSmoothing};
    font-weight: 500;
    font-size: 2.2rem;
    letter-spacing: 0.01em;
  }

  .react-datepicker__navigation--previous {
    border-color: ${theme.colors.primary};
  }

  .react-datepicker__navigation--next {
    border-color: ${theme.colors.primary};
  }

  .react-datepicker__time-container {
    border-left-color: ${theme.border.color};
  }

  .react-datepicker__day-names {
    border-top: 0.1rem solid ${theme.colors.line};
    border-bottom: 0.1rem solid ${theme.colors.line};
  }

  .react-datepicker__day {
    color: ${theme.colors.primary};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day:hover,
  .react-datepicker__day:active,
  .react-datepicker__day:focus {
    color: ${theme.colors.light};
    background-color: ${theme.links.primary.color};
    outline: none;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--keyboard-selected:focus {
    color: ${theme.colors.primary};
    background-color: transparent;
  }

  .react-datepicker__day--today {
    background-color: transparent;

    &::after {
      display: block;
      content: ' ';
      width: 0.5rem;
      height: 0.5rem;
      margin: -0.4rem auto 0;
      border-radius: 0.25rem;
      background-color: ${theme.colors.beet};
    }
  }

  .react-datepicker__day--today.react-datepicker__day--selected {
    background-color: ${theme.links.primary.color};

    &::after {
      display: none;
    }
  }

  .react-datepicker__time-list-item {
    color: ${theme.colors.primary};
  }

  .react-datepicker__time-list-item--selected,
  .react-datepicker__time-list-item:hover,
  .react-datepicker__time-list-item:active,
  .react-datepicker__time-list-item:focus {
    color: ${theme.colors.light};
    background-color: ${theme.links.primary.color};
  }

  .react-datepicker__day--outside-month,
  .react-datepicker__day--disabled,
  .react-datepicker__time-list-item--disabled,
  .react-datepicker__day--disabled:hover,
  .react-datepicker__time-list-item--disabled:hover {
    opacity: 1;
    color: ${theme.bgColors.secondary} !important;
    background-color: transparent !important;
  }
`

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
))

export default GlobalStyles
