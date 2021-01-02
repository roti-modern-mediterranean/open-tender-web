import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const QRCodeView = styled('button')`
  display: inline-block;
  width: 100%;
  // max-width: 24rem;
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};
`

const QRCode = ({ src, alt }) => {
  const dispatch = useDispatch()

  return (
    <ModalView style={{ maxWidth: '36rem' }}>
      <ModalContent
        title={alt}
        subtitle={<p>Scan to redeem</p>}
        footer={
          <div>
            <ButtonStyled color="cart" onClick={() => dispatch(closeModal())}>
              Close
            </ButtonStyled>
          </div>
        }
      >
        <QRCodeView>
          <img src={src} alt={alt} />
        </QRCodeView>
      </ModalContent>
    </ModalView>
  )
}

QRCode.displayName = 'QRCode'
QRCode.prototypes = {
  src: propTypes.stirng,
  alt: propTypes.stirng,
}

export default QRCode
