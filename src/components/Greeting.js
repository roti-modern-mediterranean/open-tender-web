import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { GreetingHeader } from '.'

const GreetingView = styled('div')`
  // padding: 0 ${(props) => props.theme.layout.padding};
  width: 100%;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    // padding: 0;
  }
`

const GreetingFootnote = styled('p')`
  margin: 2rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 2rem 0 0;
    text-align: center;
  }
`

const GuestContent = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  margin: 2.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0 0;
    text-align: center;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const Greeting = ({ title, subtitle, actions, footnote, children, style }) => {
  return (
    <GreetingView style={style}>
      <GreetingHeader title={title} subtitle={subtitle} />
      {actions}
      {footnote && <GreetingFootnote>{footnote}</GreetingFootnote>}
      {children && <GuestContent>{children}</GuestContent>}
    </GreetingView>
  )
}

Greeting.displayName = 'Greeting'
Greeting.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  actions: propTypes.element,
  footnote: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default Greeting
