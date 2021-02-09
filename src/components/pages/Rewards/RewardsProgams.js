import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '@open-tender/components'
import { fetchCustomerLoyalty, selectCustomerLoyalty } from '@open-tender/redux'
import { loyaltyType } from '@open-tender/js'
import { Loading } from '../..'
import RewardsProgram from './RewardsProgam'

const RewardsPrograms = () => {
  const dispatch = useDispatch()
  const { entities, loading, error } = useSelector(selectCustomerLoyalty)

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return error ? (
    <Message color="error" style={{ width: '100%' }}>
      {error}
    </Message>
  ) : entities.length ? (
    <div>
      {entities.map((program) => {
        const {
          name,
          description,
          loyalty_type,
          spend,
          redemption,
          credit,
        } = program
        const progress =
          loyalty_type === loyaltyType.CREDIT
            ? parseInt(
                (parseFloat(spend.current) / parseFloat(redemption.threshold)) *
                  100
              )
            : null
        const currentCredit = parseFloat(credit.current)
        const rewardsProgram = {
          name,
          description,
          progress,
          credit: currentCredit,
          reward: `your next $${redemption.reward} off!`,
        }
        return <RewardsProgram key={program.name} program={rewardsProgram} />
      })}
    </div>
  ) : loading === 'pending' ? (
    <Loading text="Retrieving your rewards..." />
  ) : (
    <p>Looks like you don't have any reward programs yet.</p>
  )
}

RewardsPrograms.displayName = 'RewardsPrograms'

export default RewardsPrograms
