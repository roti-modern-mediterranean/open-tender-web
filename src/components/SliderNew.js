import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import iconMap from './iconMap'
import { isBrowser } from 'react-device-detect'
import { BackgroundImage } from '.'

const ArrowView = styled('div')`
  position: absolute;
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  transition: all ${(props) => props.transition}ms ease;
  // opacity: ${(props) => (props.active ? '1' : '0')};
  transform: translateX(
    ${(props) => ((props.index - props.currentIndex) * 100).toFixed(2)}%
  );
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

const SliderNew = ({ settings = {}, slides }) => {
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
  const [pause, setPause] = useState(false)
  const [index, setIndex] = useState(0)
  const timer = useRef(null)
  const slider = useRef()

  useEffect(() => {
    if (autoplay) {
      timer.current = setInterval(() => {
        const idx = index === count - 1 ? 0 : index + 1
        if (!pause) setIndex(idx)
      }, duration)
      return () => {
        clearInterval(timer.current)
      }
    }
  }, [index, count, duration, pause, autoplay])

  useEffect(() => {
    slider.current.addEventListener('mouseover', () => {
      setPause(true)
    })
    slider.current.addEventListener('mouseout', () => {
      setPause(false)
    })
  }, [slider])

  console.log(slides)

  return (
    <SliderView ref={slider}>
      {slides.map((slide, idx) => (
        <Slide
          key={slide.imageUrl}
          active={idx === index}
          transition={transitionSpeed}
          index={idx}
          currentIndex={index}
        >
          <BackgroundImage imageUrl={slide.imageUrl} />
        </Slide>
      ))}
      {/* {showArrows && (
        <>
          <Arrow
            direction="left"
            size={size}
            onClick={(e) => e.stopPropagation() || slider.prev()}
            disabled={!autoplay && index === 0}
          />
          <Arrow
            direction="right"
            size={size}
            onClick={(e) => e.stopPropagation() || slider.next()}
            disabled={!autoplay && index === slider.details().size - 1}
          />
        </>
      )}
      {showDots && (
        <Dots>
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <Dot
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
                active={index === idx}
              />
            )
          })}
        </Dots>
      )} */}
    </SliderView>
  )
}

SliderNew.displayName = 'SliderNew'
SliderNew.propTypes = {
  settings: propTypes.object,
  slides: propTypes.array,
}

export default SliderNew
