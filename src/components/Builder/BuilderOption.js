import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading, Preface, BuilderQuantity } from '@open-tender/components'

import { ImageSpinner } from '..'
import { makePriceCals } from './Builder'
import BuilderOptionImage from './BuilderOptionImage'
import { Checkmark, MinusSign, PlusSign } from '../icons'
import MenuItemAllergens from '../pages/Menu/MenuItemAllergens'

const BuilderOptionView = styled('div')`
  position: relative;
  z-index: 1;
  display: block;
  flex: 0 0 ${(props) => props.width || '33.33333%'};
  padding: 0 0.5rem;
  margin: 0 0 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
  }
`

const BuilderOptionButton = styled('button')`
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
`

const BuilderOptionInfo = styled('span')`
  position: relative;
  display: block;
  width: 100%;
  margin: 1rem 0 0;
  text-align: center;
  line-height: 1;
`

const BuilderOptionName = styled(Heading)`
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};

  & > span {
    display: inline;
  }
`

const BuilderOptionPrice = styled(Heading)`
  display: block;
  font-size: 1.2rem;
  font-weight: normal;
  text-transform: none;
  margin: 0.3rem 0 0;
  color: ${(props) => props.theme.colors.primary};
`

const BuilderOptionArrow = styled('span')`
  display: block;
  position: absolute;
  top: -2.8rem;
  left: 50%;
  transform: translate3D(-50%, 0, 0) rotate(45deg);
  width: 1.6rem;
  height: 1.6rem;

  background-color: ${(props) => props.theme.bgColors.light};
  transition: all 250ms ease;
  opacity: ${(props) => (props.show ? '1' : '0')};
  visiblity: ${(props) => (props.show ? 'visible' : 'hidden')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: -1.8rem;
    border: 0.1rem solid ${(props) => props.theme.colors.beet};
    border-top: 0;
    border-left: 0;
  }
`

const BuilderOptionSoldOut = styled(Preface)`
  margin: 0.5rem 0 0;
  color: ${(props) => props.theme.colors.alert};
  font-size: 1.6rem;
  font-weight: 500;
`

const BuilderOptionQuantity = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0.5rem 0 0;
  }

  & > div {
    background-color: transparent;
    border-radius: 0;
    min-height: 0;

    button {
      width: 2rem;
      height: 2rem;
      padding: 0;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${(props) => props.theme.colors.beet};

      &:hover,
      &:active,
      &:focus {
        background-color: ${(props) => props.theme.colors.primary};
      }
    }

    button:first-of-type {
      svg {
        min-height: 0.1rem;
      }
    }

    input {
      width: 3rem;
      height: auto;
      padding: 0;
      border: 0;
      line-height: 1;
      font-family: ${(props) => props.theme.fonts.preface.family};
      font-weight: 600;
      font-size: ${(props) => props.theme.fonts.sizes.main};
      color: ${(props) => props.theme.colors.primary};
      background-color: transparent;
    }
  }
`

// const BuilderOptionNutritionalInfo = styled('button')`
//   position: absolute;
//   z-index: 2;
//   top: 0.6rem;
//   left: 1rem;
//   width: 1.8rem;
//   height: 1.8rem;
//   border-radius: 1rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 0.1rem solid ${(props) => props.theme.colors.beet};
//   color: ${(props) => props.theme.colors[props.isOpen ? 'light' : 'beet']};
//   background-color: ${(props) =>
//     props.theme.colors[props.isOpen ? 'beet' : 'transparent']};

//   span {
//     text-transform: none;
//     display: block;
//     line-height: 0;
//     font-size: 1.2rem;
//   }
// `

const BuilderOptionNutritionalInfo = styled('button')`
  position: relative;
  top: -0.1rem;
  display: inline;

  & > span {
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 0.5rem 0 0;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.1rem solid ${(props) => props.theme.colors.beet};
    color: ${(props) => props.theme.colors[props.isOpen ? 'light' : 'beet']};
    background-color: ${(props) =>
      props.theme.colors[props.isOpen ? 'beet' : 'transparent']};

    & > span {
      text-transform: none;
      display: block;
      line-height: 0;
      font-size: 1.2rem;
    }
  }
`

const BuilderOptionCountView = styled('span')`
  display: block;
  position: absolute;
  z-index: 3;
  top: -0.8rem;
  right: -0.5rem;
  width: ${(props) => (props.quantity > 1 ? '4rem' : '2.6rem')};
  height: ${(props) => (props.quantity > 1 ? '4rem' : '2.6rem')};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.beet};
  transition: all 250ms ease;
  opacity: ${(props) => (props.show ? '1' : '0')};
  visiblity: ${(props) => (props.show ? 'visible' : 'hidden')};
  transform: ${(props) => (props.show ? 'scale(1)' : 'scale(0)')};
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.25);
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: 1rem;
    right: 1rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: 0;
    right: 0;
  }

  & > span {
    display: block;
    font-family: 'Barlow', sans-serif;
    font-size: 1.8rem;
  }
`

