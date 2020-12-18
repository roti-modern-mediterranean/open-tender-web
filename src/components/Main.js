import propTypes from 'prop-types'
import styled from '@emotion/styled'

const Main = styled('div')`
  width: 100%;
  min-height: 100vh;
  padding: ${(props) => props.padding || '6rem 0 0'};
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props) =>
    props.theme.bgColors[props.bgColor || 'primary']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-color: ${(props) => props.theme.bgColors.dark};
  }
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
