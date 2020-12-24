import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import ModalTitle from '../ModalTitle'

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
    <>
      <div className="modal__content">
        <div className="modal__header">
          <ModalTitle title={alt} />
          <p className="modal__subtitle">Scan to redeem</p>
        </div>
        <QRCodeView>
          <img src={src} alt={alt} />
        </QRCodeView>
        <div className="modal__footer">
          <div className="modal__footer__buttons">
            <ButtonStyled color="cart" onClick={() => dispatch(closeModal())}>
              Close
            </ButtonStyled>
          </div>
        </div>
      </div>
    </>
  )
}

QRCode.displayName = 'QRCode'
QRCode.prototypes = {
  src: propTypes.stirng,
  alt: propTypes.stirng,
}

export default QRCode
