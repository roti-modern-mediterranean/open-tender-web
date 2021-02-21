import React, { useRef, useState } from 'react'
import propTypes from 'prop-types'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import styled from '@emotion/styled'
import iconMap from './iconMap'
import { isBrowser } from 'react-device-detect'

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
    height: ${(props) => props.theme.layout.paddingMobile};
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
`

const Slider = ({ slides }) => {
  const wrapper = useRef()
  const timer = useRef()
  const duration = isBrowser ? 1000 : 500
  const timeout = isBrowser ? 3000 : 2000
  const size = isBrowser ? '3rem' : '2rem'
  const [currentSlide, setCurrentSlide] = useState(0)
  const [pause, setPause] = useState(false)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
    loop: true,
    duration: duration,
    dragStart: () => {
      setPause(true)
    },
    dragEnd: () => {
      setPause(false)
    },
  })

  React.useEffect(() => {
    wrapper.current.addEventListener('mouseover', () => {
      setPause(true)
    })
    wrapper.current.addEventListener('mouseout', () => {
      setPause(false)
    })
  }, [wrapper])

  React.useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next()
      }
    }, timeout)
    return () => {
      clearInterval(timer.current)
    }
  }, [pause, slider, timeout])

  return (
    <SliderView ref={wrapper}>
      <div ref={sliderRef} className="keen-slider">
        {slides.map((slide) => (
          <div key={slide.key} className="keen-slider__slide">
            {slide}
          </div>
        ))}
      </div>
      {slider && isBrowser && (
        <>
          <Arrow
            direction="left"
            size={size}
            onClick={(e) => e.stopPropagation() || slider.prev()}
            disabled={currentSlide === 0}
          />
          <Arrow
            direction="right"
            size={size}
            onClick={(e) => e.stopPropagation() || slider.next()}
            disabled={currentSlide === slider.details().size - 1}
          />
        </>
      )}
      {slider && (
        <Dots>
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <Dot
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
                active={currentSlide === idx}
              />
            )
          })}
        </Dots>
      )}
    </SliderView>
  )
}

Slider.displayName = 'Slider'
Slider.propTypes = {
  slides: propTypes.array,
}

export default Slider
