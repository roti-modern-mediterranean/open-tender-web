import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const MenuItemDetailsView = styled('p')`
  margin: 0.1rem 0 0;
  line-height: ${(props) => props.theme.lineHeight};
  flex-shrink: 0;

  span {
    display: inline-block;
  }
`

const MenuItemPrice = styled(Preface)`
  color: ${(props) => props.theme.fonts.body.color};
  font-size: 1.8rem;
  font-weight: 500;
`

const MenuItemCals = styled(Preface)`
  color: ${(props) => props.theme.fonts.body.color};
  font-weight: normal;
  font-size: 1.5rem;
  margin: 0 0 0 0.2rem;
  text-transform: none;

  span {
    font-size: 1.1rem;
  }
`

const MenuItemDetailsSeparator = styled(Preface)`
  color: ${(props) => props.theme.fonts.body.color};
  font-weight: normal;
  font-size: 1.5rem;
  font-size: 1.1rem;
  margin: 0 0 0 0.3rem;
`

const MenuItemDetails = ({ price, cals }) => {
  return (
    <MenuItemDetailsView>
      {price && <MenuItemPrice>{price}</MenuItemPrice>}
      {price && cals ? (
        <MenuItemDetailsSeparator>/</MenuItemDetailsSeparator>
      ) : null}
      {cals && <MenuItemCals>{cals} Cal</MenuItemCals>}
    </MenuItemDetailsView>
  )
}

export default MenuItemDetails
