import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'

const MainView = styled('main')`
  width: 100%;
  min-height: 100%;
  padding: ${(props) => props.padding};
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  ${(props) =>
    props.imageUrl
      ? `background-image: url(${props.imageUrl});
    background-color: ${props.theme.bgColors.dark};`
      : `background-color: ${(props) => props.theme.bgColors[props.bgColor]}`}
`

const Main = ({ padding, bgColor = 'primary', imageUrl, style, children }) => {
  const mainPadding = padding || (isBrowser ? '7.6rem 0 0' : '6.4rem 0 0')
  return (
    <MainView
      role="main"
      id="main"
      padding={mainPadding}
      bgColor={bgColor}
      imageUrl={imageUrl}
      style={style}
    >
      {children}
    </MainView>
  )
}

Main.displayName = 'Main'
Main.propTypes = {
  padding: propTypes.string,
  bgColor: propTypes.string,
  imageUrl: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Main
