import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const BuilderOptionToggleView = styled('span')`
  // position: absolute;
  // z-index: 1;
  // top: -6rem;
  // left: ${(props) => props.offset};
  // width: ${(props) => props.width};
  display: block;
  padding: 1rem 2rem;
  border-radius: 1.4rem;
  color: ${(props) => props.theme.colors.beet};
  background-color: ${(props) => props.theme.bgColors.light};
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
`

const BuilderOptionToggle = ({ option, width, offset }) => {
  console.log('BuilderToggle', option)
  return (
    <TransitionGroup component={null}>
      {option ? (
        <CSSTransition
          key="optionToggle"
          classNames="tooltip"
          timeout={{ enter: 250, exit: 250 }}
        >
          <BuilderOptionToggleView width={width} offset={offset}>
            <p>Toggle {option.name}</p>
          </BuilderOptionToggleView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

BuilderOptionToggle.displayName = 'BuilderOptionToggle'
BuilderOptionToggle.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  allergens: propTypes.array,
  displaySettings: propTypes.object,
  width: propTypes.string,
  offset: propTypes.string,
}

export default BuilderOptionToggle
