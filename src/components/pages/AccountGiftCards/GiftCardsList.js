import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeCustomerGiftCard } from '@open-tender/redux'
import { formatDateStr, dateStrToDate } from '@open-tender/js'
import { ButtonLink, ButtonStyled } from '@open-tender/components'

import { openModal } from '../../../slices'
import iconMap from '../../iconMap'
import { QRCode, Row } from '../..'
import styled from '@emotion/styled'
import { Plus, X, XCircle } from 'react-feather'
import { Close, PlusSign, User } from '../../icons'
import { useTheme } from '@emotion/react'

const GiftCardButton = styled('button')`
  width: 8rem;
`

const CircleIcon = styled('button')`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${(props) => props.theme.colors.primary};

  & > span {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const GiftCardsList = ({ giftCards, isLoading }) => {
  const dispatch = useDispatch()
  const theme = useTheme()

  const handleAddValue = (giftCard) => {
    dispatch(openModal({ type: 'giftCard', args: { giftCard } }))
  }

  const handleAssign = (giftCardId) => {
    dispatch(openModal({ type: 'giftCardAssignOther', args: { giftCardId } }))
  }

  const handleDelete = (giftCard) => {
    const giftCardId = giftCard.gift_card_id
    dispatch(removeCustomerGiftCard(giftCardId))
  }

  const expand = (evt, src, alt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!src) return
    const title = alt
    const alert = 'QR codes are for in-store use only'
    const footnote =
      'To use online, simply apply this gift card on the checkout page'
    dispatch(
      openModal({ type: 'qrCode', args: { src, alt, title, alert, footnote } })
    )
  }

  return (
    <div>
      {giftCards.map((giftCard) => {
        const expired = dateStrToDate(giftCard.expiration) < new Date()
        const removeable = expired || giftCard.balance === '0.00'
        const src = giftCard.qr_code_url
        const alt = `Gift Card ${giftCard.card_number}`
        const icon = src ? (
          <GiftCardButton onClick={(evt) => expand(evt, src, alt)}>
            <QRCode src={src} alt={alt} />
          </GiftCardButton>
        ) : null
        return (
          <Row
            key={giftCard.card_number}
            icon={icon}
            title={giftCard.card_number}
            actions={
              <>
                {!expired && (
                  <CircleIcon
                    onClick={() => handleAddValue(giftCard)}
                    disabled={isLoading}
                  >
                    <span>
                      <Plus size={12} color={theme.colors.primary} />
                      {/* <PlusSign size={8} color={theme.colors.primary} /> */}
                    </span>
                  </CircleIcon>
                )}
                <button
                  onClick={() => handleAssign(giftCard.gift_card_id)}
                  disabled={isLoading}
                >
                  <User size="1.6rem" color={theme.colors.primary} />
                </button>
                {removeable && (
                  <CircleIcon
                    onClick={() => handleDelete(giftCard)}
                    disabled={isLoading}
                  >
                    <span>
                      <X size={12} color={theme.colors.primary} />
                    </span>
                  </CircleIcon>
                )}
              </>
            }
          >
            <div>
              <p>${giftCard.balance} remaining balance</p>
              {giftCard.expiration ? (
                <p>
                  {expired ? 'Expired ' : 'Expires '}
                  {formatDateStr(giftCard.expiration, 'MMM d, yyyy')}
                </p>
              ) : (
                <p>Expires never</p>
              )}
            </div>
          </Row>
        )
      })}
    </div>
  )
}

GiftCardsList.displayName = 'GiftCardsList'
GiftCardsList.propTypes = {
  giftCards: propTypes.array,
  isLoading: propTypes.bool,
}

export default GiftCardsList
