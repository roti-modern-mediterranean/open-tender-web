import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectSoldOut, selectSelectedAllergenNames } from '@open-tender/redux'
import { BuilderQuantity, Heading } from '@open-tender/components'

import { selectDisplaySettings } from '../../../slices'
import { MinusSign, PlusSign } from '../../icons'
import { CartItemQuantity, ImageSpinner } from '../..'
import BuilderOptionImage from './BuilderOptionImage'
import MenuItemAllergens from '../../pages/Menu/MenuItemAllergens'

const quantityIconMap = {
  plus: <PlusSign />,
  minus: <MinusSign />,
}

const BuilderOptionView = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: 0 0 1.5rem;
`

const BuilderOptionContent = styled('div')`
  flex-grow: 1;
  margin: 0 0 0 0.5rem;
`

const BuilderOptionHeader = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const BuilderOptionTitle = styled(Heading)`
  display: block;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.8rem;
  padding: 1rem 0 0;
  margin: 0 1rem 0 0;
`

const BuilderItemQuantityView = styled('div')`
  flex: 0 0 auto;
  display: flex;

  & > span {
    margin: 0 1.5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }
`

const BuilderOptionDescription = styled('div')`
  margin: 1rem 0 0;

  p {
    font-size: 1.2rem;
    line-height: 1.66667;
  }
`

const BuilderOptionSoldOut = styled(Heading)`
  display: block;
  color: ${(props) => props.theme.colors.alert};
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0.5rem 0 0;
`

const BuilderOption = ({ group, option, adjust, increment, decrement }) => {
  const { name, description, imageUrl } = option
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const { allergens: showAllergens } = useSelector(selectDisplaySettings)
  const soldOut = useSelector(selectSoldOut)
  const isSoldOut = soldOut ? soldOut.includes(option.id) : false
  const allergens = showAllergens ? option.allergens : []
  const allergenAlert =
    allergenAlerts && allergens.length
      ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
      : []
  const groupAtMax = group.max !== 0 && group.quantity === group.max
  const optionAtMax = option.max !== 0 && option.quantity === option.max
  const incrementDisabled = groupAtMax || optionAtMax || isSoldOut
  const decrementDisabled = option.quantity === 0 || isSoldOut

  return (
    <BuilderOptionView>
      <BuilderOptionImage imageUrl={imageUrl} spinner={<ImageSpinner />} />
      <BuilderOptionContent>
        <BuilderOptionHeader>
          <BuilderOptionTitle>{name}</BuilderOptionTitle>
          <BuilderItemQuantityView>
            <CartItemQuantity>
              <BuilderQuantity
                item={option}
                adjust={adjust}
                increment={increment}
                decrement={decrement}
                incrementDisabled={incrementDisabled}
                decrementDisabled={decrementDisabled}
                iconMap={quantityIconMap}
                showAdd={false}
              />
            </CartItemQuantity>
          </BuilderItemQuantityView>
        </BuilderOptionHeader>
        <BuilderOptionDescription>
          <p>{description}</p>
          {allergenAlert.length > 0 && (
            <MenuItemAllergens allergens={allergenAlert} />
          )}
          {isSoldOut && (
            <BuilderOptionSoldOut>Sold out for the day</BuilderOptionSoldOut>
          )}
        </BuilderOptionDescription>
      </BuilderOptionContent>
    </BuilderOptionView>
  )
}

BuilderOption.displayName = 'BuilderOption'
BuilderOption.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  allergens: propTypes.array,
  iconMap: propTypes.object,
  displaySettings: propTypes.object,
}

export default BuilderOption
