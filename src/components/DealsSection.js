import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'

import { Deals, Loading, PageSection } from '.'
import { selectBrand } from '../slices'

const DealsSection = ({ limit = 3 }) => {
  const dispatch = useDispatch()
  const { has_deals } = useSelector(selectBrand)
  const { profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const { entities: deals, loading, error } = useSelector(selectDeals)
  const hasDeals = deals.length > 0 && !error
  // const items = deals.map((i) => ({ ...i, key: i.discount_id }))
  const displayed = limit ? deals.slice(0, limit) : deals
  const isMore = deals.length > displayed.length

  useEffect(() => {
    if (has_deals) {
      dispatch(fetchDeals())
    }
  }, [has_deals, customer_id, dispatch])

  return (
    <PageSection
      title="Today's Deals"
      subtitle="These deals can be redeemed from the checkout page or scanned to apply in-store"
      to={isMore ? '/deals' : null}
    >
      {loading === 'pending' ? (
        <Loading text="Checking for deals..." />
      ) : hasDeals ? (
        <Deals deals={displayed} />
      ) : (
        <p>We're not featuring any deals today. Please check back soon!</p>
      )}
    </PageSection>
  )
}

DealsSection.displayName = 'DealsSection'

export default DealsSection
