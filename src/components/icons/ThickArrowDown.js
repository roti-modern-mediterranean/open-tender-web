import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ThickArrowDownView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.paprika};
  }
`

const ThickArrowDown = ({ size = '2.6rem', color = null }) => {
  return (
    <ThickArrowDownView size={size} color={color}>
      <svg viewBox="0 0 922.5 1000">
        <path
          d="m 218.5,281.4 v 281.3 l -6.1,0.7 C 209,563.7 159.8,564 103.1,564 L 0,564.1 l 6.6,6.2 c 3.6,3.4 75.6,71.4 160,151.2 84.4,79.7 182,171.9 216.9,204.9 34.9,32.9 66.7,63 70.5,66.8 l 7,6.8 23,-21.7 C 629.4,841 855.9,627.1 885.2,599.3 L 922.5,564 h -109 -109 V 282 0 h -243 -243 z"
        />
      </svg>
    </ThickArrowDownView>
  )
}

ThickArrowDown.displayName = 'ArrowLeft'
ThickArrowDown.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default ThickArrowDown
