import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CloseView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.color || props.theme.colors.primary};
  }
`

const Close = ({ size = '0.8rem', color = null }) => {
  return (
    <CloseView size={size} color={color}>
      <svg viewBox="0 0 20 20">
        <path d="M20 0.572045L19.428 0L10 9.42795L0.572045 0L0 0.572045L9.42795 10L0 19.428L0.572045 20L10 10.572L19.428 20L20 19.428L10.572 10L20 0.572045Z" />
      </svg>
    </CloseView>
  )
}

Close.displayName = 'Close'
Close.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default Close
