import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from './icons'
import { tenderTypeNamesMap } from './utils/constants'

export const CheckoutTenderLabel = ({ icon, text }) => (
  <span className="form__input__tender">
    <span className="form__input__icon">{iconMap[icon]}</span>
    <span>{text}</span>
  </span>
)

CheckoutTenderLabel.displayName = 'CheckoutTenderLabel'
CheckoutTenderLabel.prototypes = {
  icon: propTypes.string,
  text: propTypes.string,
}

export const makeTenderTypeLabel = (tenderType) => {
  switch (tenderType) {
    case 'CASH':
      return <CheckoutTenderLabel text="Cash" icon="DollarSign" />
    case 'CREDIT':
      return <CheckoutTenderLabel text="Credit" icon="CreditCard" />
    case 'LEVELUP':
      return <CheckoutTenderLabel text="LevelUp" icon="Grid" />
    case 'HOUSE_ACCOUNT':
      return <CheckoutTenderLabel text="House Account" icon="Home" />
    default:
      return null
  }
}

export const makeTenderName = (tender) => {
  switch (tender.tender_type) {
    case 'CREDIT':
      return `${tender.card_type_name} ending in ${tender.last4}`
    case 'GIFT_CARD':
      return `Gift Card ${tender.card_number}`
    default:
      return `${tenderTypeNamesMap[tender.tender_type]}`
  }
}
