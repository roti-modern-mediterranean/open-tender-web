import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ArrowLeftView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.paprika};
  }
`

const ArrowLeft = ({ size = '2.6rem', color = null }) => {
  return (
    <ArrowLeftView size={size} color={color}>
      <svg viewBox="0 0 26 25">
        <path d="M24.9982 11.3878H3.43603L13.1008 1.72794C13.494 1.33471 13.4965 0.695602 13.1074 0.299004C12.7183 -0.0975942 12.0838 -0.10012 11.6905 0.292268L0.296554 11.6808C-0.0942095 12.0715 -0.0992193 12.7064 0.28403 13.103L11.4751 24.6944C11.6713 24.8982 11.9318 25.0001 12.1931 25.0001C12.4453 25.0001 12.6975 24.9049 12.892 24.7138C13.2886 24.3248 13.297 23.6848 12.9112 23.2849L3.37591 13.4086H24.9973C25.5509 13.4086 25.9993 12.9565 25.9993 12.3982C25.9993 11.8399 25.5509 11.3878 24.9982 11.3878Z" />
      </svg>
    </ArrowLeftView>
  )
}

ArrowLeft.displayName = 'ArrowLeft'
ArrowLeft.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default ArrowLeft
