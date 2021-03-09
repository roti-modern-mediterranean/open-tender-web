import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import {
  fetchCustomerRewards,
  selectCustomerRewards,
  selectCustomerRewardsLoading,
} from '@open-tender/redux'

import { Loading, LoyaltyProgram, PageSection } from '../..'
import AccountLoyaltyExternal from './AccountLoyaltyExternal'
import { selectConfig } from '../../../slices'

const AccountLoyaltyView = styled('div')`
  margin: 0 auto;
  max-width: 72rem;
`

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
      ) : (
        <AccountLoyaltyView>
          {progress ? (
            <AccountLoyaltyExternal loyalty={loyalty} />
          ) : (
            <LoyaltyProgram program={loyalty} isLoading={isLoading} />
          )}
        </AccountLoyaltyView>
      )}
    </PageSection>
  )
}

AccountLoyalty.displayName = 'AccountLoyalty'

export default AccountLoyalty
