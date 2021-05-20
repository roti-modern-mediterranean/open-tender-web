import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MainView = styled('main')`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.padding || `${props.theme.layout.navHeight} 0 0`};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: ${(props) =>
      props.padding || `${props.theme.layout.navHeightMobile} 0 0`};
  }
`

const Main = ({ padding, bgColor = 'primary', imageUrl, style, children }) => {
  return (
    <MainView
      role="main"
      id="main"
      padding={padding}
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
