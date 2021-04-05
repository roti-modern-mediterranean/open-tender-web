import propTypes from 'prop-types'
import styled from '@emotion/styled'

import CheckoutCartItem from './CheckooutCartItem'

const CheckoutCartView = styled('div')`
  margin: 0 0 5rem;
`

const CheckoutLine = styled('span')`
  display: block;
  width: 100%;
  height: 0.1rem;
  background-color: ${(props) => props.theme.colors.primary};
  margin: 1.5rem 0 1rem;
`

const CheckoutCart = ({ check }) => {
  const { cart, surcharges, discounts, taxes, totals, details } = check
  const { subtotal, gift_card, surcharge, discount, tip, total } = totals
  const totalBeforeTax = [subtotal, gift_card, surcharge, discount]
    .reduce((t, i) => (t += parseFloat(i)), 0.0)
    .toFixed(2)
  return (
    <CheckoutCartView>
      {cart.map((item, index) => (
        <CheckoutCartItem
          key={`${item.id}-${index}`}
          name={item.name}
          quantity={item.quantity}
          amount={item.price_total}
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
      {subtotal !== totalBeforeTax && (
        <>
          <CheckoutLine />
          <CheckoutCartItem name="Total before Tax" amount={totalBeforeTax} />
        </>
      )}
      {details.is_tax_exempt ? (
        <CheckoutCartItem name="Tax (tax exempt)" amount="$0.00" />
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
}

export default CheckoutCart
