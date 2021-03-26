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
  margin: 0 0 0 0.3rem;

  span {
    font-size: 1.1rem;
  }
`

const MenuItemDetails = ({ price, cals }) => {
  return (
    <MenuItemDetailsView>
      {price && <MenuItemPrice>{price}</MenuItemPrice>}
      {cals && (
        <MenuItemCals>
          <span>/</span> {cals} cals
        </MenuItemCals>
      )}
    </MenuItemDetailsView>
  )
}

export default MenuItemDetails
