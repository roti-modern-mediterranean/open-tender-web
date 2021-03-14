import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerRewards,
  selectCustomerRewards,
  selectCustomerRewardsLoading,
} from '@open-tender/redux'

import { Loading, LoyaltyProgram, PageContent } from '../..'
import LevelUpConnect from './LevelUpConnect'

const LevelUpLoyalty = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectCustomerRewardsLoading)
  const loyalty = useSelector(selectCustomerRewards)
  const { credit } = loyalty || {}
  const extLoyalty = credit
    ? { ...loyalty, credit: { current: credit } }
    : loyalty

  useEffect(() => {
    dispatch(fetchCustomerRewards())
  }, [dispatch])

  return (
    <PageContent style={{ maxWidth: '76.8rem', textAlign: 'left' }}>
      {isLoading ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : (
        <>
          {loyalty && <LoyaltyProgram program={extLoyalty} />}
          <LevelUpConnect />
        </>
      )}
    </PageContent>
  )
}

LevelUpLoyalty.displayName = 'LevelUpLoyalty'

export default LevelUpLoyalty
