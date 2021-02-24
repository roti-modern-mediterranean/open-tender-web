import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { formatDateStr, dateStrToDate } from '@open-tender/js'
import { ButtonLink } from '@open-tender/components'

import { openModal } from '../slices'
import iconMap from './iconMap'
import { QRCode, Row } from '.'
import styled from '@emotion/styled'

const GiftCardButton = styled('button')`
  width: 6rem;
`

const GiftCardAction = styled('div')`
  margin: 0 0 0 0.5rem;

  button {
    width: 2rem;
    height: 2rem;
  }
`

const GiftCard = ({ giftCard, isLoading = false }) => {
  const dispatch = useDispatch()
  const expired = dateStrToDate(giftCard.expiration) < new Date()
  const src = giftCard.qr_code_url
  const alt = `Gift Card ${giftCard.card_number}`
  const icon = src ? (
    <GiftCardButton onClick={(evt) => expand(evt, src, alt)}>
      <QRCode src={src} alt={alt} />
    </GiftCardButton>
  ) : null

  const expand = (evt, src, alt) => {
    if (!src) return
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }
    const title = alt
    const alert = 'QR codes are for in-store use only'
    const footnote =
      'To use online, simply apply this gift card on the checkout page'
    dispatch(
      openModal({ type: 'qrCode', args: { src, alt, title, alert, footnote } })
    )
  }

  return (
    <Row
      key={giftCard.card_number}
      icon={icon}
      content={
        <>
          <p>{giftCard.card_number}</p>
          <p>${giftCard.balance} remaining balance</p>
          {giftCard.expiration && (
            <p>
              {expired ? 'Expired ' : 'Expires '}
              {formatDateStr(giftCard.expiration, 'MMM d, yyyy')}
            </p>
          )}
        </>
      }
      actions={
        <GiftCardAction>
          <ButtonLink
            onClick={() => expand(null, src, alt)}
            disabled={false}
            label={`Apply gift card ${giftCard.card_number}`}
          >
            {iconMap.PlusCircle}
          </ButtonLink>
        </GiftCardAction>
      }
    ></Row>
  )
}

GiftCard.displayName = 'GiftCard'
GiftCard.propTypes = {
  giftCard: propTypes.object,
  isLoading: propTypes.bool,
}

export default GiftCard
