import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const GreetingHeaderView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  padding: 0 0 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: center;
    padding: 0 0 2rem;
  }

  h1 {
    line-height: 1;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  p {
    line-height: ${(props) => props.theme.lineHeight};
    margin: 0.5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0.5rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const GreetingHeader = ({ title, subtitle, style = null, children }) => {
  return (
    <GreetingHeaderView style={style}>
      {title && <h1>{title}</h1>}
      {subtitle && <p>{subtitle}</p>}
      {children}
    </GreetingHeaderView>
  )
}

GreetingHeader.displayName = 'GreetingHeader'
GreetingHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default GreetingHeader