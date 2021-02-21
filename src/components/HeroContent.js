import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

const HeroContentView = styled('div')`
  color: ${(props) => props.color || props.theme.colors.light};

  p:first-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    color: ${(props) => props.color || props.theme.colors.light};
  }

  p + p {
    margin: 0.3rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    color: ${(props) => props.color || props.theme.colors.light};
  }
`

const HeroContent = ({ title, subtitle, color }) => {
  return (
    <HeroContentView>
      <Heading as="p">{title}</Heading>
      <p>{subtitle}</p>
    </HeroContentView>
  )
}

HeroContent.displayName = 'HeroContent'
HeroContent.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  color: propTypes.string,
}

export default HeroContent
