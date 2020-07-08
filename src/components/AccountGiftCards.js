import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomerGiftCards } from '@open-tender/redux'
import { slugify, formatDateStr, dateStrToDate } from '@open-tender/js'

import { selectConfigAccountSections } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionRow from './SectionRow'
import { Button } from '@open-tender/components'

const AccountGiftCards = () => {
  const {
    giftCards: { title, subtitle },
  } = useSelector(selectConfigAccountSections)
  const giftCards = useSelector(selectCustomerGiftCards)

  const handleAddValue = (evt, giftCard) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const handlePurchase = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const isLoading = giftCards.loading === 'pending'
  const error = giftCards.error
  const showGiftCards = giftCards.entities.length

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
          <SectionError error={error} />
          {showGiftCards && (
            <div className="section__content ot-bg-color-primary ot-border-radius">
              <div className="section__rows">
                {giftCards.entities.map((giftCard) => {
                  const expired =
                    dateStrToDate(giftCard.expiration) < new Date()
                  return (
                    <SectionRow
                      key={giftCard.card_number}
                      title={giftCard.card_number}
                    >
                      <div className="section__row__container">
                        <div className="section__row__container__content">
                          <p>${giftCard.balance} remaining balance</p>
                          <p className="ot-font-size-small ot-color-secondary">
                            {giftCard.orders} orders have been placed with this
                            gift card
                          </p>
                          {giftCard.expiration && (
                            <p
                              className={`ot-font-size-small ${
                                expired
                                  ? 'ot-color-alert'
                                  : 'ot-color-secondary'
                              }`}
                            >
                              {expired ? 'Expired ' : 'Expires '}
                              {formatDateStr(
                                giftCard.expiration,
                                'MMM d, yyyy'
                              )}
                            </p>
                          )}
                        </div>
                        {!expired && (
                          <div className="section__row__container__buttons">
                            <Button
                              text="Add Value"
                              icon="PlusCircle"
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
          )}
          <div className="section__footer">
            <p className="ot-font-size-small">
              <Button
                text="Purchase a new gift card"
                onClick={handlePurchase}
                classes="ot-btn-link"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

AccountGiftCards.displayName = 'AccountGiftCards'
export default AccountGiftCards
