import { Fragment, useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { animateScroll } from 'react-scroll'
import { formatDollars, getWidth } from '@open-tender/js'
import {
  ButtonLink,
  ButtonStyled,
  Heading,
  Preface,
  useBuilder,
} from '@open-tender/components'

import { CartFooter, ImageSpinner } from '..'
import { ButtonSmall } from '../buttons'
import {
  ArrowLeft,
  ArrowRight,
  Checkmark,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
} from '../icons'
import BuilderImage from './BuilderImage'
import BuilderOption from './BuilderOption'
import BuilderMadeFor from './BuilderMadeFor'
import BuilderNotes from './BuilderNotes'
import BuilderOptionToggle from './BuilderOptionToggle'
import BuilderItemQuantity from './BuilderItemQuantity'
import { isBrowser } from 'react-device-detect'
import { selectTheme } from '../../slices'
import { useSelector } from 'react-redux'
import BuilderAllergens from './BuilderAllergens'

export const makePriceCals = (item, showCals, hidePrice) => {
  const zeroPrice = !!(item.price === '0.00' || item.price === 0)
  const price = zeroPrice || hidePrice ? null : `${formatDollars(item.price)}`
  const cals = showCals && item.cals ? `${item.cals.toFixed(0)} cal` : null
  const separator = price && cals ? ' / ' : ''
  const priceCals = `${cals || ''}${separator}${price || ''}`
  return priceCals || null
}

const chunkArray = (array, size) => {
  let result = []
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size)
    result.push(chunk)
  }
  return result
}

const BuilderView = styled('form')`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${(props) => props.theme.layout.containerMaxWidth};
  padding: 0 ${(props) => props.theme.layout.padding} 14.5rem;
  margin: ${(props) => props.theme.layout.margin} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 14.5rem;
    margin: 0 auto;
  }
`

const BuilderInfo = styled('div')`
  position: relative;
  flex-grow: 1;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    width: 100%;
  }
`

const BuilderHeader = styled('div')`
  position: relative;
  top: -4rem;
  padding: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    top: 0;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderTitle = styled('div')`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: -16rem;
  height: 15rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    top: -13rem;
    height: 14rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: -9rem;
    height: 10rem;
  }

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
  }
`

const BuilderCategory = styled('h2')`
  display: block;
  line-height: 1;
  font-size: ${(props) => (props.isSmall ? '12rem' : '18rem')};
  margin: -2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: ${(props) => (props.isSmall ? '14rem' : '14rem')};
    margin: -1rem 0 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => (props.isSmall ? '12rem' : '14rem')};
    margin: -1rem 0 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => (props.isSmall ? '7rem' : '10rem')};
    margin: -1rem 0 0;
  }
`

const BuilderNameView = styled('div')`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderName = styled(Heading)`
  font-weight: 600;
  letter-spacing: 0.2em;
  font-size: 5rem;
  line-height: 1;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 3rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: 3rem;
  }
`

const BuilderPrice = styled(Preface)`
  text-align: center;
  font-weight: 500;
  font-size: 3.8rem;
  letter-spacing: 0.03em;
  text-transform: none;
  margin: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 2.6rem;
    margin-top: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: 2.6rem;
    margin-top: 0;
  }
`

const BuilderDescription = styled('p')`
  line-height: ${(props) => props.theme.lineHeight};
  font-size: 1.8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 1.5rem;
    display: block;
    max-width: 62rem;
    margin: 0 auto;
    text-align: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    text-align: left;
  }
`

const BuilderIngredients = styled('div')`
  width: 62rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0 0 0 6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    margin: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 1;
    min-width: 100%;
    max-width: 100%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`

const BuilderIngredientsHeader = styled('div')`
  padding: 2.5rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2.5rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderIngredientsText = styled('div')`
  line-height: ${(props) => props.theme.lineHeight};
  margin: 1rem 0 0;
`

const BuilderIngredientsTitleWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BuilderIngredientsTitle = styled(Preface)`
  font-size: 2.8rem;
  line-height: 1;
  letter-spacing: 0.01em;
  font-weight: 500;
`

const BuilderToggle = styled(ButtonSmall)`
  color: ${(props) => props.theme.colors.beet};
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
  background-color: transparent;

  span span {
    position: relative;
    top: -0.1rem;
    display: inline-block;
    margin: 0 0 0 0.5rem;
  }

  &:focus {
    outline: none;
  }
`

const BuilderGroupsContainer = styled('div')`
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    background-color: ${(props) => props.theme.bgColors.light};
  }
