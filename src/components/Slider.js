import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { useSwipeable } from 'react-swipeable'
import iconMap from './iconMap'
import { isBrowser } from 'react-device-detect'
import { BackgroundContent, BackgroundImage } from '.'
import BorderBox from '../components/BorderBox'
import { selectTheme } from '../slices'

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
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 0;
  height: 5rem;
  border-top-right-radius: 4.1rem;
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    // height: ${(props) => props.theme.layout.paddingMobile};
    height: 3rem;
    padding: 0;
    bottom: -0.25em;
    justify-content: center;
    align-items: center;
  }
`

const Dot = styled('button')`
  margin: 0 0.7rem;
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.active ? props.theme.colors.pepper : props.theme.colors.light};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    border-radius: 100%;
    width: 0.5em;
    height: 0.5em;
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
    transition: transform ${(props) => props.transition}ms ease;
    transform: translate3D(
      ${(props) =>
        props.index === props.lastIndex
          ? `calc(${props.index * -80}% + 4em)`
          : `${props.index * -80}%`},
      0,
      0
    );
  }
`

const Slide = styled('div')`
  position: absolute;
  transform: translate3D(0, 0, 0);
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: ${(props) => props.index};
  transition: ${(props) => `opacity ${props.transition}ms ease`};
  opacity: ${(props) => (props.active ? '1' : '0')};
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: ${(props) =>
      props.itemsCount === 1 ? 'calc(100% - 1.5em)' : '80%'};
    height: calc(100% - 3rem);
    border-radius: 0.15rem;
    opacity: 1;
    visibility: visible;
    padding: 0.5em 0 0.5em 0.5em;
    transform: translate3D(${(props) => props.index * 100}%, 0, 0);
    transition: ${(props) => `transform ${props.transition}ms ease`};
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
  const {
    autoplay: autoplayDesktop,
    transition,
    transition_mobile,
    duration,
    duration_mobile,
    // show_arrows,
    // show_arrows_mobile,
    show_dots,
    show_dots_mobile,
  } = settings || defaultSettings
  const autoplay = isBrowser ? autoplayDesktop : false
  const transitionSpeed = isBrowser ? transition : transition_mobile
  const interval = isBrowser ? duration : duration_mobile
  const showDots = isBrowser ? show_dots : show_dots_mobile
  const count = slides.length
  const lastIndex = count - 1
  const sliderWrapper = useRef()
  const theme = useSelector(selectTheme)
  // const showArrows = isBrowser ? show_arrows : show_arrows_mobile

  const config = {
    delta: 10,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex(Math.min(index + 1, lastIndex)),
    onSwipedRight: () => setIndex(Math.max(index - 1, 0)),
    ...config,
  })

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
      setIndex(idx)
    }
  }

  return (
    <SliderView ref={slider}>
      <>
        {isBrowser && (
          <BorderBox
            color={theme.bgColors['primary']}
            style={{ top: 'auto', bottom: '4.9rem' }}
          />
        )}
        <SliderWrapper
          ref={sliderWrapper}
          index={index}
          lastIndex={lastIndex}
          transition={transitionSpeed}
          {...handlers}
        >
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
                itemsCount={slides.length}
              >
                <BackgroundImage {...slide}>
                  {!slide.hide_text && <BackgroundContent {...slide} />}
                </BackgroundImage>
              </Slide>
            )
          })}
        </SliderWrapper>
      </>
      {/* {showArrows && (
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
      )} */}
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
