import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerRewards,
  selectCustomerRewards,
  selectCustomerRewardsLoading,
} from '@open-tender/redux'

import { Loading, LoyaltyProgram, PageSection } from '../..'
import { selectConfig } from '../../../slices'

const AccountRewards = () => {
  const dispatch = useDispatch()
  const { account } = useSelector(selectConfig)
  const loyalty = useSelector(selectCustomerRewards)
  const isLoading = useSelector(selectCustomerRewardsLoading)
  const { title, subtitle } = account.loyalty

  useEffect(() => {
    dispatch(fetchCustomerRewards())
  }, [dispatch])

  if (!loyalty) return null

  return (
    <PageSection title={title} subtitle={subtitle} to="/rewards">
      {isLoading ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : (
        <LoyaltyProgram program={loyalty} />
      )}
    </PageSection>
  )
}

AccountRewards.displayName = 'AccountRewards'

export default AccountRewards
