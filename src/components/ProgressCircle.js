import React, { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading, Preface } from '@open-tender/components'

// https://kimmobrunfeldt.github.io/progressbar.js/
// https://github.com/kimmobrunfeldt/progressbar.js/tree/master/src
// https://dev.to/vaibhavkhulbe/let-s-make-and-wear-those-css-3-progress-rings-2ngf

const ProgressCirlceView = styled('div')`
  position: relative;
  width: 12rem;
  height: 12rem;
  margin: 0 auto;

  path:last-of-type {
    stroke: ${(props) => props.theme.links.primary.color};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      stroke: #ffffff;
    }
  }

  path:first-of-type {
    stroke: ${(props) => props.theme.bgColors.secondary};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      stroke: rgba(255, 255, 255, 0.2);
    }
  }
`

const ProgressPercentage = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    margin: -0.5rem 0 0;

    span {
      display: block;
      line-height: 1;
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        color: ${(props) => props.theme.colors.light};
      }
    }

    span:first-of-type {
      font-size: ${(props) => props.theme.fonts.sizes.h2};
      margin: 0 0 0.3rem;
    }

    span:last-of-type {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const ProgressCirlce = ({ strokeWidth = 12, progress }) => {
  const progressRef = useRef()
  const [length, setLength] = useState(null)
  const [offset, setOffset] = useState(null)
  const radius = 50 - strokeWidth / 2
  const dimensions = `M 50,50 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${
    radius * 2
  } a ${radius},${radius} 0 1 1 0,-${radius * 2}`
  const strokeDasharray = length
    ? `${length.toFixed(3)} ${length.toFixed(3)}`
    : null
  const style = offset ? { strokeDasharray, strokeDashoffset: offset } : null

  useEffect(() => {
    setLength(progressRef.current.getTotalLength())
  }, [])

  useEffect(() => {
    const timeout = (o, t) => window.setTimeout(() => setOffset(o), t)
    if (length) {
      const start = length
      const end = length - (length * progress) / 100
      const diff = start - end
      const time = 1500 * (progress / 100)
      let curTime = 0
      let counter = 1
      while (curTime < time) {
        const newOffset = start - (diff / 100) * counter
        timeout(newOffset, curTime)
        curTime += time / 100
        counter++
      }
    }
    return () => clearTimeout(timeout)
  }, [length, progress])

  return (
    <ProgressCirlceView>
      <svg viewBox="0 0 100 100">
        <path
          ref={progressRef}
          d={dimensions}
          strokeWidth={`${strokeWidth}`}
          fillOpacity="0"
        ></path>
        {offset && (
          <path
            d={dimensions}
            strokeWidth={`${strokeWidth}`}
            fillOpacity="0"
            style={style}
          ></path>
        )}
      </svg>
      <ProgressPercentage>
        <div>
          <Heading>{progress}%</Heading>
          <Preface size="small">complete</Preface>
        </div>
      </ProgressPercentage>
    </ProgressCirlceView>
  )
}

ProgressCirlce.displayName = 'ProgressCirlce'
ProgressCirlce.propTypes = {
  progress: propTypes.number,
}

export default ProgressCirlce
