import { amex, discover, mastercard, visa, creditcard } from './assets'

export const serviceTypeNamesMap = {
  PICKUP: 'Pickup',
  DELIVERY: 'Delivery',
}

export const orderTypeNamesMap = {
  OLO: 'Regular',
  CATERING: 'Catering',
  MERCH: 'Merch',
}

export const tenderTypeNamesMap = {
  CASH: 'Cash',
  CREDIT: 'Credit',
  LEVELUP: 'LevelUp',
  HOUSE_ACCOUNT: 'House Account',
  GIFT_CARD: 'Gift Card',
  COMP: 'Comp',
}

// https://github.com/muffinresearch/payment-icons
export const cardIcons = {
  VISA: visa,
  MC: mastercard,
  DISC: discover,
  AMEX: amex,
  OTHER: creditcard,
}

export const cardNames = {
  VISA: 'Visa',
  MC: 'Mastercard',
  DISC: 'Discover',
  AMEX: 'American Express',
  OTHER: 'Other Credit Card',
}

// https://github.com/jasminmif/react-interactive-paycard
export const cardNumbersRegex = {
  VISA: '^4',
  MC: '^5[1-5]',
  DISC: '^6011',
  AMEX: '^(34|37)',
  // unionpay: '^62',
  // troy: '^9792'
}
