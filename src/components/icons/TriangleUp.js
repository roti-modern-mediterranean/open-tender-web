import propTypes from 'prop-types'
import styled from '@emotion/styled'

const TriangleUpView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.beet};
  }
`

const TriangleUp = ({ size = '1.8rem', color = null }) => {
  return (
    <TriangleUpView size={size} color={color}>
      <svg viewBox="0 0 18 10">
        <path d="M9 8.74228e-07L0.339745 9.75L17.6603 9.75L9 8.74228e-07Z" />
      </svg>
    </TriangleUpView>
  )
}

TriangleUp.displayName = 'TriangleUp'
TriangleUp.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default TriangleUp
