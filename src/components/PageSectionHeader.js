import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const PageSectionHeaderView = styled('div')`
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }

  h2 {
    line-height: 1;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }

  p {
    line-height: ${(props) => props.theme.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    margin: 0.5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0.5rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const PageSectionHeader = ({ title, subtitle, style = null, children }) => {
  return (
    <PageSectionHeaderView style={style}>
      {title && <h2>{title}</h2>}
      {subtitle && <p>{subtitle}</p>}
      {children}
    </PageSectionHeaderView>
  )
}

PageSectionHeader.displayName = 'PageSectionHeader'
PageSectionHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageSectionHeader
