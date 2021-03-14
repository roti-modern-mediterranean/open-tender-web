import { useSelector } from 'react-redux'

import { selectBrand } from '../../../slices'
import { DealsSection } from '../..'

const AccountDeals = () => {
  const { has_deals } = useSelector(selectBrand)

  return has_deals ? <DealsSection /> : null
}

AccountDeals.displayName = 'AccountDeals'
export default AccountDeals
