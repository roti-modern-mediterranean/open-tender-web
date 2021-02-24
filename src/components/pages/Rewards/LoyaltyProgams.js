import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '@open-tender/components'
import { fetchCustomerLoyalty, selectCustomerLoyalty } from '@open-tender/redux'

import { Loading, LoyaltyProgram, Section } from '../..'
import styled from '@emotion/styled'

const LoyaltyProgamsView = styled('div')`
  & > div + div {
    margin: 3rem 0 0;
  }
`

const RewardsPrograms = () => {
  const dispatch = useDispatch()
  const { entities, loading, error } = useSelector(selectCustomerLoyalty)
  const isLoading = loading === 'pending'

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return (
    <Section>
      {error ? (
        <Message color="error" style={{ width: '100%' }}>
          {error}
        </Message>
      ) : entities.length ? (
        <LoyaltyProgamsView>
          {entities.map((program) => {
            return (
              <LoyaltyProgram
                key={program.name}
                program={program}
                isLoading={isLoading}
              />
            )
          })}
        </LoyaltyProgamsView>
      ) : isLoading ? (
        <Loading text="Retrieving your rewards..." />
      ) : (
        <p>Looks like you don't have any reward programs yet.</p>
      )}
    </Section>
  )
}

RewardsPrograms.displayName = 'RewardsPrograms'

export default RewardsPrograms