`

const BuilderGroupsNav = styled('div')`
  height: 8rem;
  display: flex;
  align-items: center;
  margin: -1rem 0 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 1rem ${(props) => props.theme.layout.paddingMobile} 0;
    margin: 0 0 1rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 10rem;
    padding: 0 0 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 0;
    overflow-x: scroll;
  }

  & > div {
    display: flex;
    align-items: center;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      justify-content: center;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0;
      justify-content: flex-start;
    }

    & > div {
      padding: 0 0.5rem 0 0;

      &:last-of-type {
        padding: 0;
      }
    }
  }
`

const BuilderGroupsNavButton = styled(ButtonSmall)`
  color: ${(props) =>
    props.isActive || props.isComplete
      ? props.theme.colors.light
      : props.theme.colors.beet};
  background-color: ${(props) =>
    props.isActive
      ? props.theme.colors.beet
      : props.isComplete
      ? props.theme.colors.pepper
      : 'transparent'};
  box-shadow: ${(props) =>
    props.isActive || props.isComplete
      ? '0px 4px 20px rgba(0, 0, 0, 0.25)'
      : 'none'};
  // font-size: 1.6rem;
  // padding: 1.1rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    // font-size: 1.3rem;
    // padding: 0.8rem 1.2rem;
  }

  &:focus {
    outline: none;
  }

  & > span {
    display: block;
  }
`

const BuilderGroupsNavButtonCheck = styled('span')`
  margin: 0.2rem -0.2rem 0 0.5rem;
`

const BuilderGroupsArrows = styled('div')`
  width: 100%;
  margin: 0 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderGroupsArrowLeft = styled('button')`
  cursor: pointer;
  position: relative;
  top: 0.1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 1;
  text-align: center;
  height: 3rem;
  margin: 0 0 0 -1.5rem;
  padding: 0 1.5rem;
  border: 0;
  // @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
  //   padding-right: 1rem;
  // }
`

const BuilderGroupsArrowRight = styled(BuilderGroupsArrowLeft)`
  justify-content: flex-end;
  padding: 0 1.5rem;
  margin: 0 -1.5rem 0 0;
`

const BuilderGroupsArrowText = styled('span')`
  display: block;
  font-weight: 500;
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.beet};
  margin: 0 1rem 0 0;
`

const BuilderGroupsArrowsTitle = styled(Preface)`
  display: block;
  flex-grow: 1;
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-size: 2.8rem;
  line-height: 1;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2.3rem;
  }
`

const BuilderGroupContainer = styled('div')`
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderGroup = styled('div')`
  transition: all 0.25s ease-in-out;
  opacity: ${(props) => (props.isActive ? '1' : '0')};
  visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};
  max-height: ${(props) => (props.isActive ? 'none' : '0')};
  overflow: ${(props) => (props.isActive ? 'visible' : 'hidden')};

  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 -0.5rem;
    // transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  // & > span ~ div {
  //   transform: translateY(5rem);
  // }
`

const BuilderNameNotes = styled('div')`
  padding: 3rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    background-color: ${(props) => props.theme.bgColors.light};
    padding: 3rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderNameNotesWrapper = styled('div')`
  padding: 1.5rem 2rem 2rem;
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
  border-radius: 1.4rem;
`

const BuilderFooter = styled('div')`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14.5rem;
`

const makeMessage = (group) => {
  if (!group) return null
  const { min, max, name } = group
  const lower = name.toLowerCase()
  const singular = lower.endsWith('s') ? lower.slice(0, -1) : lower
  const isVowel = 'aeiou'.includes(singular[0])
  const prefix = isVowel ? 'an' : 'a'
  if (lower.endsWith('pita')) {
    return 'Add a pita?'
  } else if (min === 1 && max === 1) {
    return `Choose your ${singular}`
  } else if (max === 1) {
    return `Add ${prefix} ${singular}?`
  } else {
    return `Choose your ${lower}`
  }
}

