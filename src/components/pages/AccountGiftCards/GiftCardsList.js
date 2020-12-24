import React from 'react'
import propTypes from 'prop-types'
import { removeCustomerGiftCard } from '@open-tender/redux'
import { formatDateStr, dateStrToDate } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { openModal } from '../../../slices'
import iconMap from '../../iconMap'
import { useDispatch } from 'react-redux'
import SectionRow from '../../SectionRow'
import styled from '@emotion/styled'

const placeholder =
  'https://s3.amazonaws.com/betterboh/u/img/local/2/1608768672_852744398105.svg'

const SvgView = styled('span')`
  display: block;
  width: 100%;
`

const QRCode = ({ src = placeholder, alt = '' }) => (
  <SvgView>
    <img src={src} alt={alt} />
  </SvgView>
)

const GiftCardsList = ({ giftCards, isLoading }) => {
  const dispatch = useDispatch()

  const handleAddValue = (evt, giftCard) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'giftCard', args: { giftCard } }))
    evt.target.blur()
  }

  const handleAssign = (evt, giftCardId) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'giftCardAssignOther', args: { giftCardId } }))
    evt.target.blur()
  }

  const handleDelete = (evt, giftCard) => {
    evt.preventDefault()
    const giftCardId = giftCard.gift_card_id
    dispatch(removeCustomerGiftCard(giftCardId))
    evt.target.blur()
  }

  return (
    <div className="section__content -max ot-bg-color-primary ot-border-radius">
      <div className="section__rows">
        {giftCards.map((giftCard) => {
          const expired = dateStrToDate(giftCard.expiration) < new Date()
          const removeable = expired || giftCard.balance === '0.00'
          return (
            <SectionRow
              key={giftCard.card_number}
              title={<QRCode alt={giftCard.card_number} />}
            >
              <div className="section__row__container">
                <div className="section__row__container__content">
                  <p className="ot-color-headings">{giftCard.card_number}</p>

                  <p className="ot-font-size-small">
                    ${giftCard.balance} remaining balance
                  </p>
                  {giftCard.expiration && (
                    <p
                      className={`ot-font-size-small ${
                        expired ? 'ot-color-alert' : ''
                      }`}
                    >
                      {expired ? 'Expired ' : 'Expires '}
                      {formatDateStr(giftCard.expiration, 'MMM d, yyyy')}
                    </p>
                  )}
                  <p className="ot-font-size-small">
                    <Button
                      text="Assign to someone else"
                      classes="ot-btn-link"
                      onClick={(evt) =>
                        handleAssign(evt, giftCard.gift_card_id)
                      }
                      disabled={isLoading}
                    />
                    {removeable && (
                      <>
                        <span className="link-separator">|</span>
                        <Button
                          text="remove"
                          classes="ot-btn-link"
                          onClick={(evt) => handleDelete(evt, giftCard)}
                          disabled={isLoading}
                        />
                      </>
                    )}
                  </p>
                </div>
                {!expired && (
                  <div className="section__row__container__buttons">
                    <Button
                      text="Add Value"
                      icon={iconMap.PlusCircle}
                      onClick={(evt) => handleAddValue(evt, giftCard)}
                      classes="ot-btn--small ot-font-size-small"
                      disabled={isLoading}
                    />
                  </div>
                )}
              </div>
            </SectionRow>
          )
        })}
      </div>
    </div>
  )
}

GiftCardsList.displayName = 'GiftCardsList'
GiftCardsList.propTypes = {
  giftCards: propTypes.array,
  isLoading: propTypes.bool,
}

export default GiftCardsList
