import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useImage } from '@open-tender/components'

import { ImageSpinner } from '../..'

const RewardQRCodeContainer = styled('div')`
  width: 16rem;
  margin: 0 auto;
`

const RewardQRCodeView = styled('div')`
  position: relative;
  width: 100%;
  padding: 50% 0;
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: white;
  line-height: 0.1;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`

const RewardLoading = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > div p {
    display: inline-block;
    max-width: 24rem;
    line-height: 1.5;
  }
`

const RewardQRCode = ({ src, alt }) => {
  const { hasLoaded, hasError } = useImage(src)
  const isLoading = !hasLoaded && !hasError

  return (
    <RewardQRCodeContainer>
      <RewardQRCodeView>
        {isLoading ? (
          <RewardLoading>
            <ImageSpinner size={24} />
          </RewardLoading>
        ) : hasLoaded ? (
          <img src={src} alt={alt} />
        ) : hasError ? (
          <RewardLoading>
            <div>
              <p>QR Code failed to load. Please close window and retry.</p>
            </div>
          </RewardLoading>
        ) : null}
      </RewardQRCodeView>
    </RewardQRCodeContainer>
  )
}

RewardQRCode.displayName = 'RewardQRCode'
RewardQRCode.prototypes = {
  src: propTypes.string,
  alt: propTypes.string,
}

export default RewardQRCode