const Builder = ({
  menuItem,
  addItemToCart,
  cancel,
  soldOut,
  allergenAlerts,
  displaySettings,
  cartId,
  windowRef,
}) => {
  const {
    item,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  } = useBuilder(menuItem, soldOut)
  const ingredientsRef = useRef(null)
  const navRef = useRef(null)
  const [visited, setVisited] = useState([])
  const [positions, setPositions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeOption, setActiveOption] = useState(null)
  const [perRow, setPerRow] = useState(3)
  const { groups, notes, madeFor, totalPrice } = item
  const imageUrl = item.imageUrl ? item.imageUrl : null
  const {
    calories: showCals,
    madeFor: showMadeFor,
    notes: showNotes,
    // builderImages: showImage,
    // tags: showTags,
    allergens: showAllergens,
  } = displaySettings
  const priceCals = makePriceCals(item, showCals)
  const priceTotal = formatDollars(item.totalPrice)
  const hasGroups = groups.length > 0
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin
  const theme = useSelector(selectTheme)
  const mobileWidth = parseInt(theme.breakpoints.mobile.replace('px', ''))
  const isEdit = item.index !== undefined
  const allergenAlert =
    showAllergens && allergenAlerts && item.allergens.length
      ? item.allergens.filter((allergen) => allergenAlerts.includes(allergen))
      : []
  const activeGroup = groups.find((i, idx) => idx === activeIndex)
  const groupMessage = makeMessage(activeGroup)
  const prevIndex = activeIndex === 0 ? null : activeIndex - 1
  const nextIndex = activeIndex === groups.length - 1 ? null : activeIndex + 1
  const nextGroup = nextIndex
    ? groups.find((i, idx) => idx === nextIndex)
    : null
  const showDone =
    nextGroup === null &&
    !isIncomplete &&
    activeGroup.min === 0 &&
    activeGroup.quantity === 0

  useEffect(() => {
    const width = getWidth()
    const count = width && mobileWidth ? (width > mobileWidth ? 4 : 3) : 3
    setPerRow(count)
  }, [mobileWidth])

  useEffect(() => {
    if (isIncomplete || isEdit) setIsOpen(true)
  }, [isIncomplete, isEdit])

  useEffect(() => {
    if (isOpen && !isBrowser) {
      const topOffset = ingredientsRef.current.getBoundingClientRect().top
      animateScroll.scrollTo(topOffset, {
        container: windowRef.current,
        duration: 500,
        smooth: true,
      })
    }
  }, [isOpen, windowRef])

  useEffect(() => {
    if (isOpen && hasGroups) {
      const elements = document.getElementsByClassName('builder-nav')
      const starting = Array.from(elements).map(
        (e) => e.getBoundingClientRect().x
      )
      setPositions(starting)
    }
  }, [isOpen, hasGroups])

  useEffect(() => {
    if (navRef.current) {
      navRef.current.scrollLeft = positions[activeIndex] - 20
    }
  }, [activeIndex, positions])

  const toggleIngredients = (evt) => {
    evt.preventDefault()
    if (isOpen) {
      if (!isBrowser) {
        animateScroll.scrollTo(0, {
          container: windowRef.current,
          duration: 500,
          smooth: true,
        })
        setTimeout(() => setIsOpen(false), 500)
      } else {
        setIsOpen(false)
      }
    } else {
      setIsOpen(true)
    }
  }

  const toggleGroups = (evt, index) => {
    evt.preventDefault()
    const unique = [...new Set([...visited, activeIndex])]
    setVisited(unique)
    setActiveIndex(index)
    setActiveOption(null)
  }

  return (
    <BuilderView>
      <BuilderInfo>
        <BuilderImage imageUrl={imageUrl} spinner={<ImageSpinner />} />
        <BuilderHeader>
          <BuilderTitle>
            <div>
              <BuilderCategory isSmall={item.category.length > 6}>
                {item.category}
              </BuilderCategory>
              <BuilderNameView>
                <BuilderName as="div">{item.name}</BuilderName>
              </BuilderNameView>
            </div>
          </BuilderTitle>
          {priceCals ? (
            <BuilderPrice as="p">{priceCals}</BuilderPrice>
          ) : (
            <BuilderPrice as="p">&nbsp;</BuilderPrice>
          )}
          <BuilderDescription>{item.description}</BuilderDescription>
          <BuilderAllergens allergens={allergenAlert} />
        </BuilderHeader>
      </BuilderInfo>
      <BuilderIngredients ref={ingredientsRef}>
        <BuilderIngredientsHeader>
          <BuilderIngredientsTitleWrapper>
            <BuilderIngredientsTitle>Ingredients</BuilderIngredientsTitle>
            <BuilderToggle onClick={toggleIngredients}>
              {isOpen ? (
                <span>
                  Close <ChevronUp />
                </span>
              ) : (
                <span>
                  Customize <ChevronDown />
                </span>
              )}
            </BuilderToggle>
          </BuilderIngredientsTitleWrapper>
          <BuilderIngredientsText>
            Go ahead, make it your own. Click to customize.
          </BuilderIngredientsText>
        </BuilderIngredientsHeader>
        {isOpen && (
          <>
            {hasGroups && (
              <BuilderGroupsContainer>
                <BuilderGroupsNav ref={navRef}>
                  <div>
                    {groups.map((group, index) => {
                      // const isComplete =
                      //   (group.min > 0 && group.quantity >= group.min) ||
                      //   (group.max > 0 && group.quantity === group.max)
                      const isComplete = visited.includes(index) || isEdit
                      return (
                        <div
                          key={group.name}
                          id={`nav-${index}`}
                          className="builder-nav"
                        >
                          <BuilderGroupsNavButton
                            onClick={(evt) => toggleGroups(evt, index)}
                            isActive={index === activeIndex}
                            isComplete={isComplete}
                          >
                            <span>{group.name}</span>
                            {isComplete && (
                              <BuilderGroupsNavButtonCheck>
                                <Checkmark />
                              </BuilderGroupsNavButtonCheck>
                            )}
                          </BuilderGroupsNavButton>
                        </div>
                      )
                    })}
                    {/* <div style={{ width: '3rem' }}>&nbsp;</div> */}
                  </div>
                </BuilderGroupsNav>
                <BuilderGroupsArrows>
                  {prevIndex !== null && (
                    <BuilderGroupsArrowLeft
                      onClick={(evt) => toggleGroups(evt, prevIndex)}
                    >
                      <ArrowLeft size="1.3rem" color={theme.colors.beet} />
                    </BuilderGroupsArrowLeft>
                  )}
                  <BuilderGroupsArrowsTitle>
                    {groupMessage}
                  </BuilderGroupsArrowsTitle>
                  <BuilderGroupsArrowRight
                    onClick={
                      showDone
                        ? () => addItemToCart(item)
                        : (evt) => toggleGroups(evt, nextIndex)
                    }
                  >
                    {nextGroup ? (
                      <>
                        <BuilderGroupsArrowText>
                          Next:{' '}
                          {nextGroup.name.toLowerCase().includes('pita')
                            ? 'Pitas'
                            : nextGroup.name}
                        </BuilderGroupsArrowText>
                        <ArrowRight size="1.3rem" color={theme.colors.beet} />
                      </>
                    ) : showDone ? (
                      <BuilderGroupsArrowText>
                        Nah, I'm Good
                      </BuilderGroupsArrowText>
                    ) : null}
                  </BuilderGroupsArrowRight>
                </BuilderGroupsArrows>
                <BuilderGroupContainer>
                  {groups.map((group, index) => {
                    const chunked = chunkArray(group.options, perRow)
                    return (
                      <BuilderGroup
                        key={group.id}
                        isActive={index === activeIndex}
                      >
                        {chunked.map((options, idx) => {
                          const active = options.find(
                            (i) => `${group.id}-${i.id}` === activeOption
                          )
                          const show = active ? true : false
                          const props = {
                            show,
                            option: active,
                            setActiveOption,
                          }
                          return (
                            <Fragment key={idx}>
                              <BuilderOptionToggle {...props} />
                              <div>
                                {options.map((option) => {
                                  const key = `${group.id}-${option.id}`
                                  const props = {
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
                                    lastIndex: groups.length - 1,
                                  }
                                  return <BuilderOption key={key} {...props} />
                                })}
                              </div>
                            </Fragment>
                          )
                        })}
                      </BuilderGroup>
                    )
                  })}
                </BuilderGroupContainer>
              </BuilderGroupsContainer>
            )}
            {((showMadeFor && !cartId) || showNotes) && (
              <BuilderNameNotes>
                <BuilderNameNotesWrapper>
                  {showMadeFor && !cartId && (
                    <BuilderMadeFor madeFor={madeFor} setMadeFor={setMadeFor} />
                  )}
                  {showNotes && (
                    <BuilderNotes notes={notes} setNotes={setNotes} />
                  )}
                </BuilderNameNotesWrapper>
              </BuilderNameNotes>
            )}
          </>
        )}
      </BuilderIngredients>
      <BuilderFooter>
        <CartFooter
          label={
            <BuilderItemQuantity
              item={item}
              increment={increment}
              decrement={decrement}
              setQuantity={setQuantity}
            />
          }
          total={
            <span>
              Total Price
              <span>{priceTotal}</span>
            </span>
          }
          back={
            <ButtonLink onClick={cancel}>
              <ChevronLeft />
              <Preface>Back To Menu</Preface>
            </ButtonLink>
          }
          add={
            <ButtonStyled
              onClick={() => addItemToCart(item)}
              disabled={isIncomplete}
              size="big"
              color="cart"
            >
              Add To Cart
            </ButtonStyled>
          }
        />
      </BuilderFooter>
    </BuilderView>
  )
}

Builder.displayName = 'Builder'
Builder.propTypes = {
  menuItem: propTypes.object,
  addItemToCart: propTypes.func,
  cancel: propTypes.func,
  soldOut: propTypes.array,
  allergenAlerts: propTypes.array,
  displaySettings: propTypes.object,
  cartId: propTypes.number,
  windowRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
}

export default Builder
