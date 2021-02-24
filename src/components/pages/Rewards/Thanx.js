import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from '@open-tender/js'
import {
  fetchCustomerThanx,
  resetCustomerThanx,
  selectCustomerThanx,
} from '@open-tender/redux'

import { Loading, LoyaltyProgram } from '../..'
import ThanxRewards from './ThanxRewards'

const RewardsThanx = () => {
  const dispatch = useDispatch()
  const { thanx, loading, error } = useSelector(selectCustomerThanx)
  const isLoading = loading === 'pending'
  const { progress, rewards } = thanx || {}
  const program = {
    name: 'Your Progress',
    progress: !isEmpty(progress) ? parseInt(progress.percentage) : null,
    reward: !isEmpty(progress) ? progress.towards : null,
  }

  useEffect(() => {
    dispatch(fetchCustomerThanx())
    return () => dispatch(resetCustomerThanx())
  }, [dispatch])

  return (
    <>
      {thanx ? (
        <>
          <LoyaltyProgram program={program} isLoading={isLoading} />
          <ThanxRewards rewards={rewards} />
        </>
      ) : loading === 'pending' ? (
        <Loading text="Retrieving your rewards..." />
      ) : error ? (
        <p>
          Something appears to have gone wrong. Please try logging out and
          logging back in again.
        </p>
      ) : (
        <p>Looks like you don't have any rewards yet.</p>
      )}
    </>
  )
}

RewardsThanx.displayName = 'RewardsThanx'
export default RewardsThanx
