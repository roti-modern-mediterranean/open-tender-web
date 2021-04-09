import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ClockView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.inputs.placeholderColor};
  }
`

const Clock = ({ size = '1.4rem', color = null }) => {
  return (
    <ClockView size={size} color={color}>
      <svg viewBox="0 0 14 14">
        <path d="M7.00001 1.39961C3.90721 1.39961 1.40001 3.90681 1.40001 6.99961C1.40001 10.0924 3.90721 12.5996 7.00001 12.5996C10.0928 12.5996 12.6 10.0924 12.6 6.99961C12.6 3.90681 10.0928 1.39961 7.00001 1.39961ZM0.600006 6.99961C0.600006 3.46499 3.46538 0.599609 7.00001 0.599609C10.5346 0.599609 13.4 3.46499 13.4 6.99961C13.4 10.5342 10.5346 13.3996 7.00001 13.3996C3.46538 13.3996 0.600006 10.5342 0.600006 6.99961Z" />
        <path d="M7.00001 3.2666C7.22092 3.2666 7.40001 3.44569 7.40001 3.6666V6.83425L9.28285 8.71709C9.43906 8.8733 9.43906 9.12657 9.28285 9.28278C9.12664 9.43899 8.87337 9.43899 8.71716 9.28278L6.71716 7.28278C6.64215 7.20776 6.60001 7.10602 6.60001 6.99994V3.6666C6.60001 3.44569 6.77909 3.2666 7.00001 3.2666Z" />
      </svg>
    </ClockView>
  )
}

Clock.displayName = 'Clock'
Clock.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default Clock
