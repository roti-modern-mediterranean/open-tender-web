import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectDeals, fetchDeals } from '@open-tender/redux'

import { Loading, PageSection, Reward } from '.'
import { selectBrand } from '../slices'

const DealsView = styled('div')`
  margin: -1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: -0.5rem;
    justify-content: center;
  }
`

const Deal = styled('div')`
  width: 33.33333%;
  padding: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 50%;
    padding: 0.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: 0.5rem;
  }
`

const Deals = () => {
  const dispatch = useDispatch()
  const { has_deals } = useSelector(selectBrand)
  const { entities: deals, loading, error } = useSelector(selectDeals)
  const hasDeals = deals.length > 0 && !error
  // const items = deals.map((i) => ({ ...i, key: i.discount_id }))
  const displayed = deals.slice(0, 3)
  const isMore = deals.length > displayed.length

  useEffect(() => {
    if (has_deals) dispatch(fetchDeals())
  }, [has_deals, dispatch])

  return (
    <PageSection
      title="Today's Deals"
      subtitle="These deals can be redeemed from the checkout page"
      to={isMore ? '/deals' : null}
    >
      {loading === 'pending' ? (
        <Loading text="Retrieving today's deals..." />
      ) : hasDeals ? (
        <DealsView>
          {displayed.map((deal) => (
            <Deal key={deal.discount_id}>
              <Reward item={deal} />
            </Deal>
          ))}
        </DealsView>
      ) : (
        <p>We're not featuring any deals today. Please check back soon!</p>
      )}
    </PageSection>
  )
}

Deals.displayName = 'Deals'

export default Deals
