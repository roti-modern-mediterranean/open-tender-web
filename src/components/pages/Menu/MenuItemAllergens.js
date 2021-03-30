import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../slices'
import { allergenIconMap } from '../../icons/allergens'

const MenuItemAllergensView = styled('p')`
  & > span {
    display: inline-block;
    vertical-align: middle;
    margin: 0 1rem 0 0;
  }
`

// const MenuItemAllergensContainer = styled('span')`
//   display: flex;
//   align-items: center;
//   height: 1.7rem;
// `

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

const MenuItemAllergens = ({ allergens }) => {
  const theme = useSelector(selectTheme)
  if (!allergens.length) return null

  return (
    <MenuItemAllergensView>
      {allergens.map((allergen) => (
        <span>
          {/* <MenuItemAllergensContainer> */}
          <MenuItemAllergensIcon>
            {allergenIconMap[allergen]({ color: theme.colors.alert })}
          </MenuItemAllergensIcon>
          <MenuItemAllergensName>{allergen}</MenuItemAllergensName>
          {/* </MenuItemAllergensContainer> */}
        </span>
      ))}
    </MenuItemAllergensView>
  )
}

export default MenuItemAllergens
