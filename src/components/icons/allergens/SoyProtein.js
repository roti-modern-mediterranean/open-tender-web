import propTypes from 'prop-types'
import styled from '@emotion/styled'

const SoyProteinView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const SoyProtein = ({ size = '1.4rem', color = null }) => {
  return (
    <SoyProteinView size={size} color={color}>
      <svg viewBox="0 0 16 18">
        <path d="M14.2303 10.4994L8.75034 5.1794C7.92034 4.3694 6.86034 3.9294 5.67034 3.9494C4.64034 3.9694 3.68034 4.3594 2.91034 5.0294C2.47034 4.7394 1.57034 4.0594 1.19034 3.0094C0.660337 1.5694 1.01034 0.659401 1.02034 0.619401C1.11034 0.389401 1.01034 0.129401 0.780337 0.0294008C0.550337 -0.0605992 0.290337 0.0494008 0.190337 0.279401C0.170337 0.329401 -0.309663 1.5294 0.340337 3.3194C0.780337 4.5194 1.72034 5.2994 2.29034 5.6894C1.72034 6.4594 1.40034 7.3694 1.41034 8.3394C1.43034 9.4994 1.89034 10.5794 2.72034 11.3794L8.20034 16.6994C9.04034 17.5094 10.1303 17.9194 11.2103 17.9194C12.3403 17.9194 13.4703 17.4794 14.3103 16.6094C15.9803 14.9094 15.9403 12.1594 14.2303 10.4994ZM13.6803 15.9894C13.0403 16.6494 12.1903 17.0194 11.2703 17.0294C10.3203 17.0394 9.49034 16.6994 8.83034 16.0594L3.35034 10.7394C2.69034 10.0994 2.32034 9.2494 2.31034 8.3294C2.30034 7.4194 2.64034 6.5494 3.28034 5.8894C3.92034 5.2294 4.77034 4.8594 5.69034 4.8494C5.71034 4.8494 5.72034 4.8494 5.74034 4.8494C6.64034 4.8494 7.48034 5.1894 8.13034 5.8194L13.6103 11.1394C14.2703 11.7794 14.6403 12.6294 14.6503 13.5494C14.6603 14.4694 14.3103 15.3294 13.6803 15.9894Z" />
        <path d="M13.4501 12.5485C12.6301 11.7485 11.3601 11.6885 10.4601 12.3585C10.7601 11.9285 10.9301 11.4285 10.9201 10.8985C10.9101 10.2385 10.6401 9.62847 10.1701 9.16847C9.71014 8.69847 9.07014 8.43847 8.43014 8.46847C7.94014 8.46847 7.47014 8.61847 7.07014 8.89847C7.63014 7.99847 7.52014 6.78847 6.72014 6.01847C5.81014 5.12847 4.34014 5.14847 3.45014 6.05847C2.56014 6.97847 2.59014 8.43847 3.50014 9.32847C3.95014 9.76847 4.53014 9.97847 5.11014 9.97847C5.56014 9.97847 6.01014 9.84847 6.39014 9.58847C6.13014 9.99847 5.99014 10.4685 6.00014 10.9685C6.01014 11.6285 6.28014 12.2385 6.75014 12.6985C7.21014 13.1485 7.82014 13.3985 8.47014 13.3985C8.48014 13.3985 8.49014 13.3985 8.51014 13.3985C9.04014 13.3885 9.54014 13.2085 9.96014 12.8985C9.68014 13.2885 9.53014 13.7585 9.54014 14.2485C9.55014 14.8685 9.80014 15.4485 10.2401 15.8685C10.6701 16.2885 11.2501 16.5185 11.8501 16.5185C11.8601 16.5185 11.8701 16.5185 11.8801 16.5185C12.5001 16.5085 13.0701 16.2585 13.5001 15.8185C14.3901 14.9085 14.3701 13.4385 13.4501 12.5485ZM4.13014 8.68847C3.57014 8.14847 3.56014 7.24847 4.10014 6.68847C4.37014 6.39847 4.74014 6.25847 5.11014 6.25847C5.46014 6.25847 5.82014 6.38847 6.09014 6.65847C6.65014 7.19847 6.66014 8.09847 6.12014 8.65847C5.58014 9.20847 4.69014 9.22847 4.13014 8.68847ZM8.49014 12.4985C8.08014 12.4885 7.68014 12.3485 7.38014 12.0585C7.08014 11.7685 6.91014 11.3785 6.90014 10.9585C6.89014 10.5385 7.05014 10.1485 7.34014 9.84847C7.63014 9.54847 8.02014 9.37847 8.44014 9.37847C8.45014 9.37847 8.46014 9.37847 8.46014 9.37847C8.87014 9.37847 9.26014 9.53847 9.55014 9.81847C10.1701 10.4185 10.1801 11.4085 9.58014 12.0285C9.30014 12.3185 8.91014 12.4885 8.49014 12.4985ZM12.8601 15.1885C12.6001 15.4585 12.2401 15.6085 11.8701 15.6185C11.4901 15.6285 11.1401 15.4785 10.8701 15.2185C10.6001 14.9585 10.4501 14.5985 10.4401 14.2285C10.4301 13.8485 10.5801 13.4985 10.8401 13.2285C11.1201 12.9485 11.4901 12.7985 11.8501 12.7985C12.2001 12.7985 12.5601 12.9285 12.8301 13.1985C13.3901 13.7385 13.4001 14.6285 12.8601 15.1885Z" />
      </svg>
    </SoyProteinView>
  )
}

SoyProtein.displayName = 'SoyProtein'
SoyProtein.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default SoyProtein