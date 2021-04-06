import Visa from './Visa'

export { Visa }

export const creditCardTypeMap = {
  VISA: (props) => <Visa {...props} />,
  MC: (props) => <Visa {...props} />,
  DISC: (props) => <Visa {...props} />,
  AMEX: (props) => <Visa {...props} />,
  OTHER: (props) => <Visa {...props} />,
}
