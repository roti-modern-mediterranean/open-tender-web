import propTypes from 'prop-types'
import { BuilderQuantity } from '@open-tender/components'
import { CartItemQuantity } from '..'
import { MinusSign, PlusSign } from '../icons'
import styled from '@emotion/styled'

const quantityIconMap = {
  plus: <PlusSign />,
  minus: <MinusSign />,
}

const BuilderItemQuantiyView = styled('div')`
  display: flex;

  & > span {
    margin: 0 1.5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }
`

const BuilderItemQuantiy = ({ item, increment, decrement, setQuantity }) => {
  return (
    <BuilderItemQuantiyView>
      <span>Quantity</span>
      <CartItemQuantity>
        <BuilderQuantity
          item={item}
          adjust={setQuantity}
          increment={increment}
          decrement={decrement}
          incrementDisabled={item.quantity === item.max}
          decrementDisabled={item.quantity === 1}
          iconMap={quantityIconMap}
        />
      </CartItemQuantity>
    </BuilderItemQuantiyView>
  )
}

BuilderItemQuantiy.displayName = 'BuilderItemQuantiy'
BuilderItemQuantiy.propTypes = {
  item: propTypes.object,
  increment: propTypes.func,
  decrement: propTypes.func,
  setQuantity: propTypes.func,
}

export default BuilderItemQuantiy
