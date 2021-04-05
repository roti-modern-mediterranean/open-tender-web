import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ScooterView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const Scooter = ({ size = '3.6rem', color = null }) => {
  return (
    <ScooterView size={size} color={color}>
      <svg viewBox="0 0 37 36">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.4737 23.2008C26.2034 23.2008 25.1737 24.2305 25.1737 25.5008C25.1737 26.771 26.2034 27.8008 27.4737 27.8008C28.7439 27.8008 29.7737 26.771 29.7737 25.5008C29.7737 24.2305 28.7439 23.2008 27.4737 23.2008ZM23.7737 25.5008C23.7737 23.4573 25.4302 21.8008 27.4737 21.8008C29.5171 21.8008 31.1737 23.4573 31.1737 25.5008C31.1737 27.5442 29.5171 29.2008 27.4737 29.2008C25.4302 29.2008 23.7737 27.5442 23.7737 25.5008Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.47368 23.2008C8.20343 23.2008 7.17368 24.2305 7.17368 25.5008C7.17368 26.771 8.20343 27.8008 9.47368 27.8008C10.7439 27.8008 11.7737 26.771 11.7737 25.5008C11.7737 24.2305 10.7439 23.2008 9.47368 23.2008ZM5.77368 25.5008C5.77368 23.4573 7.43023 21.8008 9.47368 21.8008C11.5171 21.8008 13.1737 23.4573 13.1737 25.5008C13.1737 27.5442 11.5171 29.2008 9.47368 29.2008C7.43023 29.2008 5.77368 27.5442 5.77368 25.5008Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.8001 7.00078C21.8001 6.61418 22.1135 6.30078 22.5001 6.30078H24.0001C24.9814 6.30078 25.9225 6.6906 26.6163 7.38449C27.3102 8.07837 27.7001 9.01948 27.7001 10.0008V17.5008C27.7001 17.8456 27.449 18.139 27.1083 18.1924C25.3715 18.4642 23.7659 19.2805 22.5228 20.5235C21.2797 21.7666 20.4635 23.3722 20.1916 25.109C20.1383 25.4497 19.8449 25.7008 19.5 25.7008H12C11.6134 25.7008 11.3 25.3874 11.3 25.0008C11.3 24.6142 11.6134 24.3008 12 24.3008H18.92C19.3178 22.4993 20.2224 20.844 21.5329 19.5336C22.8433 18.2231 24.4985 17.3186 26.3001 16.9207V10.0008C26.3001 9.39078 26.0577 8.80577 25.6264 8.37444C25.1951 7.9431 24.61 7.70078 24.0001 7.70078H22.5001C22.1135 7.70078 21.8001 7.38738 21.8001 7.00078Z"
        />
      </svg>
    </ScooterView>
  )
}

Scooter.displayName = 'Scooter'
Scooter.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
}

export default Scooter