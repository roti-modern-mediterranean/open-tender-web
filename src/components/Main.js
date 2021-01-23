import propTypes from 'prop-types'
import styled from '@emotion/styled'

const Main = styled('main')`
  width: 100%;
  min-height: 100%;
  padding: ${(props) => props.padding || '6rem 0 0'};
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props) =>
    props.theme.bgColors[props.bgColor || 'primary']};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    ${(props) =>
      props.imageUrl
        ? `background-image: url(${props.imageUrl});
    background-color: ${props.theme.bgColors.dark};`
        : null}
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
