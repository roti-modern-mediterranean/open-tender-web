import styled from '@emotion/styled'

import { Container, NavScrollButton } from '../..'
import { AppContext } from '../../../App'
import { useContext } from 'react'

const HomeMenuNavView = styled('div')`
  display: none;
  max-width: 40rem;
  margin: 4rem auto;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    display: block;
  }
`

const HomeMenuNavButtons = styled('div')`
  display: flex;
  width: 100%;
  height: 3.8rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.light};
`

const HomeMenuNav = ({ categories }) => {
  const { windowRef } = useContext(AppContext)
  const navItems = categories
    ? categories.map((i) => {
        const imageUrl = i.small_image_url || i.app_image_url || i.big_image_url
        return { ...i, imageUrl }
      })
    : []
  return (
    <HomeMenuNavView>
      <Container>
        <HomeMenuNavButtons>
          {navItems.map((item) => {
            return (
              <NavScrollButton
                container={windowRef.current}
                item={item}
                offset={-50}
              />
            )
          })}
        </HomeMenuNavButtons>
      </Container>
    </HomeMenuNavView>
  )
}

HomeMenuNav.displayName = 'HomeMenuNav'
export default HomeMenuNav
