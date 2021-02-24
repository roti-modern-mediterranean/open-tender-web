import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Container } from '.'

const PageHeaderView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  padding: 2.5rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: center;
    padding: 2rem 0;
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

const PageHeader = ({ title, subtitle, style = null, children }) => {
  return (
    <PageHeaderView style={style}>
      <Container>
        {title && <h1>{title}</h1>}
        {subtitle && <p>{subtitle}</p>}
        {children}
      </Container>
    </PageHeaderView>
  )
}

PageHeader.displayName = 'PageHeader'
PageHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageHeader
