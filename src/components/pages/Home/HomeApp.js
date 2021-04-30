import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { Container, DownloadApp } from '../..'
import BorderBox from '../../BorderBox'

const HomeAppView = styled('div')`
  position: relative;
  display: none;
  padding: 4.5rem 0;
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    display: block;
  }
`

const HomeApp = () => {
  const theme = useTheme()
  return !isBrowser ? (
    <HomeAppView>
      <BorderBox color={theme.bgColors.primary} />
      <BorderBox color={theme.bgColors.secondary} position="right" />
      <Container>
        <DownloadApp />
      </Container>
    </HomeAppView>
  ) : null
}

export default HomeApp
