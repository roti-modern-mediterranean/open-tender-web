import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const QRCodeView = styled('button')`
  display: block;
  width: 100%;
  padding: ${(props) => props.padding};
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: white;
  line-height: 0.1;
`

const QRCode = ({ src, alt, subtitle }) => {
  const dispatch = useDispatch()

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
        <QRCodeView padding={!src ? '50% 0' : '0'}>
          {src && <img src={src} alt={alt} />}
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
