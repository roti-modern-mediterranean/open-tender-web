import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'
import BuilderNutrition from './BuilderNutrition'
import { X } from 'react-feather'

const BotView = styled('span')`
  display: block;
  position: relative;
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

const BotClose = styled('button')`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.beet};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    right: 0.7rem;
  }
`

const BotTitle = styled(Preface)`
  display: block;
  width: 100%;
  padding: 1.5rem 2.5rem 0.5rem 2.4rem;
  color: ${(props) => props.theme.colors.beet};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1rem 1.5rem 0.5rem 1.4rem;
  }
`
const BuilderOptionToggleContent = ({ show, option, setActiveOption }) => {
  const { nutritionalInfo } = option || {}

  const toggleNutrition = (evt) => {
    evt.preventDefault()
    setActiveOption(null)
  }

  return (
    <BotView show={show} showInfo={show}>
      <BotClose onClick={toggleNutrition}>
        <X size={null} />
      </BotClose>
      <BotTitle>Nutritional Info</BotTitle>
      <BuilderNutrition nutritionalInfo={nutritionalInfo} show={true} />
    </BotView>
  )
}

BuilderOptionToggleContent.displayName = 'BuilderOptionToggleContent'
BuilderOptionToggleContent.propTypes = {
  show: propTypes.bool,
  option: propTypes.object,
  setActiveOption: propTypes.func,
}

const BuilderOptionToggle = (props) => {
  return <BuilderOptionToggleContent {...props} />
}

BuilderOptionToggle.displayName = 'BuilderOptionToggle'
BuilderOptionToggle.propTypes = {
  props: propTypes.object,
}

export default BuilderOptionToggle
