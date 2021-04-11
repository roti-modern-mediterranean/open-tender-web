import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { makeTimeIntervals } from '@open-tender/js'
import { Preface } from '@open-tender/components'
import { Checkmark } from './icons'
import { useState } from 'react'

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

const TimePickerConfirm = styled('div')`
  width: 20%;
  display: flex;
  justify-content: center;
`

const TimePickerTimes = styled('div')`
  width: 100%;
  height: 6rem;
  overflow-y: scroll;
`

const TimePickerTimeText = styled(Preface)`
  font-weight: 500;
  font-size: 5rem;
  letter-spacing: 0.4rem;
  line-height: 0.9;
  color: ${(props) => props.theme.colors.beet};
`

const TimePickerTimeView = styled('button')`
  width: 100%;
  height: 6rem;
  padding: 0 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.5;
  }

  span {
    display: block;
  }

  span + span {
    font-size: 4rem;
    margin: 0 0 0 1rem;
  }
`

const TimePickerTime = ({ label, onClick, disabled }) => {
  const [hour, ampm] = label.split(' ')
  return (
    <TimePickerTimeView onClick={onClick} disabled={disabled}>
      <TimePickerTimeText>{hour}</TimePickerTimeText>
      <TimePickerTimeText>{ampm}</TimePickerTimeText>
    </TimePickerTimeView>
  )
}

TimePickerTime.displayName = 'TimePickerTime'
TimePickerTime.propTypes = {
  label: propTypes.string,
  onClick: propTypes.func,
  disabled: propTypes.bool,
}

const TimePickerButtonView = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.6rem;
  height: 4.6rem;
  padding: 0.1rem 0 0;
  border-radius: 2.3rem;
  border: 0.2rem solid ${(props) => props.theme.colors.beet};
  background-color: transparent;
  transition: all 250ms ease;

  &:disabled {
    border: 0.2rem solid ${(props) => props.theme.colors.beet};
    background-color: ${(props) => props.theme.colors.beet};
  }
`

const TimePickerButton = ({ onClick, disabled }) => {
  const theme = useTheme()

  return (
    <TimePickerButtonView onClick={onClick} disabled={disabled}>
      <span>
        <Checkmark
          size="2.2rem"
          color={disabled ? theme.colors.light : theme.colors.beet}
        />
      </span>
    </TimePickerButtonView>
  )
}

const TimePicker = ({
  date,
  minTime,
  maxTime,
  interval,
  setDate,
  selectTime,
}) => {
  const [time, setTime] = useState(null)
  const hasDate = !!date
  // console.log(date, minTime, maxTime, interval)
  const intervals = makeTimeIntervals(date, minTime, maxTime, interval)

  const handleClose = (evt) => {
    if (evt.target.id === 'time-picker-container') {
      setDate(null)
      setTime(null)
    }
  }

  const chooseTime = (evt, time) => {
    evt.preventDefault()
    setTime(time)
    selectTime(time)
    evt.target.blur()
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
                <TimePickerLabelText>Time</TimePickerLabelText>
              </TimePickerLabel>
              <TimePickerSelect>
                <TimePickerTimes>
                  {intervals.map((t) => (
                    <TimePickerTime
                      label={t.label}
                      onClick={(evt) => chooseTime(evt, t.value)}
                      disabled={time ? true : false}
                    />
                  ))}
                </TimePickerTimes>
              </TimePickerSelect>
              <TimePickerConfirm>
                <TimePickerButton disabled={time ? true : false} />
              </TimePickerConfirm>
            </TimePickerView>
          </TimePickerContainer>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

TimePicker.displayName = 'TimePicker'
TimePicker.propTypes = {
  date: propTypes.object,
  minTime: propTypes.object,
  maxTime: propTypes.object,
  intervals: propTypes.number,
  setDate: propTypes.func,
}

export default TimePicker
