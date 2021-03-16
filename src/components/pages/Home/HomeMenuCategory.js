import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { useHistory } from 'react-router-dom'
import { slugify } from '@open-tender/js'
import { ButtonLink } from '@open-tender/components'

import iconMap from '../../iconMap'
import MenuItem from '../Menu/MenuItem'

const HomeMenuCategoryView = styled('div')`
  max-width: 46.2rem;
  width: 33.33333%;
  padding: 0 1.2rem;
  background-color: ${(props) =>
    props.theme.bgColors[props.isInverted ? 'secondary' : 'primary']};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 100%;
    padding: 3.5rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const HomeMenuCategoryHeader = styled('div')`
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    text-align: center;
  }

  h3 {
    line-height: 1;
  }

  p {
    margin: 0.75rem 0 0;
  }
`

const HomeMenuCategoryItem = styled('div')`
  margin: 1.5rem 0 0;
`

const HomeMenuCategoryFooter = styled('div')`
  margin: 1.5rem 0 0;
  display: flex;
  justify-content: flex-end;
`

const MoreLinkView = styled('span')`
  display: block;

  button {
    display: flex;
    align-items: center;

    span {
      display: block;
      transition: ${(props) => props.theme.links.transition};
    }

    span:first-of-type {
      font-family: ${(props) => props.theme.fonts.preface.family};
      font-weight: 600;
      font-size: ${(props) => props.theme.fonts.sizes.big};
      text-transform: uppercase;
      line-height: 1.16667;
    }

    span + span {
      width: 2.2rem;
      height: 2.2rem;
      line-height: 1.16667;
      margin: 0 0 0 0.5rem;
    }
  }
`

const MoreLink = ({ onClick, text, icon }) => {
  return (
    <MoreLinkView>
      <ButtonLink onClick={onClick}>
        <span>{text}</span>
        {icon && <span>{icon}</span>}
      </ButtonLink>
    </MoreLinkView>
  )
}

const HomeMenuCategory = ({ category, isInverted = false }) => {
  const history = useHistory()
  const items = category.items.slice(0, 3)
  const isMore = category.items.length > items.length

  return (
    <HomeMenuCategoryView id={slugify(category.name)} isInverted={isInverted}>
      <HomeMenuCategoryHeader>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </HomeMenuCategoryHeader>
      <div>
        {items.map((item) => (
          <HomeMenuCategoryItem>
            <MenuItem key={item.id} item={item} isInverted={isInverted} />
          </HomeMenuCategoryItem>
        ))}
      </div>
      {isMore && (
        <HomeMenuCategoryFooter>
          <MoreLink
            onClick={() => history.push('/menu')}
            text={`View all ${category.name}`}
            icon={isBrowser ? iconMap.ChevronRight : iconMap.ArrowRight}
          />
        </HomeMenuCategoryFooter>
      )}
    </HomeMenuCategoryView>
  )
}

HomeMenuCategory.displayName = 'HomeMenuCategory'
export default HomeMenuCategory
