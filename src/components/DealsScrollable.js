import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDeals, fetchDeals } from '@open-tender/redux'

import { Reward, Section, SectionHeader } from '.'
import ItemsScrollable from './ItemsScrollable'
import { selectBrand } from '../slices'

const DealsScrollable = () => {
  const dispatch = useDispatch()
  const { has_deals } = useSelector(selectBrand)
  const { entities: deals, error } = useSelector(selectDeals)
  const items = deals.map((i) => ({ ...i, key: i.discount_id }))

  useEffect(() => {
    if (has_deals) dispatch(fetchDeals())
  }, [has_deals, dispatch])

  if (!has_deals || error) return null

  return (
    <Section>
      <SectionHeader title="Today's Deals" to="/deals" />
      <ItemsScrollable
        items={items}
        renderItem={(item) => <Reward item={item} />}
      >
        <p>We're not featuring any deals today. Please check back soon!</p>
      </ItemsScrollable>
    </Section>
  )
}

DealsScrollable.displayName = 'DealsScrollable'

export default DealsScrollable
