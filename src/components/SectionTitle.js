import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const SectionTitleContainer = styled('div')`
  margin: 2rem 0 2rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: center;
  }
`

const SectionTitleTitle = styled('h2')`
  color: ${(props) => props.theme.colors.title};
  font-size: ${(props) => props.theme.fonts.sizes.h3};
  margin: 0 0 0 -0.1rem;
  line-height: 1.1;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
  }
`

const SectionTitleSubtitle = styled('p')`
  color: ${(props) => props.theme.fonts.body.color};
  line-height: ${(props) => props.theme.lineHeight};
  margin: 0.75rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const SectionTitle = ({ title, subtitle, style = null }) => {
  return (
    <SectionTitleContainer style={style}>
      <SectionTitleTitle>{title}</SectionTitleTitle>
      {!!subtitle && <SectionTitleSubtitle>{subtitle}</SectionTitleSubtitle>}
    </SectionTitleContainer>
  )
}

SectionTitle.displayName = 'SectionTitle'
SectionTitle.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  style: propTypes.object,
}

export default SectionTitle
