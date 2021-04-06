import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ArrowRightView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.paprika};
  }
`

const ArrowRight = ({ size = '2.6rem', color = null }) => {
  return (
    <ArrowRightView size={size} color={color}>
      <svg viewBox="0 0 26 25">
        <path d="M1.00206 13.612L22.5642 13.612L12.8995 23.2718C12.5062 23.665 12.5037 24.3042 12.8928 24.7008C13.2819 25.0974 13.9165 25.0999 14.3097 24.7075L25.7037 13.319C26.0945 12.9283 26.0995 12.2934 25.7162 11.8968L14.5252 0.305334C14.329 0.101562 14.0684 -0.000324249 13.8071 -0.000324249C13.5549 -0.000324249 13.3028 0.0948257 13.1082 0.285967C12.7116 0.674988 12.7033 1.31493 13.089 1.7149L22.6243 11.5911L1.0029 11.5911C0.449314 11.5911 0.000936508 12.0433 0.000936508 12.6016C0.000936508 13.1598 0.449312 13.612 1.00206 13.612Z" />
      </svg>
    </ArrowRightView>
  )
}

ArrowRight.displayName = 'ArrowRight'
ArrowRight.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default ArrowRight
