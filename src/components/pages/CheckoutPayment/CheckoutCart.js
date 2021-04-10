import propTypes from 'prop-types'
import styled from '@emotion/styled'

import CheckoutCartItem from './CheckoutCartItem'

const CheckoutCartView = styled('div')`
  margin: 0 0 5rem;

  & > div {
    border: 0;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.line};
    border-top-width: ${(props) => (props.showBorder ? '0.1rem' : '0')};
    padding-top: ${(props) => (props.showBorder ? '1.1rem' : '0')};
    margin-top: ${(props) => (props.showBorder ? '0.6rem' : '0')};

    &:first-of-type {
      border: 0;
      padding-top: 0.8rem;
      margin: 0;
    }
  }

  & > span + div {
    border: 0;
    padding-top: 0.8rem;
    margin: 0;
  }
`

const CheckoutLine = styled('span')`
  display: block;
  width: 100%;
  height: 0.1rem;
  background-color: ${(props) => props.theme.colors.primary};
  margin: 1.5rem 0 1rem;
`

const CheckoutCart = ({ check, showBorder = false, style }) => {
  const { cart, surcharges, discounts, taxes, totals, details } = check
  const { subtotal, tip, total } = totals
  // const totalBeforeTax = [subtotal, gift_card, surcharge, discount]
  //   .reduce((t, i) => (t += parseFloat(i)), 0.0)
  //   .toFixed(2)
  return (
    <CheckoutCartView showBorder={showBorder} style={style}>
      {cart.map((item, index) => (
        <CheckoutCartItem
          key={`${item.id}-${index}`}
          name={item.name}
          quantity={item.quantity}
          amount={item.price_total}
          item={item}
        />
      ))}
      <CheckoutLine />
      <CheckoutCartItem name="Cart Total" amount={subtotal} />
      {surcharges.map((surcharge) => (
        <CheckoutCartItem key={surcharge.id} {...surcharge} />
      ))}
      {discounts.map((discount) => (
        <CheckoutCartItem key={discount.id} {...discount} />
      ))}
      {/* {subtotal !== totalBeforeTax && (
        <>
          <CheckoutLine />
          <CheckoutCartItem name="Total before Tax" amount={totalBeforeTax} />
        </>
      )} */}
      {details.tax_exempt_id ? (
        <CheckoutCartItem name="Tax (exempt)" amount="0.00" />
      ) : (
        taxes.map((tax) => <CheckoutCartItem key={tax.id} {...tax} />)
      )}
      {tip !== '0.00' && <CheckoutCartItem name="Tip" amount={tip} />}
      <CheckoutLine />
      <CheckoutCartItem name="Total" amount={total} />
    </CheckoutCartView>
  )
}

CheckoutCart.displayName = 'CheckoutCart'
CheckoutCart.propTypes = {
  check: propTypes.object,
  showBorder: propTypes.bool,
  style: propTypes.object,
}

export default CheckoutCart
