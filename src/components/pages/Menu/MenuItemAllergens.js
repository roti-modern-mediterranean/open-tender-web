import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

import { selectTheme } from '../../../slices'
import { allergenIconMap } from '../../icons/allergens'

const MenuItemAllergensView = styled('p')`
  & > span {
    display: inline-block;
    vertical-align: middle;
    margin: 0 1rem 0 0;

    // &:last-of-type {
    //   margin: 0;
    // }
  }
`

const MenuItemAllergensIcon = styled('span')`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0.4rem 0 0;
  line-height: 0;
`

const MenuItemAllergensName = styled(Heading)`
  display: inline-block;
  vertical-align: middle;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.05;
  color: ${(props) => props.theme.colors.alert};
`

const MenuItemAllergens = ({ allergens, includeText = true, style = null }) => {
  const theme = useSelector(selectTheme)
  if (!allergens.length) return null

  return (
    <MenuItemAllergensView style={style}>
      {allergens.map((allergen) => (
        <span>
          <MenuItemAllergensIcon>
            {allergenIconMap[allergen]({ color: theme.colors.alert })}
          </MenuItemAllergensIcon>
          {includeText && (
            <MenuItemAllergensName>{allergen}</MenuItemAllergensName>
          )}
        </span>
      ))}
    </MenuItemAllergensView>
  )
}

MenuItemAllergens.displayName = 'MenuItemAllergens'
MenuItemAllergens.propTypes = {
  allergens: propTypes.array,
  includeText: propTypes.bool,
  style: propTypes.object,
}

export default MenuItemAllergens
