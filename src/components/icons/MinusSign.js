import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MinusSignView = styled('span')`
  display: block;
  width: ${(props) => props.width};
  line-height: 0;
  height: 1.1rem;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const MinusSign = ({ size = 16, color = null }) => {
  const width = `${(parseFloat(size) / 10.0).toFixed(1)}rem`
  return (
    <MinusSignView width={width} color={color}>
      {/* <svg viewBox="0 0 16 1" fill="none">
        <path d="M15.2707 1H0.729262C0.328168 1 0 0.775 0 0.5C0 0.225 0.328168 0 0.729262 0H15.2707C15.6718 0 16 0.225 16 0.5C16 0.775 15.6718 1 15.2707 1Z" />
      </svg> */}
      <svg viewBox="0 0 16 1" fill="none">
        <path d="M15.5403 1H0.998793C0.597699 1 0.269531 0.775 0.269531 0.5C0.269531 0.225 0.597699 0 0.998793 0H15.5403C15.9414 0 16.2695 0.225 16.2695 0.5C16.2695 0.775 15.9414 1 15.5403 1Z" />
      </svg>
    </MinusSignView>
  )
}

MinusSign.displayName = 'MinusSign'
MinusSign.propTypes = {
  size: propTypes.number,
  color: propTypes.string,
}

export default MinusSign
