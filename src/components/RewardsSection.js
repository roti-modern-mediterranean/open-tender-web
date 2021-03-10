import React from 'react'
import propTypes from 'prop-types'
import { selectDeals } from '@open-tender/redux'
import { useSelector } from 'react-redux'

import { Deals, Loading, PageSection } from '.'

const RewardsSection = ({
  title = 'Available Rewards',
  subtitle = 'These discounts can be applied either in-store or online',
  empty = "Looks like you haven't earned any rewards yet. It's only a matter of time!",
  limit = 3,
}) => {
  const { entities: deals, loading, error } = useSelector(selectDeals)
  const hasDeals = deals.length > 0 && !error
  const displayed = limit ? deals.slice(0, limit) : deals
  const isMore = deals.length > displayed.length

  return (
    <PageSection
      title={title}
      subtitle={subtitle}
      to={isMore ? '/deals' : null}
    >
      {loading === 'pending' ? (
        <Loading text="Checking for deals..." />
      ) : hasDeals ? (
        <Deals deals={displayed} />
      ) : (
        <p>{empty}</p>
      )}
    </PageSection>
  )
}

RewardsSection.displayName = 'RewardsSection'
RewardsSection.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  empty: propTypes.string,
  limit: propTypes.number,
}

export default RewardsSection
