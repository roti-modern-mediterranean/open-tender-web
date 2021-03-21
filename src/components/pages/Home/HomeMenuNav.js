import styled from '@emotion/styled'
import { animateScroll as scroll } from 'react-scroll'
import { slugify } from '@open-tender/js'
import { BgImage } from '@open-tender/components'

import { Container } from '../..'
import { AppContext } from '../../../App'
import { useContext } from 'react'
import { isBrowser } from 'react-device-detect'

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

const HomeMenuNavButtonView = styled('button')`
  position: relative;
  display: block;
  height: 100%;
  flex: 1;
  padding: 0 0 0 5rem;
  text-align: left;
  font-family: ${(props) => props.theme.fonts.headings.family};
  font-weight: 600;
  font-size: 1.4rem;
  text-transform: uppercase;
  border-radius: ${(props) => props.theme.border.radius};
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.light};

  &:hover,
  &:acitve,
  &:focus {
    color: ${(props) => props.theme.colors.light};
    background-color: ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 1;
    color: ${(props) => props.theme.colors.light};
    background-color: ${(props) => props.theme.colors.primary};
  }
`

const HomeMenuNavButtonImage = styled(BgImage)`
  position: absolute;
  z-index: 1;
  top: -0.5rem;
  bottom: -0.5rem;
  left: -0.5rem;
  width: 4.8rem;
  height: 4.8rem;
  // border-radius: 2.4rem;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.65);
`

const HomeMenuNavButton = ({
  container,
  category,
  active = false,
  offset = 0,
}) => {
  const id = slugify(category.name)
  const imageUrl =
    category.small_image_url || category.app_image_url || category.big_image_url
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  const onClick = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const element = document.getElementById(id)
    const position = element.offsetTop + offset
    scroll.scrollTo(position, {
      container,
      duration: 500,
      smooth: true,
      // offset: 0,
    })
  }

  return (
    <HomeMenuNavButtonView onClick={onClick} diabled={active}>
      <HomeMenuNavButtonImage style={bgStyle} />
      {category.name}
    </HomeMenuNavButtonView>
  )
}

const HomeMenuNav = ({ categories }) => {
  const { windowRef } = useContext(AppContext)
  const offset = isBrowser ? -76 : -64
  return (
    <HomeMenuNavView>
      <Container>
        <HomeMenuNavButtons>
          {categories.map((category) => {
            return (
              <HomeMenuNavButton
                key={category.name}
                container={windowRef.current}
                category={category}
                offset={offset}
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
