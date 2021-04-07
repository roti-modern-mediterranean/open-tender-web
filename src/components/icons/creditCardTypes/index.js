import Amex from './Amex'
import Discover from './Discover'
import Mastercard from './Mastercard'
import Visa from './Visa'

export { Amex, Discover, Mastercard, Visa }

export const creditCardTypeMap = {
  VISA: (props) => <Visa {...props} />,
  MC: (props) => <Mastercard {...props} />,
  DISC: (props) => <Discover {...props} />,
  AMEX: (props) => <Amex {...props} />,
  OTHER: () => null,
}
