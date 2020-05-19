import React from 'react'
import { iconMap } from './icons'
import { tenderTypeNamesMap } from './constants'

export const Cash = () => (
  <div className="form__line__wrapper">
    <div className="form__line__icon">{iconMap['DollarSign']}</div>
    <div>Cash</div>
  </div>
)

export const CreditCard = () => (
  <div className="form__line__wrapper">
    <div className="form__line__icon">{iconMap['CreditCard']}</div>
    <div>Credit Card</div>
  </div>
)

export const LevelUp = () => (
  <div className="form__line__wrapper">
    <div className="form__line__icon">{iconMap['Grid']}</div>
    <div>LevelUp</div>
  </div>
)

export const HouseAccount = () => (
  <div className="form__line__wrapper">
    <div className="form__line__icon">{iconMap['Home']}</div>
    <div>House Account</div>
  </div>
)

export const makeTenderTypeLabel = (tenderType) => {
  switch (tenderType) {
    case 'CASH':
      return <Cash />
    case 'CREDIT':
      return <CreditCard />
    case 'LEVELUP':
      return <LevelUp />
    case 'HOUSE_ACCOUNT':
      return <HouseAccount />
    default:
      return null
  }
}

export const makeTenderName = (tender) => {
  switch (tender.tender_type) {
    case 'GIFT_CARD':
      return `Gift Card ${tender.card_number}`
    default:
      return `${tenderTypeNamesMap[tender.tender_type]}`
  }
}
