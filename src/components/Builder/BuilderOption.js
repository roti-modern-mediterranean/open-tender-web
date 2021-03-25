import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

import { ImageSpinner } from '..'
import { makePriceCals } from './Builder'
import BuilderOptionImage from './BuilderOptionImage'
import { Checkmark } from '../icons'

const BuilderOptionView = styled('button')`
  position: relative;
  z-index: 1;
  display: block;
  flex: 0 0 25%;
  padding: 0 0.5rem;
  margin: 0 0 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex: 0 0 16.66667%;
    padding: 0;
    margin: 0 0 1.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 20%;
    padding: 0;
    margin: 0 0 1.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 33.33333%;
    padding: 0;
    margin: 0 0 1.5rem;
  }
`

const BuilderOptionInfo = styled('span')`
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
`

const BuilderOptionPrice = styled(Heading)`
  display: block;
  font-size: 1rem;
  font-weight: normal;
  text-transform: none;
  margin: 0.5rem 0 0;
  color: ${(props) => props.theme.colors.primary};
`

const BuilderOptionArrow = styled('span')`
  display: block;
  position: absolute;
  top: -1.8rem;
  left: 50%;
  transform: translate3D(-50%, 0, 0) rotate(45deg);
  width: 1.6rem;
  height: 1.6rem;
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
  border-top: 0;
  border-left: 0;
  background-color: ${(props) => props.theme.bgColors.light};
  transition: all 250ms ease;
  opacity: ${(props) => (props.show ? '1' : '0')};
  visiblity: ${(props) => (props.show ? 'visible' : 'hidden')};
`

const BuilderOptionCountView = styled('span')`
  display: block;
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  width: ${(props) => (props.quantity === 2 ? '4rem' : '2.6rem')};
  height: ${(props) => (props.quantity === 2 ? '4rem' : '2.6rem')};
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

  & > span {
    display: block;
    font-family: 'Barlow', sans-serif;
    font-size: 1.8rem;
  }
`

const BuilderOptionCount = ({ quantity }) => {
  return (
    <BuilderOptionCountView show={quantity > 0} quantity={quantity}>
      <span>{quantity === 2 ? '2X' : <Checkmark />}</span>
    </BuilderOptionCountView>
  )
}

BuilderOptionCount.displayName = 'BuilderOptionCount'
BuilderOptionCount.propTypes = {
  quantity: propTypes.number,
}

const BuilderOption = ({
  group,
  option,
  allergens,
  displaySettings,
  activeOption,
  setActiveOption,
}) => {
  const { calories: showCals } = displaySettings
  const optionKey = `${group.id}-${option.id}`
  const isActive = activeOption === optionKey
  const hidePrice =
    group.included !== 0 &&
    (group.included === group.max || group.quantity < group.included)
  const priceCals = makePriceCals(option, showCals, hidePrice)
  const { quantity } = option
  // const isCheckbox = group.options.filter((i) => i.max !== 1).length === 0
  // const groupAtMax = group.max !== 0 && group.quantity === group.max
  // const optionAtMax = option.max !== 0 && option.quantity === option.max
  // const incrementDisabled = groupAtMax || optionAtMax
  // const groupAtMin = group.min !== 0 && group.quantity === group.min
  // const optionAtMin = option.min !== 0 && option.quantity === option.min
  // const decrementDisabled = groupAtMin || optionAtMin || option.quantity === 0
  // const decrementDisabled = option.quantity === 0

  const onClick = (evt) => {
    evt.preventDefault()
    if (isActive) {
      setActiveOption(null)
    } else {
      setActiveOption(optionKey)
    }
    evt.target.blur()
  }

  return (
    <BuilderOptionView onClick={onClick}>
      <BuilderOptionArrow show={isActive} />
      <BuilderOptionCount quantity={quantity} />
      <BuilderOptionImage
        imageUrl={option.imageUrl}
        spinner={<ImageSpinner />}
      />
      <BuilderOptionInfo>
        <BuilderOptionName>{option.name}</BuilderOptionName>
        <BuilderOptionPrice>{priceCals}</BuilderOptionPrice>
      </BuilderOptionInfo>
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
  displaySettings: propTypes.object,
}

export default BuilderOption
