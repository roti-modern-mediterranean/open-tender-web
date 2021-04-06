import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ChevronRightView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const ChevronRight = ({ size = '0.9rem', color = null }) => {
  return (
    <ChevronRightView size={size} color={color}>
      <svg viewBox="0 0 9 14" fill="none">
        <path d="M1.17545 13.8404L0.269531 13.0117L6.45768 7.34476L0.269531 1.68416L1.17545 0.855469L8.26953 7.34476L1.17545 13.8404Z" />
      </svg>
    </ChevronRightView>
  )
}

ChevronRight.displayName = 'ChevronRight'
ChevronRight.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default ChevronRight
