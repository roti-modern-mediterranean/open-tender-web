import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ChevronLeftView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const ChevronLeft = ({ size = '0.9rem', color = null }) => {
  return (
    <ChevronLeftView size={size} color={color}>
      <svg viewBox="0 0 9 14" fill="none">
        <path d="M7.36361 13.8404L8.26953 13.0117L2.08138 7.34476L8.26953 1.68416L7.36361 0.855469L0.269531 7.34476L7.36361 13.8404Z" />
      </svg>
    </ChevronLeftView>
  )
}

ChevronLeft.displayName = 'ChevronLeft'
ChevronLeft.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default ChevronLeft
