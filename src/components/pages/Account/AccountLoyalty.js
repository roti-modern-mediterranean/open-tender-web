import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerRewards,
  selectCustomerRewards,
  selectCustomerRewardsLoading,
} from '@open-tender/redux'

import { Loading, LoyaltyProgram, PageSection } from '../..'
import AccountLoyaltyExternal from './AccountLoyaltyExternal'
import { selectConfig } from '../../../slices'

const AccountLoyalty = () => {
  const dispatch = useDispatch()
  const { account } = useSelector(selectConfig)
  const loyalty = useSelector(selectCustomerRewards)
  const isLoading = useSelector(selectCustomerRewardsLoading)
  const { progress } = loyalty || {}
  const { title, subtitle } = account.loyalty

  useEffect(() => {
    dispatch(fetchCustomerRewards())
  }, [dispatch])

  if (!loyalty) return null

  return (
    <PageSection title={title} subtitle={subtitle} to="/rewards">
      {isLoading ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : progress ? (
        <AccountLoyaltyExternal loyalty={loyalty} />
      ) : (
        <LoyaltyProgram program={loyalty} />
      )}
    </PageSection>
  )
}

AccountLoyalty.displayName = 'AccountLoyalty'

export default AccountLoyalty
