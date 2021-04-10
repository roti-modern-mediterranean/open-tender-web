import { useTheme } from '@emotion/react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'
import { Checkmark } from './icons'

const TimePickerContainer = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: rgba(37, 39, 42, 0.3);
  // opacity: 1;
  // animation: fade-in 0.125s ease-in-out 0s forwards;
`

const TimePickerView = styled('div')`
  width: 100%;
  padding: 2.5rem 1rem 2.5rem;
  border-radius: 1.4rem;
  background-color: ${(props) => props.theme.colors.light};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.13);
  // opacity: 0;
  // animation: slide-up 0.25s ease-in-out 0.125s forwards;
`

const TimePickerLabel = styled('div')`
  width: 20%;
  text-align: center;
`

const TimePickerLabelText = styled(Preface)`
  font-weight: 500;
  font-size: 2.4rem;
`

const TimePickerSelect = styled('div')`
  width: 60%;
  text-align: center;
`

const TimePickerSelectText = styled(Preface)`
  display: inline-block;
  font-weight: 500;
  font-size: 5rem;
  letter-spacing: 0.4rem;
  line-height: 0.9;
  color: ${(props) => props.theme.colors.beet};
`

const TimePickerConfirm = styled('div')`
  width: 20%;
  display: flex;
  justify-content: center;
`

const TimePickerButtonView = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.6rem;
  height: 4.6rem;
  padding: 0.1rem 0 0;
  border-radius: 2.3rem;
  color: ${(props) => props.theme.colors.light};
  border: 0.2rem solid ${(props) => props.theme.colors.beet};
  background-color: transparent;
  transition: all 250ms ease;
`

const TimePickerButton = ({ onClick }) => {
  const theme = useTheme()

  return (
    <TimePickerButtonView onClick={onClick}>
      <span>
        <Checkmark size="2.2rem" color={theme.colors.beet} />
      </span>
    </TimePickerButtonView>
  )
}

const TimePicker = ({ date, minTime, maxTime, intervals, setDate }) => {
  const hasDate = !!date

  const handleClose = (evt) => {
    if (evt.target.id === 'time-picker-container') {
      setDate(null)
    }
  }

  return (
    <TransitionGroup component={null}>
      {hasDate ? (
        <CSSTransition
          key="modal"
          classNames="md"
          timeout={{ enter: 250, exit: 250 }}
        >
          <TimePickerContainer id="time-picker-container" onClick={handleClose}>
            <TimePickerView>
              <TimePickerLabel>
                <TimePickerLabelText>Hour</TimePickerLabelText>
              </TimePickerLabel>
              <TimePickerSelect>
                <TimePickerSelectText>12:50 PM</TimePickerSelectText>
              </TimePickerSelect>
              <TimePickerConfirm>
                <TimePickerButton />
              </TimePickerConfirm>
            </TimePickerView>
          </TimePickerContainer>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

export default TimePicker
