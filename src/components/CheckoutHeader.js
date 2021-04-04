import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const CheckoutHeaderView = styled('div')`
  display: block;
  width: 100%;
  margin: 0 0 3rem;
  text-align: center;

  & > div {
    margin: 1.5rem 0 0;
    display: flex;
    justify-content: center;
  }
`

const CheckoutTitle = styled(Preface)`
  font-weight: 500;
  font-size: 2.8rem;
  line-height: 1;
  letter-spacing: 0.01em;
`

const CheckoutHeader = ({ title, children }) => {
  return (
    <CheckoutHeaderView>
      <CheckoutTitle as="h1">{title}</CheckoutTitle>
      {children && <div>{children}</div>}
    </CheckoutHeaderView>
  )
}

CheckoutHeader.displayName = 'CheckoutHeader'
CheckoutHeader.propTypes = {
  title: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CheckoutHeader
