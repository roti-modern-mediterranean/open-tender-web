import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { openModal } from '../slices'

const QRCodeView = styled('button')`
  display: block;
  width: 100%;
  min-width: 8rem;
  padding: ${(props) => props.padding};
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};
`

const QRCode = ({ src, alt = '' }) => {
  const dispatch = useDispatch()

  const expand = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    if (!src) return
    dispatch(openModal({ type: 'qrCode', args: { src, alt } }))
  }

  return (
    <QRCodeView onPointerUp={expand} padding={!src ? '50% 0' : '0'}>
      {src && <img src={src} alt={alt} />}
    </QRCodeView>
  )
}

QRCode.displayName = 'QRCode'
QRCode.propTypes = {
  giftCards: propTypes.array,
  isLoading: propTypes.bool,
}

export default QRCode
