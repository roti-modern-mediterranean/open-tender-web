import React from 'react'
import propTypes from 'prop-types'
import { isMobileOnly } from 'react-device-detect'
import { ClipLoader } from 'react-spinners'
import styled from '@emotion/styled'

const BackgroundContainer = styled('div')`
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 76.8rem;
  display: flex;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }

  & > div {
    p:first-of-type {
      @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
        font-size: ${(props) => props.theme.fonts.sizes.xBig};
      }
    }

    p + p {
      @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
        font-size: ${(props) => props.theme.fonts.sizes.small};
      }
    }
  }
`

const BackgroundLoading = styled('div')`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Background = ({ imageUrl, children }) => {
  const bgStyle =
    imageUrl && !isMobileOnly ? { backgroundImage: `url(${imageUrl}` } : null
  return (
    <BackgroundContainer style={bgStyle}>
      {imageUrl && !bgStyle && (
        <BackgroundLoading>
          <ClipLoader size={30} loading={true} />
        </BackgroundLoading>
      )}
      {children}
    </BackgroundContainer>
  )
}

Background.displayName = 'Background'
Background.propTypes = {
  imageUrl: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Background
