import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const CallUsView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: none;
  }
`

const CallUs = ({ size = '3.6rem', color = null }) => {
  const theme = useTheme()
  color = color || theme.colors.paprika
  return (
    <CallUsView size={size} color={color}>
      <svg viewBox="0 0 37 33">
        <path
          d="M16.4327 14.8165C19.4083 14.8165 21.8204 12.4043 21.8204 9.42877C21.8204 6.4532 19.4083 4.04102 16.4327 4.04102C13.4571 4.04102 11.0449 6.4532 11.0449 9.42877C11.0449 12.4043 13.4571 14.8165 16.4327 14.8165Z"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.35107 28.2848V25.5909C8.35107 24.162 8.91871 22.7916 9.92911 21.7812C10.9395 20.7708 12.3099 20.2031 13.7388 20.2031H17.8244"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="26.7185"
          cy="19.8362"
          r="8.85102"
          stroke={color}
          strokeWidth="1.4"
        />
        <path
          d="M22.8613 15.4277H25.0654L26.1674 18.1828L24.7899 19.0094C25.38 20.2059 26.3484 21.1743 27.545 21.7645L28.3715 20.3869L31.1266 21.489V23.693C31.1266 23.9853 31.0105 24.2656 30.8038 24.4723C30.5972 24.679 30.3169 24.7951 30.0246 24.7951C27.8752 24.6645 25.8479 23.7517 24.3253 22.2291C22.8026 20.7064 21.8899 18.6792 21.7593 16.5298C21.7593 16.2375 21.8754 15.9572 22.0821 15.7505C22.2887 15.5438 22.569 15.4277 22.8613 15.4277"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </CallUsView>
  )
}

CallUs.displayName = 'CallUs'
CallUs.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
}

export default CallUs
