import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ProgressView = styled('div')`
  width: 100%;
  background-color: ${(props) => props.theme.bgColors.secondary};
  box-shadow: ${(props) => props.theme.boxShadow.inset};
`

const ProgressBarFill = styled('div')`
  width: 0;
  height: 1.5rem;
  animation: fill-bar 0.5s ease-in-out 0.25s forwards;
  background-color: ${(props) => props.theme.links.primary.color};
`

const ProgressBar = ({ progress }) => {
  const style = { width: `${progress || 0}%` }
  return (
    <ProgressView>
      <div style={style}>
        <ProgressBarFill />
      </div>
    </ProgressView>
  )
}

ProgressBar.displayName = 'ProgressBar'
ProgressBar.propTypes = {
  progress: propTypes.number,
}

export default ProgressBar
