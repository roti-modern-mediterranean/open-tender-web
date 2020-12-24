import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { openModal } from '../slices'

const placeholder =
  'https://s3.amazonaws.com/betterboh/u/img/local/2/1608768672_852744398105.svg'

const QRCodeView = styled('button')`
  display: block;
  width: 100%;
  min-width: 8rem;
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};
`

const QRCode = ({ src = placeholder, alt = '' }) => {
  const dispatch = useDispatch()

  const expand = (giftCard) => {
    dispatch(openModal({ type: 'qrCode', args: { src, alt } }))
  }

  return (
    <QRCodeView onClick={expand}>
      <img src={src} alt={alt} />
    </QRCodeView>
  )
}

QRCode.displayName = 'QRCode'
QRCode.propTypes = {
  giftCards: propTypes.array,
  isLoading: propTypes.bool,
}

export default QRCode
