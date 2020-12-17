import propTypes from 'prop-types'
import styled from '@emotion/styled'

const Main = styled('div')`
  width: 100%;
  min-height: 100vh;
  padding: 6rem 0 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme.bgColors[props.bgColor || 'primary']};
`

Main.displayName = 'Main'
Main.propTypes = {
  bgColor: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Main
