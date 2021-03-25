import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CheckmarkView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const Checkmark = ({ size = '1.2rem', color = null }) => {
  return (
    <CheckmarkView size={size} color={color}>
      <svg viewBox="0 0 13 10" fill="none">
        <path d="M5.22103 9.00034C4.93881 9.00034 4.66861 8.88779 4.46896 8.68397L0.312347 4.47372C-0.103465 4.0524 -0.103465 3.37097 0.312347 2.94964C0.728159 2.52831 1.40066 2.52831 1.81647 2.94964L5.15648 6.33396L10.1252 0.383645C10.505 -0.0711463 11.176 -0.127425 11.6248 0.257399C12.0737 0.642222 12.1292 1.32213 11.7494 1.77692L6.03313 8.6216C5.84099 8.85128 5.56178 8.9897 5.26456 9.00186C5.25105 9.00034 5.23604 9.00034 5.22103 9.00034Z" />
      </svg>
    </CheckmarkView>
  )
}

Checkmark.displayName = 'Checkmark'
Checkmark.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default Checkmark