const BuilderOptionCount = ({ quantity }) => {
  return (
    <BuilderOptionCountView show={quantity > 0} quantity={quantity}>
      <span>{quantity > 1 ? `${quantity}X` : <Checkmark />}</span>
    </BuilderOptionCountView>
  )
}

BuilderOptionCount.displayName = 'BuilderOptionCount'
BuilderOptionCount.propTypes = {
  quantity: propTypes.number,
}

const checkHasNutritionalInfo = (nutritionalInfo) => {
  const { serving_size } = nutritionalInfo || {}
  return !serving_size || parseFloat(serving_size) === 0 ? false : true
}

const quantityIconMap = {
  plus: <PlusSign size={12} />,
  minus: <MinusSign size={12} />,
}

const BuilderOption = ({
  perRow,
  group,
  option,
  soldOut,
  allergenAlerts,
  displaySettings,
  incrementOption,
  decrementOption,
  setOptionQuantity,
  activeOption,
  setActiveOption,
  setActiveIndex,
  index,
  lastIndex,
  isQuantityAlwaysShown=false,
  className=undefined
}) => {
  const { calories: showCals, allergens: showAllergens } = displaySettings
  const optionKey = `${group.id}-${option.id}`
  const isActive = activeOption === optionKey
  const hidePrice =
    group.included !== 0 &&
    (group.included === group.max || group.quantity < group.included)
  const priceCals = makePriceCals(option, showCals, hidePrice)
  const { nutritionalInfo, quantity = 0, max = 0 } = option || {}
  const { max: groupMax = 0, quantity: groupQty = 0 } = group
  const remaining = groupMax === 0 ? 1000 : groupMax - groupQty
  const hasNutrition = checkHasNutritionalInfo(nutritionalInfo)
  const width = `${parseFloat((1 / perRow) * 100).toFixed(5)}%`
  const isSoldOut = soldOut ? soldOut.includes(option.id) : false
  const allergens = showAllergens ? option.allergens : []
  const allergenAlert =
    allergenAlerts && allergens.length
      ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
      : []

  const setQuantity = (evt) => {
    evt.preventDefault()
    const qty = quantity ? 0 : 1
    setOptionQuantity(group.id, option.id, qty)
    // if (qty > 0 && qty === remaining && index + 1 <= lastIndex) {
    //   setTimeout(() => {
    //     setActiveIndex(index + 1)
    //   }, 650)
    // }
    setActiveOption(null)
  }

  const increment = () => {
    incrementOption(group.id, option.id)
  }

  const decrement = () => {
    decrementOption(group.id, option.id)
  }

  const onClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (isSoldOut) return
    if (isActive) {
      setActiveOption(null)
    } else {
      setActiveOption(optionKey)
    }
    evt.target.blur()
  }

  return (
    <BuilderOptionView width={width} className={className}>
      <BuilderOptionButton
        onClick={setQuantity}
        width={width}
        disabled={isSoldOut || (remaining === 0 && quantity === 0)}
      >
        <BuilderOptionArrow show={isActive} />
        <BuilderOptionCount quantity={quantity} />
        <BuilderOptionImage
          imageUrl={option.imageUrl}
          spinner={<ImageSpinner />}
        />
      </BuilderOptionButton>
      {(isQuantityAlwaysShown || (quantity > 0 && (max > 1 || max === 0))) && (
        <BuilderOptionQuantity>
          <BuilderQuantity
            item={option}
            // adjust={setQuantity}
            increment={increment}
            decrement={decrement}
            incrementDisabled={quantity === max}
            decrementDisabled={quantity === 0}
            iconMap={quantityIconMap}
          />
        </BuilderOptionQuantity>
      )}
      <BuilderOptionInfo>
        <BuilderOptionName>
          {hasNutrition && (
            <BuilderOptionNutritionalInfo onClick={onClick} isOpen={isActive}>
              <span>
                <span>i</span>
              </span>
            </BuilderOptionNutritionalInfo>
          )}
          <span>{option.name}</span>
        </BuilderOptionName>
        <BuilderOptionPrice>{priceCals}</BuilderOptionPrice>
        {isSoldOut && (
          <BuilderOptionSoldOut as="p">Sold out</BuilderOptionSoldOut>
        )}
        <MenuItemAllergens
          allergens={allergenAlert}
          includeText={false}
          style={{ textAlign: 'center', margin: '0.5rem 0 0 1.5rem' }}
        />
      </BuilderOptionInfo>
    </BuilderOptionView>
  )
}

BuilderOption.displayName = 'BuilderOption'
BuilderOption.propTypes = {
  perRow: propTypes.number,
  group: propTypes.object,
  option: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  allergens: propTypes.array,
  displaySettings: propTypes.object,
}

export default BuilderOption
