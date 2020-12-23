import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCustomerThanx,
  resetCustomerThanx,
  selectCustomerThanx,
} from '@open-tender/redux'

import RewardsProgram from './RewardsProgam'
import { Loading } from '../..'
import RewardsRewards from './RewardsRewards'

const RewardsThanx = () => {
  const dispatch = useDispatch()
  const { thanx, loading, error } = useSelector(selectCustomerThanx)
  const { progress, rewards } = thanx || {}
  const program = {
    name: 'Your Progress',
    progress: progress ? parseInt(progress.percentage) : null,
    reward: progress ? progress.towards : null,
  }

  useEffect(() => {
    dispatch(fetchCustomerThanx())
    return () => dispatch(resetCustomerThanx())
  }, [dispatch])

  return (
    <>
      {thanx ? (
        <>
          <RewardsProgram program={program} />
          <RewardsRewards rewards={rewards} />
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
