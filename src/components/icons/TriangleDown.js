import propTypes from 'prop-types'
import styled from '@emotion/styled'

const TriangleDownView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.beet};
  }
`

const TriangleDown = ({ size = '1.8rem', color = null }) => {
  return (
    <TriangleDownView size={size} color={color}>
      <svg viewBox="0 0 18 10">
        <path d="M9 10L0.339745 0.25L17.6603 0.250002L9 10Z" />
      </svg>
    </TriangleDownView>
  )
}

TriangleDown.displayName = 'TriangleDown'
TriangleDown.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default TriangleDown
