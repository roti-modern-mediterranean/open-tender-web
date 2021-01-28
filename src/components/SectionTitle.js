import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const SectionTitleContainer = styled('div')`
  margin: 6rem 0 2rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
`

const SectionTitleTitle = styled('h2')`
  color: ${(props) => props.theme.colors.title};
  font-size: ${(props) => props.theme.fonts.sizes.h3};
  margin: 0 0 0 -0.1rem;
  line-height: 1.1;
`

const SectionTitleSubtitle = styled('p')`
  color: ${(props) => props.theme.fonts.body.color};
  // font-size: ${(props) => props.theme.fonts.sizes.small};
  line-height: ${(props) => props.theme.lineHeight};
  margin: 0.75rem 0 0;
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
