import propTypes from 'prop-types'
import styled from '@emotion/styled'

const DairyView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const Dairy = ({ size = '1.4rem', color = null }) => {
  return (
    <DairyView size={size} color={color}>
      <svg viewBox="0 0 15 16">
        <path d="M11.07 7.92V6.17L8.82 2.25V2.09L8.84 2.05H8.82V0H2.06V2.24L0 6.16V15.55H4.84H5.29H14.11V7.92H11.07ZM10.17 6.41V7.92H6.82V6.48L8.33 3.18L10.17 6.41ZM7.92 0.9V2.05L2.96 2.04V0.9H7.92ZM5.09 12.25L4.84 12.37V14.64H0.9V6.38L2.7 2.94L7.44 2.96L5.96 6.2L5.92 7.92H4.84V10.07L5.09 10.19C5.48 10.39 5.73 10.78 5.73 11.22C5.73 11.66 5.48 12.06 5.09 12.25ZM13.21 14.65H5.74V12.91C6.29 12.53 6.62 11.91 6.62 11.22C6.62 10.53 6.29 9.92 5.74 9.54V8.83H8.31C7.56 8.92 6.98 9.56 6.98 10.33C6.98 11.17 7.66 11.85 8.5 11.85C9.34 11.85 10.02 11.17 10.02 10.33C10.02 9.56 9.44 8.92 8.69 8.83H13.22V14.65H13.21ZM8.5 9.71C8.84 9.71 9.12 9.99 9.12 10.33C9.12 10.67 8.84 10.95 8.5 10.95C8.16 10.95 7.88 10.67 7.88 10.33C7.88 9.99 8.16 9.71 8.5 9.71Z" />
        <path d="M11.0602 13.9797C11.5602 13.9797 11.9602 13.5797 11.9602 13.0797C11.9602 12.5797 11.5602 12.1797 11.0602 12.1797C10.5602 12.1797 10.1602 12.5797 10.1602 13.0797C10.1602 13.5697 10.5602 13.9797 11.0602 13.9797Z" />
      </svg>
    </DairyView>
  )
}

Dairy.displayName = 'Dairy'
Dairy.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default Dairy
