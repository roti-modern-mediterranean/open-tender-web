import propTypes from 'prop-types'
import { removeCustomerGiftCard } from '@open-tender/redux'
import { formatDateStr, dateStrToDate } from '@open-tender/js'
import { ButtonLink, ButtonStyled } from '@open-tender/components'

import { openModal } from '../../../slices'
import iconMap from '../../iconMap'
import { useDispatch } from 'react-redux'
import { LinkSeparator, QRCode, Row } from '../..'

const GiftCardsList = ({ giftCards, isLoading }) => {
  const dispatch = useDispatch()

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

  return (
    <div>
      {giftCards.map((giftCard) => {
        const expired = dateStrToDate(giftCard.expiration) < new Date()
        const removeable = expired || giftCard.balance === '0.00'
        return (
          <Row
            key={giftCard.card_number}
            icon={
              <QRCode
                src={giftCard.qr_code_url}
                alt={`Gift Card ${giftCard.card_number}`}
              />
            }
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
                <p>
                  <ButtonLink
                    onClick={() => handleAssign(giftCard.gift_card_id)}
                    disabled={isLoading}
                  >
                    Assign to someone else
                  </ButtonLink>
                  {removeable && (
                    <>
                      <LinkSeparator />
                      <ButtonLink
                        onClick={() => handleDelete(giftCard)}
                        disabled={isLoading}
                      >
                        remove
                      </ButtonLink>
                    </>
                  )}
                </p>
              </>
            }
            actions={
              !expired ? (
                <ButtonStyled
                  onClick={() => handleAddValue(giftCard)}
                  icon={iconMap.PlusCircle}
                  size="small"
                  disabled={isLoading}
                >
                  Add Value
                </ButtonStyled>
              ) : null
            }
          ></Row>
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
