import propTypes from 'prop-types'
import styled from '@emotion/styled'

const EggsView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const Eggs = ({ size = '1.4rem', color = null }) => {
  return (
    <EggsView size={size} color={color}>
      <svg viewBox="0 0 15 14">
        <path d="M8.62 4.13C8.01 2.09 6.51 0 4.48 0C1.92 0 0 3.37 0 6.38C0 9.13 1.66 10.99 4.15 11.15C4.96 12.35 6.4 13.07 8.21 13.07C11.22 13.07 14.59 11.15 14.59 8.59C14.59 6.14 11.52 4.29 8.62 4.13ZM0.9 6.38C0.9 3.61 2.67 0.9 4.48 0.9C5.91 0.9 7.12 2.47 7.68 4.15C5.11 4.36 3.4 6.08 3.4 8.59C3.4 9.18 3.51 9.71 3.68 10.21C1.97 9.88 0.9 8.45 0.9 6.38ZM8.21 12.17C5.84 12.17 4.31 10.76 4.31 8.59C4.31 6.41 5.84 5.01 8.21 5.01C10.98 5.01 13.69 6.78 13.69 8.59C13.69 10.4 10.97 12.17 8.21 12.17Z" />
      </svg>
    </EggsView>
  )
}

Eggs.displayName = 'Eggs'
Eggs.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default Eggs
