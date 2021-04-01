import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CreditCardView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.inputs.placeholderColor};
  }
`

const CreditCard = ({ size = '2.0rem', color = null }) => {
  return (
    <CreditCardView size={size} color={color}>
      <svg viewBox="0 0 17 14">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.26949 1.73503C2.14191 1.73503 1.22782 2.64911 1.22782 3.77669V10.4434C1.22782 11.5709 2.14191 12.485 3.26949 12.485H13.2695C14.3971 12.485 15.3112 11.5709 15.3112 10.4434V3.77669C15.3112 2.64911 14.3971 1.73503 13.2695 1.73503H3.26949ZM0.311157 3.77669C0.311157 2.14285 1.63565 0.818359 3.26949 0.818359H13.2695C14.9033 0.818359 16.2278 2.14285 16.2278 3.77669V10.4434C16.2278 12.0772 14.9033 13.4017 13.2695 13.4017H3.26949C1.63565 13.4017 0.311157 12.0772 0.311157 10.4434V3.77669Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.311157 5.44271C0.311157 5.18958 0.51636 4.98438 0.769491 4.98438H15.7695C16.0226 4.98438 16.2278 5.18958 16.2278 5.44271C16.2278 5.69584 16.0226 5.90104 15.7695 5.90104H0.769491C0.51636 5.90104 0.311157 5.69584 0.311157 5.44271Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.64465 9.60872C3.64465 9.35559 3.84986 9.15039 4.10299 9.15039H4.11132C4.36445 9.15039 4.56965 9.35559 4.56965 9.60872C4.56965 9.86185 4.36445 10.0671 4.11132 10.0671H4.10299C3.84986 10.0671 3.64465 9.86185 3.64465 9.60872Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.97766 9.60872C6.97766 9.35559 7.18286 9.15039 7.43599 9.15039H9.10266C9.35579 9.15039 9.56099 9.35559 9.56099 9.60872C9.56099 9.86185 9.35579 10.0671 9.10266 10.0671H7.43599C7.18286 10.0671 6.97766 9.86185 6.97766 9.60872Z"
        />
      </svg>
    </CreditCardView>
  )
}

CreditCard.displayName = 'CreditCard'
CreditCard.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default CreditCard
