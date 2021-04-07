import React, { useRef, useState, useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import iconMap from './iconMap'
import { isBrowser } from 'react-device-detect'
import { BackgroundContent, BackgroundImage } from '.'

import { useTouchableObject, TouchDirection, TouchEvents } from './SliderEvents'

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
  bottom: -1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  height: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    // height: ${(props) => props.theme.layout.paddingMobile};
    height: 3rem;
    padding: 0;
    justify-content: center;
    align-items: center;
  }
`

const Dot = styled('button')`
  margin: 0 0.5rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${(props) => props.active ? props.theme.colors.pepper:props.theme.colors.light};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    border-radius: 50%;
  }
`

const SliderView = styled('div')`
  position: relative;
  flex-grow: 1;
  overflow: hidden;
`

const SliderWrapper = styled('div')`
  display: flex;
  height: 100%; 

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    transform: translate3D(${(props) => {
      if(props.moveX){
        return `${props.moveX*-1}px`
      }
      return (props.index>0)?`calc(${props.index*-80}% + 4em)`:0
    }}, 0, 0);
    transition: transform ${(props) => {
      if(!props.moveX){
        return `${props.transition}ms ease`;
      } else {
        return 'all 0s ease 0s'
      }
    }};
  }
`

const Slide = styled('div')`
  position: absolute;
  transform: translate3D(0, 0, 0);
  height: calc(100% - 2.5rem);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: ${(props) => props.index};
  transition: opacity ${(props) => {
    return `${props.transition}ms ease`;
  }};
  opacity: ${(props) => (props.active ? '1' : '0')};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 80%;
    height: calc(100% - 1.5rem);
    border-radius: 0.15rem;
    opacity: 1;
    padding: 0.5em 0 0.5em 0.5em;
    transform: translate3D(${(props) => props.index*100}%, 0, 0);
    transition: transform ${(props) => {
      return `${props.transition}ms ease`;
    }};
  }
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
  const timer = useRef(null)
  const slider = useRef()
  const [pause, setPause] = useState(false)
  const [index, setIndex] = useState(0)
  const [touchMove, setTouchMove] = useState(null)
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
  const last = count - 1
  const sliderWrapper = useRef()

  const onTouch = useCallback((direction, move, _, position, eventName) => {
    if (eventName !== TouchEvents.end) {
      if (direction && move) {
        if(direction === TouchDirection.right || direction === TouchDirection.left) {
          setTouchMove((position.left * -1) + move)
        }
      }
    } else {
      const wrapper = sliderWrapper.current
      const offsetLeft = wrapper.getBoundingClientRect().x
      if(offsetLeft > 0) {
        setTouchMove(0)
      } else {
        const slides = wrapper.querySelectorAll(':scope > div')
        let currentIndex = 0
        slides.forEach((slide, index) => {
          //console.log(offsetLeft, slide.getBoundingClientRect().left)
          if (Math.abs(slide.getBoundingClientRect().left) <= 150) {
            currentIndex = index
          }
        });
        setTouchMove(null)
        setIndex(currentIndex)
      }    
    }
  }, [])

  const touchProps = useTouchableObject(onTouch, sliderWrapper)

  useEffect(() => {
    if (autoplay) {
      timer.current = setInterval(() => {
        const idx = index === count - 1 ? 0 : index + 1
        if (!pause) {
          setIndex(idx)
        }
      }, interval)
      return () => {
        clearInterval(timer.current)
      }
    }
  }, [index, count, interval, pause, autoplay])

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
      setTouchMove(null)
      setIndex(idx)
    }
  }

  return (
    <SliderView ref={slider}>
      <SliderWrapper ref={sliderWrapper} index={index} moveX={touchMove}
      transition={transitionSpeed} {...touchProps}>
        {slides.map((slide, idx) => {
          const shift = idx
          const active = idx === index 
          return (
            <Slide
              key={slide.imageUrl}
              transition={transitionSpeed}
              index={idx}
              shift={shift}
              active={active}
            >
              <BackgroundImage {...slide}>
                <BackgroundContent {...slide} />
              </BackgroundImage>
            </Slide>
          )
        })}
      </SliderWrapper>
      {showArrows && (
        <>
          <Arrow
            direction="left"
            size={size}
            onClick={(evt) => showSlide(evt, index === 0 ? last : index - 1)}
            // disabled={!autoplay && index === 0}
          />
          <Arrow
            direction="right"
            size={size}
            onClick={(evt) => showSlide(evt, index === last ? 0 : index + 1)}
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
