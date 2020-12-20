import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerLoyalty, selectCustomerLoyalty } from '@open-tender/redux'
import { Loading } from '../..'
import RewardsProgram from './RewardsProgam'

const RewardsPrograms = () => {
  const dispatch = useDispatch()
  const { entities, loading } = useSelector(selectCustomerLoyalty)

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return entities.length ? (
    <div>
      {entities.map((program) => (
        <RewardsProgram key={program.name} program={program} />
      ))}
    </div>
  ) : loading !== 'pending' ? (
    <Loading text="Retrieving your rewards..." />
  ) : (
    <p>Looks like you don't have any orders yet</p>
  )
}

RewardsPrograms.displayName = 'RewardsPrograms'

export default RewardsPrograms
