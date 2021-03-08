import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import iconMap from './iconMap'
import { isBrowser } from 'react-device-detect'
import { BackgroundContent, BackgroundImage } from '.'

const ArrowView = styled('div')`
  position: absolute;
  z-index: 1000;
  top: 50%;
  transform: translateY(-50%);
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: ${(props) => props.theme.colors.light};
  cursor: pointer;
  left: ${(props) => (props.direction === 'left' ? '0.5rem' : 'auto')};
  right: ${(props) => (props.direction === 'right' ? '0.5rem' : 'auto')};
  opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};
`

const Arrow = ({ direction, size, disabled, onClick }) => {
  return (
    <ArrowView
      direction={direction}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {direction === 'left' ? iconMap.ChevronLeft : iconMap.ChevronRight}
    </ArrowView>
  )
}

Arrow.displayName = 'Arrow'
Arrow.propTypes = {
  direction: propTypes.string,
  size: propTypes.string,
  disabled: propTypes.bool,
  onClick: propTypes.func,
}

const Dots = styled('div')`
  position: absolute;
  z-index: 1000;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    // height: ${(props) => props.theme.layout.paddingMobile};
    height: 3rem;
  }
`

const Dot = styled('button')`
  width: 100%;
  background-color: ${(props) => props.theme.colors.light};
  margin: 0 0.2rem;
  max-width: ${(props) => (props.active ? '2rem' : '0.4rem')};
  height: 0.4rem;
  border-radius: 0.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: ${(props) => (props.active ? '1.5rem' : '0.3rem')};
    height: 0.3rem;
    border-radius: 0.15rem;
  }
`

const SliderView = styled('div')`
  position: relative;
  flex-grow: 1;
  overflow: hidden;
  // display: flex;
`

const Slide = styled('div')`
  position: absolute;
  z-index: ${(props) => props.index};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  transition: transform ${(props) => props.transition}ms ease;
  opacity: ${(props) => (props.active ? '1' : '0')};
  transform: translate3D(${(props) => props.shift.toFixed(2)}%, 0, 0);
`

const defaultSettings = {
  autoplay: false,
  transition: 1000,
  transition_mobile: 500,
  duration: 3000,
  duration_mobile: 2500,
  show_arrows: true,
  show_arrows_mobile: false,
  show_dots: true,
  show_dots_mobile: true,
}

const calcAdvance = (preIndex, index, lastIndex) => {
  if (index === lastIndex && preIndex === 0) {
    return true
  } else if (preIndex > index) {
    if (preIndex === lastIndex && index === 0) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

const calcShift = (idx, preIndex, index, lastIndex, isAdvance) => {
  const prevIndex = index === 0 ? lastIndex : index - 1
  const nextIndex = index === lastIndex ? 0 : index + 1
  console.log(preIndex, index, isAdvance)
  if (preIndex !== index) {
    if (isAdvance) {
      return idx === index ? 0 : idx === nextIndex ? 100 : 100
    } else {
      return idx === index ? 0 : idx === prevIndex ? -100 : 100
    }
  } else {
    if (isAdvance) {
      return idx === index ? 0 : idx === prevIndex ? -100 : 100
    } else {
      return idx === index ? 0 : idx === nextIndex ? 100 : 100
    }
  }
}

const calcActive = (idx, index, preIndex, lastIndex, isAdvance) => {
  const prevIndex = index === 0 ? lastIndex : index - 1
  const nextIndex = index === lastIndex ? 0 : index + 1
  if (idx === index) {
    return true
  } else if (index !== preIndex) {
    return false
  } else if (isAdvance && idx === prevIndex) {
    return true
  } else if (!isAdvance && idx === nextIndex) {
    return true
  } else {
    return false
  }
}

const SliderNew = ({ settings = {}, slides }) => {
  const timer = useRef(null)
  const slider = useRef()
  const [pause, setPause] = useState(false)
  const [index, setIndex] = useState(0)
  const [preIndex, setPreIndex] = useState(0)
  const [isAdvance, setIsAdvance] = useState(true)
  // const [lastIndex, setLastIndex] = useState(0)
  const {
    autoplay,
    transition,
    transition_mobile,
    duration,
    duration_mobile,
    show_arrows,
    show_arrows_mobile,
    show_dots,
    show_dots_mobile,
  } = settings || defaultSettings
  const transitionSpeed = isBrowser ? transition : transition_mobile
  const interval = isBrowser ? duration : duration_mobile
  const showArrows = isBrowser ? show_arrows : show_arrows_mobile
  const showDots = isBrowser ? show_dots : show_dots_mobile
  const size = isBrowser ? '3rem' : '2rem'
  const count = slides.length
  const lastIndex = count - 1

  useEffect(() => {
    if (autoplay) {
      timer.current = setInterval(() => {
        const idx = index === count - 1 ? 0 : index + 1
        if (!pause) {
          setPreIndex(idx)
          // setIndex(idx)
        }
      }, interval)
      return () => {
        clearInterval(timer.current)
      }
    }
  }, [index, count, interval, pause, autoplay])

  useEffect(() => {
    if (index !== preIndex) {
      setIsAdvance(calcAdvance(preIndex, index, lastIndex))
      setIndex(preIndex)
    }
  }, [index, preIndex, lastIndex])

  useEffect(() => {
    if (autoplay) {
      slider.current.addEventListener('mouseover', () => {
        setPause(true)
      })
      slider.current.addEventListener('mouseout', () => {
        setPause(false)
      })
    }
  }, [slider, autoplay])

  const showSlide = (evt, idx) => {
    evt.preventDefault()
    evt.target.blur()
    if (idx >= 0 && idx <= count - 1) {
      setPreIndex(idx)
      // setIndex(idx)
    }
  }

  return (
    <SliderView ref={slider}>
      {slides.map((slide, idx) => {
        const active = calcActive(idx, preIndex, index, lastIndex, isAdvance)
        const shift = calcShift(idx, preIndex, index, lastIndex, isAdvance)
        return (
          <Slide
            key={slide.imageUrl}
            index={idx}
            active={active}
            transition={transitionSpeed}
            shift={shift}
          >
            <BackgroundImage {...slide}>
              <BackgroundContent {...slide} />
            </BackgroundImage>
          </Slide>
        )
      })}
      {showArrows && (
        <>
          <Arrow
            direction="left"
            size={size}
            onClick={(evt) =>
              showSlide(evt, index === 0 ? lastIndex : index - 1)
            }
            // disabled={!autoplay && index === 0}
          />
          <Arrow
            direction="right"
            size={size}
            onClick={(evt) =>
              showSlide(evt, index === lastIndex ? 0 : index + 1)
            }
            // disabled={!autoplay && index === count - 1}
          />
        </>
      )}
      {showDots && (
        <Dots>
          {slides.map((slide, idx) => (
            <Dot
              key={slide.announcement_id}
              onClick={(evt) => showSlide(evt, idx)}
              active={index === idx}
            />
          ))}
        </Dots>
      )}
    </SliderView>
  )
}

SliderNew.displayName = 'SliderNew'
SliderNew.propTypes = {
  settings: propTypes.object,
  slides: propTypes.array,
}

export default SliderNew
