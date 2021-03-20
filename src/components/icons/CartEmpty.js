import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CartEmptyView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color};
  }
`

const CartEmpty = ({ size = '2.4rem', color = null }) => {
  return (
    <CartEmptyView size={size} color={color}>
      <svg viewBox="0 0 24 27">
        <path d="M17.9446 6.47525V5.84158C17.9446 2.62376 15.2746 0 12 0C8.72544 0 6.05542 2.62376 6.05542 5.84158V6.47525H0V27H24V6.47525H17.9446ZM7.86902 5.84158C7.86902 3.60396 9.72292 1.78218 12 1.78218C14.2771 1.78218 16.131 3.60396 16.131 5.84158V6.47525H7.86902V5.84158ZM22.1864 25.2178H1.8136V8.25743H6.05542V10.6535H7.86902V8.25743H16.131V10.6535H17.9446V8.25743H22.1864V25.2178Z" />
      </svg>
    </CartEmptyView>
  )
}

CartEmpty.displayName = 'CartEmpty'
CartEmpty.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default CartEmpty
