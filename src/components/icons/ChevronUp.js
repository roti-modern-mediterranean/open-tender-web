import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ChevronUpView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.beet};
  }
`

const ChevronUp = ({ size = '1.2rem', color = null }) => {
  return (
    <ChevronUpView size={size} color={color}>
      <svg viewBox="0 0 12 6" fill="none">
        <path d="M5.76953 0L0.269531 5.52176L0.745883 6L5.76953 0.956473L10.7932 6L11.2695 5.52176L5.76953 0Z" />
      </svg>
    </ChevronUpView>
  )
}

ChevronUp.displayName = 'ChevronUp'
ChevronUp.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default ChevronUp
