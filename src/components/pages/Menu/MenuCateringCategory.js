import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { setCurrentCategory, selectMenuSlug } from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { BgImage, Heading, Preface, useImage } from '@open-tender/components'
import { BackgroundLoading } from '../..'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export const MenuCateringCategoryView = styled(BgImage)`
  position: relative;
  display: block;
  width: 100%;
  padding: 31% 0;
  overflow: hidden;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.secondary};
  box-shadow: ${(props) =>
    props.isSoldOut ? 'none' : '0px 6px 20px rgba(0, 0, 0, 0.25)'};
  cursor: ${(props) => (props.isSoldOut ? 'default' : 'pointer')};

  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }
`

export const MenuCateringContent = styled('div')`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  text-align: left;
  background: ${(props) =>
    props.isSoldOut
      ? 'rgba(0, 0, 0, .7)'
      : `linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.332812) 42.71%,
    rgba(0, 0, 0, 0) 100%
  )`};
`

export const MenuCateringCategoryTitle = styled(Heading)`
  color: ${(props) => props.theme.colors.light};
  font-size: 2.6rem;
  line-height: 1;
`

export const MenuCateringCategoryDescription = styled('p')`
  display: flex;
  align-items: flex-end;
  margin: 0.5rem 0 0;
  color: ${(props) => props.theme.colors.light};

  span {
    display: block;
    color: ${(props) => props.theme.colors.light};
  }
`

export const MenuCateringCategoryPrice = styled(Preface)`
  font-weight: 500;
  font-size: 2.2rem;
  line-height: 1;
`

export const MenuCateringCategoryShorthand = styled(Preface)`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1;
  text-transform: none;
  margin: 0 0 0 0.5rem;
`

const MenuCateringCategory = ({ category }) => {
  const dispatch = useDispatch()
  const history = useHistory()
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
  const menuSlug = useSelector(selectMenuSlug)

  const onClick = (evt) => {
    evt.preventDefault()
    dispatch(setCurrentCategory(category))
    history.push(`${menuSlug}/category/${slugify(name)}`)
  }

  return (
    <MenuCateringCategoryView style={bgStyle} as="button" onClick={onClick}>
      <MenuCateringContent>
        <MenuCateringCategoryTitle>{name}</MenuCateringCategoryTitle>
        {short_description && <p>{short_description}</p>}
      </MenuCateringContent>
      {isLoading && <BackgroundLoading />}
    </MenuCateringCategoryView>
  )
}

MenuCateringCategory.displayName = 'MenuCateringCategory'
MenuCateringCategory.propTypes = {
  category: propTypes.object,
}

export default MenuCateringCategory
