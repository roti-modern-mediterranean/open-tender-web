import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const WelcomeHeaderView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;

  h1 {
    line-height: 1;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  p {
    line-height: ${(props) => props.theme.lineHeight};
    margin: 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const WelcomeHeader = ({ title, subtitle, children }) => {
  return (
    <WelcomeHeaderView>
      {title && <h1>{title}</h1>}
      {subtitle && <p>{subtitle}</p>}
    </WelcomeHeaderView>
  )
}

WelcomeHeader.displayName = 'WelcomeHeader'
WelcomeHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default WelcomeHeader
