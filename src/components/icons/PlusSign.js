import propTypes from 'prop-types'
import styled from '@emotion/styled'

const PlusSignView = styled('span')`
  display: block;
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  line-height: 0;

  svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const PlusSign = ({ size = 16, color = null }) => {
  const width = `${(parseFloat(size) / 10.0).toFixed(1)}rem`
  return (
    <PlusSignView width={width} color={color}>
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M15.2707 7.27074H8.77666V0.729262C8.77666 0.328168 8.44849 0 8.0474 0C7.64631 0 7.31814 0.328168 7.31814 0.729262V7.27074H0.729262C0.328168 7.27074 0 7.59891 0 8C0 8.40109 0.328168 8.72926 0.729262 8.72926H7.31814V15.2707C7.31814 15.6718 7.64631 16 8.0474 16C8.44849 16 8.77666 15.6718 8.77666 15.2707V8.72926H15.2707C15.6718 8.72926 16 8.40109 16 8C16 7.59891 15.6718 7.27074 15.2707 7.27074Z" />
      </svg>
    </PlusSignView>
  )
}

PlusSign.displayName = 'PlusSign'
PlusSign.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default PlusSign
