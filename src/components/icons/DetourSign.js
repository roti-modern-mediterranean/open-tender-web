import propTypes from 'prop-types'
import styled from '@emotion/styled'

const DetourSignView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.beet};
  }
`

const DetourSign = ({ size = '2rem', color = null }) => {
  return (
    <DetourSignView size={size} color={color}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.1511 9.04594L10.5261 0.420938C10.1523 0.0471875 9.54859 0.0471875 9.17484 0.420938L0.549844 9.04594C0.176094 9.41969 0.176094 10.0234 0.549844 10.3972L9.17484 19.0222C9.54859 19.3959 10.1523 19.3959 10.5261 19.0222L19.1511 10.3972C19.5248 10.033 19.5248 9.42927 19.1511 9.04594ZM11.7617 12.1222V9.72632H7.92839V12.6013H6.01172V8.76799C6.01172 8.2409 6.44297 7.80965 6.97005 7.80965H11.7617V5.41382L15.1159 8.76799L11.7617 12.1222Z"
        />
      </svg>
    </DetourSignView>
  )
}

DetourSign.displayName = 'DetourSign'
DetourSign.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
}

export default DetourSign
