import { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

import { ImageSpinner } from '..'
import { makePriceCals } from './Builder'
import BuilderOptionImage from './BuilderOptionImage'
import BuilderOptionToggle from './BuilderOptionToggle'

const BuilderOptionView = styled('button')`
  position: relative;
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

// const BuilderOptionToggle = styled('span')`
//   position: absolute;
//   z-index: 1;
//   top: -6rem;
//   // height: 5rem;
//   overflow: hidden;
//   // transition: all 0.125s ease-in-out;

//   left: ${(props) => props.offset};
//   width: ${(props) => props.width};
//   opacity: ${(props) => (props.isOpen ? '1' : '0')};
//   visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
//   max-height: ${(props) => (props.isOpen ? 'none' : '0')};
//   color: ${(props) => props.theme.colors.beet};
//   background-color: ${(props) => props.theme.bgColors.primary};
// `

const BuilderOption = ({
  group,
  option,
  adjust,
  increment,
  decrement,
  allergens,
  displaySettings,
  activeOption,
  setActiveOption,
}) => {
  const optionRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [width, setWidth] = useState(0)
  const [offset, setOffset] = useState(0)
  const { calories: showCals } = displaySettings
  const optionKey = `${group.id}-${option.id}`
  const isActive = activeOption === optionKey
  const priceCals = makePriceCals(option, showCals)
  const isCheckbox = group.options.filter((i) => i.max !== 1).length === 0
  const groupAtMax = group.max !== 0 && group.quantity === group.max
  const optionAtMax = option.max !== 0 && option.quantity === option.max
  const incrementDisabled = groupAtMax || optionAtMax
  // const groupAtMin = group.min !== 0 && group.quantity === group.min
  // const optionAtMin = option.min !== 0 && option.quantity === option.min
  // const decrementDisabled = groupAtMin || optionAtMin || option.quantity === 0
  const decrementDisabled = option.quantity === 0
  const hidePrice =
    group.included !== 0 &&
    (group.included === group.max || group.quantity < group.included)

  useEffect(() => {
    if (optionRef) {
      const width = optionRef.current.getBoundingClientRect().width
      const widthInRem = `${(width * 3) / 10}rem`
      const left = optionRef.current.getBoundingClientRect().x
      const right = window.innerWidth - left - width
      const offset = left < width ? 0 : right < width ? -2 * width : -width
      const offsetInRem = `${offset / 10}rem`
      setWidth(widthInRem)
      setOffset(offsetInRem)
    }
  }, [optionRef])

  const onClick = (evt) => {
    evt.preventDefault()
    // if (isOpen) {
    //   setIsOpen(false)
    // } else {
    //   setIsOpen(true)
    // }
    if (isActive) {
      setActiveOption(null)
    } else {
      setActiveOption(optionKey)
    }
    evt.target.blur()
  }

  console.log(isActive)

  return (
    <BuilderOptionView
      ref={optionRef}
      onClick={onClick}
      // onFocus={() => setIsOpen(true)}
      // onBlur={() => setIsOpen(false)}
    >
      {/* {isOpen && (
        <BuilderOptionToggle width={width} offset={offset} isOpen={isOpen}>
          <p>Toggle {option.name}</p>
        </BuilderOptionToggle>
      )} */}
      {/* <BuilderOptionToggle
        width={width}
        offset={offset}
        isOpen={isOpen}
        option={option}
      /> */}
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
