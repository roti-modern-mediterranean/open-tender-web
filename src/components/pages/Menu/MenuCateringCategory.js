import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage, useImage } from '@open-tender/components'
import { BackgroundLoading } from '../..'

const MenuCateringCategoryView = styled(BgImage)`
  position: relative;
  display: block;
  width: 100%;
  padding: 31% 0;
  overflow: hidden;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.secondary};
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.25);

  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }

  p {
    color: ${(props) => props.theme.colors.light};
  }
`

const MenuCateringContent = styled('div')`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.332812) 42.71%,
    rgba(0, 0, 0, 0) 100%
  );
`

const MenuCateringCategoryTitle = styled('h3')`
  color: ${(props) => props.theme.colors.light};
  font-size: 2.6rem;
  line-height: 1;
`

const MenuCateringCategory = ({ category }) => {
  const {
    name,
    short_description,
    app_image_url,
    big_image_url,
    small_image_url,
  } = category
  const imageUrl = small_image_url || big_image_url || app_image_url
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = imageUrl && !hasLoaded && !hasError

  return (
    <MenuCateringCategoryView style={bgStyle} as="button">
      <MenuCateringContent>
        <MenuCateringCategoryTitle>{name}</MenuCateringCategoryTitle>
        <p>{short_description}</p>
      </MenuCateringContent>
      {isLoading && <BackgroundLoading />}
    </MenuCateringCategoryView>
  )
}

MenuCateringCategory.displayName = 'MenuCateringCategory'
MenuCateringCategory.propTypes = {
  deals: propTypes.array,
}

export default MenuCateringCategory
