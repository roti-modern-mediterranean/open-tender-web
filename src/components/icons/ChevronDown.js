import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ChevronDownView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.beet};
  }
`

const ChevronDown = ({ size = '1.2rem', color = null }) => {
  return (
    <ChevronDownView size={size} color={color}>
      <svg viewBox="0 0 12 6" fill="none">
        <path d="M5.76953 6L0.269531 0.478236L0.745883 0L5.76953 5.04353L10.7932 0L11.2695 0.478236L5.76953 6Z" />
      </svg>
    </ChevronDownView>
  )
}

ChevronDown.displayName = 'ChevronDown'
ChevronDown.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default ChevronDown
