import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { makeTimeIntervals } from '@open-tender/js'
import { Preface } from '@open-tender/components'
import { Checkmark, TriangleDown, TriangleUp } from './icons'
import { useEffect, useMemo, useRef, useState } from 'react'
import { format } from 'date-fns'

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
  padding: 1.5rem 1rem 1.5rem;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span svg {
    transition: all 0.15s ease;
  }

  span:first-of-type {
    margin: 0 0 0.5rem;
  }

  span:last-of-type {
    margin: 0.5rem 0 0;
  }
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

const TimePickerTimeView = styled('div')`
  width: 100%;
  height: 100%;
  padding: 0 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: block;
  }

  span + span {
    font-size: 4rem;
    margin: 0 0 0 1rem;
  }
`

const TimePickerTime = ({ label, index }) => {
  const [hour, ampm] = label.split(' ')
  return (
    <TimePickerTimeView name="time-slot" id={`time-${index}`}>
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

  &:hover,
  &:active,
  &:disabled {
    border: 0.2rem solid ${(props) => props.theme.colors.beet};
    background-color: ${(props) => props.theme.colors.beet};

    span svg {
      fill: ${(props) => props.theme.colors.light};
    }
  }

  &:disabled {
    opacity: 0.5;
  }
`

const TimePickerButton = ({ onClick, disabled }) => {
  const theme = useTheme()

  return (
    <TimePickerButtonView onClick={onClick} disabled={disabled}>
      <span>
        <Checkmark
          size="2.2rem"
          color={theme.colors.beet}
          // color={disabled ? theme.colors.light : theme.colors.beet}
        />
      </span>
    </TimePickerButtonView>
  )
}

const getActiveElement = (elements, topOffset) => {
  const filtered = elements.filter(
    (i) => i.getBoundingClientRect().top <= topOffset
  )
  const active = filtered.reduce(
    (max, i) =>
      max && max.getBoundingClientRect().top > i.getBoundingClientRect().top
        ? max
        : i,
    null
  )
  return active
}

const TimePicker = ({
  date,
  setDate,
  selectTime,
  interval,
  excludeTimes,
  minTime,
  maxTime,
}) => {
  const theme = useTheme()
  const scrollRef = useRef(null)
  const [time, setTime] = useState(null)
  const [active, setActive] = useState(0)
  const [offset, setOffset] = useState(0)
  const [selected, setSelected] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const hasDate = !!date
  const dateStr = date ? format(date, 'M/d') : null
  const intervals = useMemo(
    () => makeTimeIntervals(date, minTime, maxTime, interval, excludeTimes),
    [date, minTime, maxTime, interval, excludeTimes]
  )
  const parent = scrollRef.current

  const handleClose = (evt) => {
    if (evt.target.id === 'time-picker-container') {
      setDate(null)
      setTime(null)
      setActive(0)
      setOffset(0)
    }
  }

  const chooseTime = (evt) => {
    evt.preventDefault()
    selectTime(time)
    setSelected(true)
    evt.target.blur()
  }

  useEffect(() => {
    const selected = intervals.find((i, idx) => idx === active)
    if (selected) {
      setTime(selected.value)
      if (parent) {
        const parentOffset = parent.getBoundingClientRect().height * active
        setOffset(parentOffset)
      }
    }
  }, [active, intervals, parent])

  useEffect(() => {
    if (parent) parent.scrollTop = offset
  }, [parent, offset])

  useEffect(() => {
    let timer = null
    const handleScroll = () => {
      setShowTop(parent.scrollTop > 0)
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        const elements = Array.from(document.getElementsByName('time-slot'))
        const topOffset =
          parent.getBoundingClientRect().top +
          parent.getBoundingClientRect().height / 2
        const activeElement = getActiveElement(elements, topOffset)
        const activeIndex = activeElement
          ? parseInt(activeElement.id.split('-')[1])
          : 0
        setActive(activeIndex)
      }, 150)
    }
    if (parent) {
      parent.addEventListener('scroll', handleScroll)
      return () => {
        parent.removeEventListener('scroll', () => handleScroll)
      }
    }
  }, [parent])

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
                <TimePickerLabelText>{dateStr}</TimePickerLabelText>
              </TimePickerLabel>
              <TimePickerSelect>
                <TriangleUp color={!showTop ? theme.colors.light : null} />
                <TimePickerTimes ref={scrollRef}>
                  {intervals.map((t, index) => (
                    <TimePickerTime
                      key={t.label}
                      label={t.label}
                      index={index}
                    />
                  ))}
                </TimePickerTimes>
                <TriangleDown />
              </TimePickerSelect>
              <TimePickerConfirm>
                <TimePickerButton
                  disabled={!time || selected ? true : false}
                  onClick={chooseTime}
                />
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
  minTime: propTypes.number,
  maxTime: propTypes.number,
  intervals: propTypes.number,
  setDate: propTypes.func,
}

export default TimePicker
