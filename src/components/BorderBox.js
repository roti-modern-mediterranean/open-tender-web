import styled from '@emotion/styled'
import propTypes from 'prop-types'

const BorderBoxWrapper = styled('div')`
  position: absolute;
  width: 2.75em;
  height: 2.75em;
  top: -2.75em;
  left: 0;

  svg {
    width: 2.75em;
    height: 2.75em;
    fill: ${(props) => props.color || 'red'};
  }
`

const BorderBox = ({ color = null }) => {
  return (
    <BorderBoxWrapper color={color}>
      <svg viewBox="0 0 78 78">
        <path fillRule="evenodd" clipRule="evenodd" d="M78 77.9936C77.6672 77.9979 77.3338 78 77 78C34.4741 78 0 43.5259 0 1C0 0.666166 0.00212445 0.332829 0.00636056 0H0V1V78H77H78V77.9936Z" />
      </svg>
    </BorderBoxWrapper>
  )
}

BorderBox.displayName = 'BorderBox'
BorderBox.propTypes = {
  color: propTypes.string,
}

export default BorderBox
