import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { openModal, selectTheme } from '../../../slices'
import { Filter } from '../../icons'

import { MoreLink } from '../..'

const MenuAllergenFilterView = styled('div')`
  margin: 0 0 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    display: flex;
    justify-content: center;
    margin: -1rem 0 0;
  }
`

const MenuAllergenFilter = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const color = isBrowser ? theme.colors.paprika : theme.colors.beet
  const size = isBrowser ? '1.6rem' : '1.4rem'

  return (
    <MenuAllergenFilterView>
      <MoreLink
        onClick={() => dispatch(openModal({ type: 'allergens' }))}
        text="Filter"
        icon={<Filter color={color} size={size} />}
      />
    </MenuAllergenFilterView>
  )
}

export default MenuAllergenFilter
