import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MastercardView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
  }
`

const Mastercard = ({ size = '3.3rem', color = null }) => {
  return (
    <MastercardView size={size} color={color}>
      <svg viewBox="0 0 33 21">
        <circle
          r="10.2414"
          transform="matrix(1 0 0 -1 10.2414 10.2414)"
          fill="#EA001B"
        />
        <circle
          r="10.2414"
          transform="matrix(1 0 0 -1 22.7586 10.2414)"
          fill="#F79F1A"
        />
        <path
          d="M20.4828 10.2414C20.5738 14.52 17.8655 17.4103 16.5 18.3207C13.1317 15.7717 12.4414 11.8724 12.5172 10.2414C12.6993 5.59862 15.2483 2.92069 16.5 2.16207C17.7897 3.07241 20.3917 5.96276 20.4828 10.2414Z"
          fill="#FF5F01"
        />
      </svg>
    </MastercardView>
  )
}

Mastercard.displayName = 'Mastercard'
Mastercard.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
}

export default Mastercard
