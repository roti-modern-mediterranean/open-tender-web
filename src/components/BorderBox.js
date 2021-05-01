import styled from '@emotion/styled'
import propTypes from 'prop-types'

const BorderBoxWrapper = styled('div')`
  position: absolute;
  width: 2.75em;
  height: 2.75em;
  transform: ${(props) => {
    if (props.position === 'right') {
      return 'rotate(180deg)'
    } else {
      return 'rotate(0deg)'
    }
  }};
  bottom: ${(props) => {
    if (props.bottom) {
      return '2.73em'
    }
    return 'auto'
  }};
  top: ${(props) => {
    if (props.bottom) {
      return 'auto'
    }
    if (props.position === 'left') {
      return '-2.73em'
    } else {
      return '-0.02em'
    }
  }};
  left: ${(props) => {
    if (props.position === 'left') {
      return '0'
    } else {
      return 'auto'
    }
  }};
  right: ${(props) => {
    if (props.position === 'left') {
      return 'auto'
    } else {
      return '0'
    }
  }};
  z-index: 10;

  svg {
    width: 2.75em;
    height: ${(props) => (props.position === 'right' ? '2.77em' : '2.77em')};
    fill: ${(props) => props.color || 'red'};
  }
`

const BorderBox = ({ color = null, position = 'left', bottom = false }) => {
  return (
    <BorderBoxWrapper color={color} position={position} bottom={bottom}>
      <svg viewBox="0 0 78 78">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M78 77.9936C77.6672 77.9979 77.3338 78 77 78C34.4741 78 0 43.5259 0 1C0 0.666166 0.00212445 0.332829 0.00636056 0H0V1V78H77H78V77.9936Z"
        />
      </svg>
    </BorderBoxWrapper>
  )
}

BorderBox.displayName = 'BorderBox'
BorderBox.propTypes = {
  color: propTypes.string,
  position: propTypes.string,
  bottom: propTypes.bool,
}

export default BorderBox
