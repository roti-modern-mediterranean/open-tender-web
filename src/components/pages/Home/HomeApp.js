import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { Container, DownloadApp } from '../..'

const HomeAppView = styled('div')`
  display: none;
  margin: 4.5rem 0;
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    display: block;
  }
`

const HomeApp = () => {
  return !isBrowser ? (
    <HomeAppView>
      <Container>
        <DownloadApp />
      </Container>
    </HomeAppView>
  ) : null
}

export default HomeApp
