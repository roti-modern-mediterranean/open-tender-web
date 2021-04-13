import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const CheckoutHeaderView = styled('div')`
  display: block;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto 3rem;
  text-align: center;

  & > div {
    margin: 1.5rem 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const CheckoutHeaderTitle = styled(Preface)`
  font-weight: 500;
  font-size: 2.8rem;
  line-height: 1;
  letter-spacing: 0.01em;
`

const CheckoutHeader = ({ title, children }) => {
  return (
    <CheckoutHeaderView>
      <CheckoutHeaderTitle as="h1">{title}</CheckoutHeaderTitle>
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
