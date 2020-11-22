import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCustomerGiftCards,
  removeCustomerGiftCard,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'
import { slugify, formatDateStr, dateStrToDate } from '@open-tender/js'

import { selectAccountConfig, openModal } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionRow from './SectionRow'
import SectionFooter from './SectionFooter'
import iconMap from './iconMap'
import SectionEmpty from './SectionEmpty'
import { Link } from 'react-router-dom'

const AccountGiftCards = () => {
  const dispatch = useDispatch()
  const {
    giftCards: { title, subtitle, empty },
  } = useSelector(selectAccountConfig)
  const giftCards = useSelector(selectCustomerGiftCards)

  const handleAddValue = (evt, giftCard) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'giftCard', args: { giftCard } }))
    evt.target.blur()
  }

  const handleDelete = (evt, giftCard) => {
    evt.preventDefault()
    const giftCardId = giftCard.gift_card_id
    dispatch(removeCustomerGiftCard(giftCardId))
    evt.target.blur()
  }

  const handlePurchase = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'giftCard' }))
    evt.target.blur()
  }

  const isLoading = giftCards.loading === 'pending'
  const error = giftCards.error
  const showGiftCards = giftCards.entities.length > 0

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
          <SectionError error={error} />
          {showGiftCards ? (
            <div className="section__content ot-bg-color-primary ot-border-radius">
              <div className="section__rows">
                {giftCards.entities.map((giftCard) => {
                  const expired =
                    dateStrToDate(giftCard.expiration) < new Date()
                  const removeable = expired || giftCard.balance === '0.00'
                  return (
                    <SectionRow
                      key={giftCard.card_number}
                      title={giftCard.card_number}
                    >
                      <div className="section__row__container">
                        <div className="section__row__container__content">
                          <p className="ot-color-headings">
                            ${giftCard.balance} remaining balance
                          </p>
                          <p className="ot-font-size-small">
                            {giftCard.orders} orders have been placed with this
                            gift card
                          </p>
                          {giftCard.expiration && (
                            <p
                              className={`ot-font-size-small ${
                                expired ? 'ot-color-alert' : ''
                              }`}
                            >
                              {expired ? 'Expired ' : 'Expires '}
                              {formatDateStr(
                                giftCard.expiration,
                                'MMM d, yyyy'
                              )}
                            </p>
                          )}
                          <p className="ot-font-size-small">
                            <Button
                              text="remove"
                              classes="ot-btn-link"
                              onClick={(evt) => handleDelete(evt, giftCard)}
                              disabled={isLoading || !removeable}
                            />
                          </p>
                        </div>
                        {!expired && (
                          <div className="section__row__container__buttons">
                            <Button
                              text="Add Value"
                              icon={iconMap['PlusCircle']}
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
          ) : (
            <SectionEmpty message={empty} />
          )}

          <SectionFooter>
            <Button
              text="Purchase a new gift card for yourself"
              onClick={handlePurchase}
              classes="ot-btn-link"
            />{' '}
            or <Link to="/gift-cards">purchase gift cards for others</Link>
          </SectionFooter>
        </div>
      </div>
    </div>
  )
}

AccountGiftCards.displayName = 'AccountGiftCards'
export default AccountGiftCards
