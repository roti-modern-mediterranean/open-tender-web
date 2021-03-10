import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerLoyalty, selectCustomerLoyalty } from '@open-tender/redux'

import { Loading, LoyaltyProgram, PageContent, PageError } from '../..'
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
    <>
      {error ? (
        <PageError error={error} />
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
      ) : (
        <PageContent>
          {isLoading ? (
            <Loading text="Retrieving your rewards..." />
          ) : (
            <p>Looks like you don't have any reward programs yet.</p>
          )}
        </PageContent>
      )}
    </>
  )
}

RewardsPrograms.displayName = 'RewardsPrograms'

export default RewardsPrograms
