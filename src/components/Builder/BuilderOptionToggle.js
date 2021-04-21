import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'
import { useState } from 'react'
import BuilderNutrition from './BuilderNutrition'

const BotView = styled('span')`
  display: block;
  position: relative;
  // z-index: 2;
  border-radius: 1.4rem;
  overflow: hidden;
  transition: all 250ms ease;
  color: ${(props) => props.theme.colors.beet};
  background-color: ${(props) => props.theme.bgColors.light};
  border-color: ${(props) => props.theme.colors.beet};
  border-style: solid;
  border-width: 0;
  max-height: ${(props) =>
    props.showInfo ? '25rem' : props.show ? '5rem' : '0rem'};
  opacity: ${(props) => (props.show ? '1' : '0')};
  visiblity: ${(props) => (props.show ? 'visible' : 'hidden')};
  margin: ${(props) => (props.show ? '0 0 2rem' : '0')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    border-width: ${(props) => (props.show ? '0.1rem' : '0')};
    margin: ${(props) => (props.show ? '0 0 1rem' : '0')};
  }
`

const BotButtons = styled('div')`
  width: 100%;
  height: 5rem;
  padding: 0 1rem 0.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const BotButton = styled(Preface)`
  display: block;
  padding: 0;
  line-height: 1;
  font-weight: 500;
  font-size: 2.4rem;
  letter-spacing: -0.04em;
  color: ${(props) => props.theme.colors.beet};
`

const BotIcon = styled(BotButton)`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
  color: ${(props) => props.theme.colors[props.isOpen ? 'light' : 'beet']};
  background-color: ${(props) =>
    props.theme.colors[props.isOpen ? 'beet' : 'light']};

  span {
    text-transform: none;
    display: block;
    line-height: 0;
  }
`

const BotSeparator = styled('div')`
  width: 0.1rem;
  height: 1.8rem;
  background-color: ${(props) => props.theme.colors.beet};
`

const checkHasNutritionalInfo = (nutritionalInfo) => {
  const { serving_size } = nutritionalInfo || {}
  return !serving_size || parseFloat(serving_size) === 0 ? false : true
}

const BuilderOptionToggleContent = ({
  show,
  group,
  option,
  setOptionQuantity,
  setActiveOption,
  setActiveGroup,
  index,
  lastIndex,
}) => {
  const [showInfo, setShowInfo] = useState(false)
  const { nutritionalInfo, min = 0, max = 0, quantity: qty = 0 } = option || {}
  const { max: groupMax = 0, quantity: groupQty = 0 } = group
  const remaining = groupMax === 0 ? 1000 : groupMax - groupQty + qty
  const hasNutrition = checkHasNutritionalInfo(nutritionalInfo)

  // if (show) {
  //   console.log(min, max, qty)
  //   console.log(groupMin, groupMax, groupQty)
  //   console.log(remaining)
  // }

  const setQuantity = (evt, quantity) => {
    evt.preventDefault()
    setOptionQuantity(group.id, option.id, quantity)
    if (quantity === remaining && index + 1 <= lastIndex) {
      setActiveGroup(index + 1)
    }
    setActiveOption(null)
  }

  const toggleNutrition = (evt) => {
    evt.preventDefault()
    if (hasNutrition) setShowInfo(!showInfo)
  }

  return (
    <BotView show={show} showInfo={showInfo}>
      <BotButtons>
        <BotButton
          as="button"
          onClick={(evt) => setQuantity(evt, 0)}
          disabled={min > 0}
        >
          None
        </BotButton>
        <BotSeparator />
        <BotButton
          as="button"
          onClick={(evt) => setQuantity(evt, 1)}
          disabled={min > 1 || remaining < 1}
        >
          Single
        </BotButton>
        <BotSeparator />
        {max !== 1 && (
          <>
            <BotButton
              as="button"
              onClick={(evt) => setQuantity(evt, 2)}
              disabled={max < 2 || remaining < 2}
            >
              Double
            </BotButton>
            <BotSeparator />
          </>
        )}
        <BotIcon
          as="button"
          onClick={toggleNutrition}
          disabled={!hasNutrition}
          isOpen={showInfo}
        >
          <span>i</span>
        </BotIcon>
      </BotButtons>
      {hasNutrition && (
        <BuilderNutrition nutritionalInfo={nutritionalInfo} show={true} />
      )}
    </BotView>
  )
}

BuilderOptionToggleContent.displayName = 'BuilderOptionToggleContent'
BuilderOptionToggleContent.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  setOptionQuantity: propTypes.func,
  setActiveOption: propTypes.func,
  setActiveGroup: propTypes.func,
  index: propTypes.number,
  lastIndex: propTypes.number,
}

const BuilderOptionToggle = (props) => {
  return <BuilderOptionToggleContent {...props} />
}

BuilderOptionToggle.displayName = 'BuilderOptionToggle'
BuilderOptionToggle.propTypes = {
  props: propTypes.object,
}

export default BuilderOptionToggle
