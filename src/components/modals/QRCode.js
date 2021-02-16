import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonStyled, useImage } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'
import ImageSpinner from '../ImageSpinner'

const QRCodeView = styled('button')`
  position: relative;
  display: block;
  width: 100%;
  // padding: ${(props) => props.padding};
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

const QRCodeLoading = styled('div')`
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

const QRCode = ({ src, alt, subtitle }) => {
  const dispatch = useDispatch()
  const { hasLoaded, hasError } = useImage(src)
  const isLoading = !hasLoaded && !hasError

  return (
    <ModalView style={{ maxWidth: '36rem' }}>
      <ModalContent
        title={alt}
        subtitle={subtitle}
        footer={
          <div>
            <ButtonStyled color="cart" onClick={() => dispatch(closeModal())}>
              Close
            </ButtonStyled>
          </div>
        }
      >
        <QRCodeView padding={src && hasLoaded ? '0' : '50% 0'}>
          {isLoading ? (
            <QRCodeLoading>
              <ImageSpinner size={30} />
            </QRCodeLoading>
          ) : hasLoaded ? (
            <img src={src} alt={alt} />
          ) : hasError ? (
            <QRCodeLoading>
              <div>
                <p>QR Code failed to load. Please close window and retry.</p>
              </div>
            </QRCodeLoading>
          ) : null}
        </QRCodeView>
      </ModalContent>
    </ModalView>
  )
}

QRCode.displayName = 'QRCode'
QRCode.prototypes = {
  src: propTypes.stirng,
  alt: propTypes.stirng,
  subtitle: propTypes.stirng,
}

export default QRCode
